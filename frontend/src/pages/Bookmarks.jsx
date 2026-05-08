import { useState, useEffect } from "react";
import api from "../services/api";
import StoryCard from "../components/StoryCard";

function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarks = async () => {
      setLoading(true);
      try {
        const { data } = await api.get("/api/stories/bookmarks");
        setBookmarks(data.bookmarks);
      } catch (err) {
        console.error("Failed to fetch bookmarks", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, []);

  const handleBookmarkToggle = async (storyId) => {
    try {
      await api.post(`/api/stories/${storyId}/bookmark`);
      // Remove from list since we are on the bookmarks page
      setBookmarks((prev) => prev.filter((story) => story._id !== storyId));
    } catch (err) {
      console.error("Failed to toggle bookmark", err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">My Bookmarks</h1>

      {loading ? (
        <div className="text-center text-slate-400 py-10">Loading bookmarks...</div>
      ) : bookmarks.length === 0 ? (
        <div className="text-center text-slate-500 py-10">
          You haven't bookmarked any stories yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bookmarks.map((story) => (
            <StoryCard
              key={story._id}
              story={story}
              isBookmarked={true} // They are all bookmarked on this page
              onBookmarkToggle={handleBookmarkToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Bookmarks;
