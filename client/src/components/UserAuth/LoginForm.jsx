// src/components/UserAuth/LoginForm.jsx
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authStore from "../../store/authStore";
import toast from "react-hot-toast";

export default function LoginForm({ onForgotPassword }) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form state
  const [credentials, setCredentials] = useState({
    identifier: "", // username or email
    password: "",
  });

  const login = authStore((s) => s.login);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!credentials.identifier || !credentials.password) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      // Real API Call (Uncomment in production)
      /*
      const res = await fetch("/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");
      */

      // Mock Login (Remove in production)
      const mockUser = {
        id: Date.now(),
        name: credentials.identifier.includes("@") ? "User" : credentials.identifier,
        email: credentials.identifier.includes("@") ? credentials.identifier : `${credentials.identifier}@example.com`,
        token: `jwt-user-${Date.now()}`,
      };

      // Zustand login
      login(mockUser, "user");

      toast.success("Login successful!");
      navigate("/user/dashboard"); // Change path as needed
    } catch (err) {
      toast.error(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <p className="text-sm text-gray-600 mb-6 text-center">
        If you have an account, sign in with your username or email address.
      </p>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Username or email address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="identifier"
            value={credentials.identifier}
            onChange={handleChange}
            required
            disabled={loading}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
            placeholder="john_doe or john@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={loading}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-600 rounded"
              disabled={loading}
            />
            <span className="text-sm text-gray-600">Remember me</span>
          </label>
          <button
            type="button"
            onClick={onForgotPassword}
            disabled={loading}
            className="text-sm text-primary-600 hover:underline font-medium disabled:opacity-50"
          >
            Lost your password?
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary-600 text-white py-3.5 rounded-lg font-bold text-lg hover:bg-primary-700 transition-all shadow-md disabled:bg-primary-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Logging in...
            </>
          ) : (
            "Log in"
          )}
        </button>
      </form>
    </div>
  );
}