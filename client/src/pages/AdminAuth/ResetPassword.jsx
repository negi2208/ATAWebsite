// src/pages/AdminAuth/ResetPassword.jsx
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Mail, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || "";
  const token = searchParams.get("token") || "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/admin/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token, newPassword }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Password reset successful! Redirecting to login...", {
          duration: 3000,
        });

        setTimeout(() => {
          navigate("/admin/login");
        }, 3200);
      } else {
        setError(data.message || "Invalid or expired link.");
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
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
            Set a new password
          </h1>
          <p className="text-sm text-gray-600 mb-6">
            Create a strong password for your account.
          </p>

          <div className="mb-5 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-2">
            <Mail size={18} className="text-blue-700" />
            <span className="text-blue-700 font-medium text-sm">{email}</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <input
                  type={showNew ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full pr-12 pl-4 py-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-700 font-medium 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-blue-100 focus:border-blue-500 
                           transition"
                  placeholder="Enter new password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-blue-700"
                >
                  {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pr-12 pl-4 py-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-700 font-medium 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-blue-100 focus:border-blue-500 
                           transition"
                  placeholder="Confirm new password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-blue-700"
                >
                  {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && <p className="text-sm text-red-600 text-center">{error}</p>}

            <button
              type="submit"
              disabled={loading || !newPassword || !confirmPassword}
              className="w-full bg-red-600 text-white font-semibold py-3.5 rounded-lg 
                       hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed 
                       transition duration-200"
            >
              {loading ? "Saving..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;