import { useState, useEffect } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import StoryCard from "../components/StoryCard";

function Home() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [userBookmarks, setUserBookmarks] = useState([]);
  
  const { user } = useAuth();

  useEffect(() => {
    const fetchStories = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/api/stories?page=${page}&limit=10`);
        setStories(data.stories);
        setTotalPages(data.totalPages);
      } catch (err) {
        console.error("Failed to fetch stories", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, [page]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      if (!user) return;
      try {
        const { data } = await api.get("/api/stories/bookmarks");
        setUserBookmarks(data.bookmarks.map((b) => b._id));
      } catch (err) {
        console.error("Failed to fetch bookmarks", err);
      }
    };

    fetchBookmarks();
  }, [user]);

  const handleBookmarkToggle = async (storyId) => {
    try {
      await api.post(`/api/stories/${storyId}/bookmark`);
      setUserBookmarks((prev) =>
        prev.includes(storyId)
          ? prev.filter((id) => id !== storyId)
          : [...prev, storyId]
      );
    } catch (err) {
      console.error("Failed to toggle bookmark", err);
    }
  };

  const handleScrape = async () => {
    try {
      await api.post("/api/scrape");
      // Refetch page 1 after scraping
      setPage(1);
      const { data } = await api.get(`/api/stories?page=1&limit=10`);
      setStories(data.stories);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error("Failed to trigger scrape", err);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Top Stories</h1>
        <button
          onClick={handleScrape}
          className="text-sm bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded font-medium cursor-pointer transition-colors"
        >
          Scrape Latest
        </button>
      </div>

      {loading ? (
        <div className="text-center text-slate-400 py-10">Loading stories...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stories.map((story) => (
              <StoryCard
                key={story._id}
                story={story}
                isBookmarked={userBookmarks.includes(story._id)}
                onBookmarkToggle={handleBookmarkToggle}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="text-sm bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <span className="text-sm text-slate-400">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="text-sm bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
