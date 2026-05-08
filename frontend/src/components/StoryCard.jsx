import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Bookmark } from "lucide-react";

function StoryCard({ story, isBookmarked, onBookmarkToggle }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleBookmark = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    onBookmarkToggle(story._id);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 flex flex-col justify-between hover:border-slate-700 transition-colors">
      <div>
        <div className="flex justify-between items-start gap-2">
          <a
            href={story.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white font-medium hover:text-orange-400 transition-colors text-sm"
          >
            {story.title}
          </a>
          
          <button
            onClick={handleBookmark}
            className="text-slate-500 hover:text-orange-400 cursor-pointer transition-colors"
            title={user ? (isBookmarked ? "Remove Bookmark" : "Add Bookmark") : "Login to bookmark"}
          >
            <Bookmark
              size={18}
              fill={isBookmarked ? "currentColor" : "none"}
              className={isBookmarked ? "text-orange-400" : ""}
            />
          </button>
        </div>
        
        <div className="flex items-center gap-2 mt-2">
          <span className="bg-orange-500/10 text-orange-400 text-xs px-2 py-0.5 rounded font-medium">
            {story.points} pts
          </span>
          <span className="text-xs text-slate-500">by {story.author}</span>
        </div>
      </div>
      
      <div className="text-xs text-slate-600 mt-3">
        {story.postedAt}
      </div>
    </div>
  );
}

export default StoryCard;
