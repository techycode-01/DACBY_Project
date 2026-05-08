import axios from "axios";
import * as cheerio from "cheerio";
import Story from "../models/Story.js";

const scrapeHackerNews = async (req, res) => {
  try {
    const { data } = await axios.get("https://news.ycombinator.com/");
    const parsedData = cheerio.load(data);
    const stories = [];

    // Hacker News puts the title in a tr with class 'athing'
    parsedData(".athing")
      .slice(0, 10)
      .each((index, element) => {
        const titleElement = parsedData(element).find(".titleline > a");
        const title = titleElement.text();
        let url = titleElement.attr("href");

        // Fix relative URLs for 'Ask HN' or 'Show HN'
        if (url && url.startsWith("item?id=")) {
          url = `https://news.ycombinator.com/${url}`;
        }

        // The metadata (points, author, time) is in the next sibling <tr>
        const subtextRow = parsedData(element).next();

        const pointsText = subtextRow.find(".score").text() || "0 points";
        const points = parseInt(pointsText.replace(/[^0-9]/g, ""), 10) || 0;

        const author = subtextRow.find(".hnuser").text() || "Unknown";
        const postedAt =
          subtextRow.find(".age").attr("title") ||
          subtextRow.find(".age > a").text() ||
          "Unknown time";

        stories.push({ title, url, points, author, postedAt });
      });

    // Upsert stories to DB to avoid duplicates and update points
    for (let story of stories) {
      await Story.findOneAndUpdate(
        { url: story.url },
        { $set: story },
        { upsert: true, returnDocument: "after" },
      );
    }

    // Only send response if it was called via an HTTP request
    if (res) {
      res
        .status(200)
        .json({ message: "Scraping successful", count: stories.length });
    } else {
      console.log("Successfully scraped 10 stories on server start.");
    }
  } catch (error) {
    console.error("Error scraping:", error);
    if (res) {
      res
        .status(500)
        .json({ message: "Error during scraping", error: error.message });
    }
  }
};

export { scrapeHackerNews };
