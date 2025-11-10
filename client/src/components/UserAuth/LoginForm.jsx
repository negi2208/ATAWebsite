// src/components/UserAuth/LoginForm.jsx
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function LoginForm({ onForgotPassword }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <p className="text-sm text-gray-600 mb-6 text-center">
        If you have an account, sign in with your username or email address.
      </p>

      <form className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Username or email address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
            <span className="text-sm text-gray-600">Remember me</span>
          </label>
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-sm text-primary-600 hover:underline font-medium"
          >
            Lost your password?
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-primary-600 text-white py-3.5 rounded-lg font-bold text-lg hover:bg-primary-700 transition-all shadow-md"
        >
          Log in
        </button>
      </form>
    </div>
  );
}