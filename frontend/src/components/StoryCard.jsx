import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Bookmark } from "lucide-react";

// Convert ISO date to relative time (e.g., '2 hours ago')
function timeAgo(dateString) {
  if (!dateString || dateString === "Unknown time") return "Unknown time";
  
  // Return if already in relative format
  if (dateString.includes("ago") || dateString.includes("min")) {
    return dateString;
  }

  // Strip trailing numbers (e.g., "date number")
  const cleanDateString = dateString.split(" ")[0];

  let date = new Date(cleanDateString);
  
  // Force UTC parsing if browser defaults to local
  if (isNaN(date.getTime())) {
    date = new Date(cleanDateString + "Z");
  }
  
  // If we still can't parse it, just show the original string as a fallback
  if (isNaN(date.getTime())) return dateString;
  
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  // Handle future dates or slight clock desyncs
  if (seconds < 0) return "just now";
  
  // Break down the difference into appropriate units
  if (seconds < 60) return `${seconds}s ago`;
  
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}min ago`;
  
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days > 1 ? 's' : ''} ago`;
  
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months > 1 ? 's' : ''} ago`;
  
  const years = Math.floor(months / 12);
  return `${years} year${years > 1 ? 's' : ''} ago`;
}


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
        {timeAgo(story.postedAt)}
      </div>
    </div>
  );
}

export default StoryCard;
