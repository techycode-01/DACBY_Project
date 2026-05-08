import Story from "../models/Story.js";

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
