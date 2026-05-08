import Story from "../models/Story.js";
import User from "../models/User.js";

// Fetch all stories (sorted by points in descending order)
export const getAllStories = async (req, res) => {
  try {
    const stories = await Story.find().sort({ points: -1 });

    res.status(200).json({
      success: true,
      count: stories.length,
      stories,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// Fetch a single story by ID
export const getStoryById = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);

    if (!story) {
      return res
        .status(404)
        .json({ success: false, message: "Story not found" });
    }

    res.status(200).json({ success: true, story });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// Toggle bookmark for a story
export const toggleBookmark = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);

    if (!story) {
      return res
        .status(404)
        .json({ success: false, message: "Story not found" });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isBookmarked = user.bookmarks.includes(req.params.id);

    if (isBookmarked) {
      // Remove bookmark
      user.bookmarks = user.bookmarks.filter(
        (id) => id.toString() !== req.params.id
      );
      await user.save();
      return res.status(200).json({ success: true, message: "Bookmark removed" });
    } else {
      // Add bookmark
      user.bookmarks.push(req.params.id);
      await user.save();
      return res.status(200).json({ success: true, message: "Bookmark added" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
