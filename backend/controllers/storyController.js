import Story from "../models/Story.js";
import User from "../models/User.js";

// Fetch all stories (sorted by points in descending order) with pagination
export const getAllStories = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalStories = await Story.countDocuments();
    const totalPages = Math.ceil(totalStories / limit);

    const stories = await Story.find()
      .sort({ points: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      count: stories.length,
      totalStories,
      totalPages,
      currentPage: page,
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

// Get all bookmarked stories for logged in user
export const getBookmarks = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("bookmarks");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      count: user.bookmarks.length,
      bookmarks: user.bookmarks,
    });
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
