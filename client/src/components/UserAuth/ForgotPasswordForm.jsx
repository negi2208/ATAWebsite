// src/components/UserAuth/ForgotPasswordForm.jsx
import { useState } from "react";
import { ArrowLeft } from "lucide-react";

export default function ForgotPasswordForm({ onBackToLogin }) {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="space-y-6">
      <button
        onClick={onBackToLogin}
        className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to log in
      </button>

      {!isSubmitted ? (
        <>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Forgot your password?</h2>
            <p className="text-sm text-gray-600">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary-600 text-white py-3.5 rounded-lg font-bold text-lg hover:bg-primary-700 transition-all shadow-md"
            >
              Send reset link
            </button>
          </form>
        </>
      ) : (
        <div className="text-center py-10">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Check your email</h3>
          <p className="text-sm text-gray-600">
            We have sent a password reset link to<br />
            <span className="font-medium text-primary-600">{email}</span>
          </p>
        </div>
      )}
    </div>
  );
}