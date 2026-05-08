import express from "express";
import { getAllStories, getStoryById } from "../controllers/storyController.js";

const router = express.Router();

router.get("/", getAllStories);
router.get("/:id", getStoryById);

export default router;
