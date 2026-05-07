import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/mongodb.js";
import scrapeRoutes from "./routes/scrapeRoutes.js";
import { scrapeHackerNews } from "./controllers/scrapeController.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4500;

// Connect db
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/scrape", scrapeRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);

  // Run scraper automatically on server start
  scrapeHackerNews();
});
