import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-slate-900 border-b border-slate-700 px-6 py-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-orange-400 font-bold text-xl">
          HackerNews Scraper
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-slate-400 text-sm">Hi, {user.name}</span>
              <Link to="/bookmarks" className="text-slate-300 hover:text-orange-400 text-sm">
                Bookmarks
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-slate-300 hover:text-orange-400 text-sm">
                Login
              </Link>
              <Link
                to="/register"
                className="text-sm bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
