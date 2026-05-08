import express from "express";

import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import scrapeRoutes from "./routes/scrapeRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import storyRoutes from "./routes/storyRoutes.js";

import { scrapeHackerNews } from "./controllers/scrapeController.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4500;

// Connect db
connectDB();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "https://dacby-project-1qeg.vercel.app",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).json({ message: "API is working smoothly" });
});

app.use("/api/scrape", scrapeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/stories", storyRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);

  // Run scraper automatically on server start
  scrapeHackerNews();
});
