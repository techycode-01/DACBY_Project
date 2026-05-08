import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await register(name, email, password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-slate-900 p-6 rounded-lg border border-slate-700">
      <h2 className="text-xl font-bold mb-4 text-orange-400">Create Account</h2>

      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 p-2 rounded text-sm mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="text-sm text-slate-400 block mb-1">Name</label>
          <input
            type="text"
            className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white text-sm"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="text-sm text-slate-400 block mb-1">Email</label>
          <input
            type="email"
            className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="text-sm text-slate-400 block mb-1">Password</label>
          <input
            type="password"
            className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded text-sm mt-2 transition-colors cursor-pointer"
        >
          Sign Up
        </button>
      </form>

      <p className="text-sm text-slate-400 mt-4 text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-orange-400 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}

export default Register;
