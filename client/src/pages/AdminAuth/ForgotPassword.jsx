// src/pages/AdminAuth/ForgotPassword.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mail } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/admin/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      setMessage(data.message || "Check your email for reset link!");
    } catch (err) {
      setMessage("Failed to send email. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        
        <div className="p-4 border-b border-gray-200">
          <button
            onClick={() => navigate("/admin/login")}
            className="flex items-center gap-1 text-red-600 font-medium text-sm hover:text-red-700 transition"
          >
            <ArrowLeft size={18} />
            Back to log in
          </button>
        </div>

        <div className="p-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Forgot your password?
          </h1>
          <p className="text-sm text-gray-600 mb-6 leading-relaxed">
            Enter your email address and we'll send you a link to reset your password.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email address <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={20} className="text-gray-500" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-700 font-medium 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-blue-100 focus:border-blue-500 
                           disabled:opacity-70 transition"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {message && (
              <p className={`text-sm text-center ${message.includes("Check") ? "text-green-600" : "text-red-600"}`}>
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || !email}
              className="w-full bg-red-600 text-white font-semibold py-3.5 rounded-lg 
                       hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed 
                       transition duration-200"
            >
              {loading ? "Sending..." : "Send reset link"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;