// src/components/UserAuth/MyAccount.jsx
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom"; // React Router
// Next.js mein: import { useRouter } from "next/router";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ForgotPasswordForm from "./ForgotPasswordForm";
import ResetPasswordForm from "./ResetPasswordForm";

export default function MyAccount() {
  const [searchParams] = useSearchParams();
  const forgot = searchParams.get("forgot");
  const resetToken = searchParams.get("reset");

  const [activeView, setActiveView] = useState("login");

  useEffect(() => {
    if (resetToken) setActiveView("reset");
    else if (forgot) setActiveView("forgot");
    else if (searchParams.get("register")) setActiveView("register");
    else setActiveView("login");
  }, [searchParams, forgot, resetToken]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Tabs - for n/Register ke liye */}
        {!["forgot", "reset"].includes(activeView) && (
          <div className="flex border-b border-gray-200 bg-neutral-200">
            <button
              onClick={() => setActiveView("login")}
              className={`flex-1 py-5 text-lg font-bold transition-all ${
                activeView === "login"
                  ? "text-primary-600 border-b-4 border-primary-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setActiveView("register")}
              className={`flex-1 py-5 text-lg font-bold transition-all ${
                activeView === "register"
                  ? "text-primary-600 border-b-4 border-primary-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Register
            </button>
          </div>
        )}

        <div className="p-8">
          {activeView === "login" && (
            <LoginForm onForgotPassword={() => setActiveView("forgot")} />
          )}
          {activeView === "register" && <RegisterForm />}
          {activeView === "forgot" && (
            <ForgotPasswordForm onBackToLogin={() => setActiveView("login")} />
          )}
          {activeView === "reset" && (
            <ResetPasswordForm token={resetToken} onBack={() => setActiveView("login")} />
          )}
        </div>
      </div>
    </div>
  );
}