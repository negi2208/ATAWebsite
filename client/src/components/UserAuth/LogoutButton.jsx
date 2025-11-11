// src/components/LogoutButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const LogoutButton = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout(); // Zustand + localStorage dono clear ho jayega (persist ki wajah se)
    navigate('/login', { replace: true });
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full text-left px-6 py-3 text-red-400 hover:bg-gray-800 hover:text-red-300 transition-all duration-200 flex items-center gap-3 rounded-lg group"
    >
      <svg
        className="w-5 h-5 group-hover:scale-110 transition-transform"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
        />
      </svg>
      <span className="font-medium">Logout</span>
    </button>
  );
};

export default LogoutButton;