import express from "express";
import { getAllStories } from "../controllers/storyController.js";

const router = express.Router();

router.get("/", getAllStories);

export default router;
