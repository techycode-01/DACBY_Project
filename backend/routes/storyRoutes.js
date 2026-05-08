import express from "express";
import { getAllStories, getStoryById, toggleBookmark } from "../controllers/storyController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getAllStories);
router.get("/:id", getStoryById);
router.post("/:id/bookmark", authMiddleware, toggleBookmark);

export default router;
