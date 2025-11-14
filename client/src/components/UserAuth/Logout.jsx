// src/components/Logout.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore'; // ya useUserStore
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Logout = () => {
  const navigate = useNavigate();
  const { logout: storeLogout } = useAuthStore();

  const handleLogout = async () => {
    try {
      // API CALL TO LOGOUT ENDPOINT
      await axios.post('/api/auth/logout', {}, { withCredentials: true });
      // ya jo bhi aapka endpoint hai

      // Clear local state
      storeLogout();

      toast.success('Logout successful!');
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error('Logout failed. Please try again.');
      // Optional: still logout locally
      storeLogout();
      navigate('/login', { replace: true });
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
        <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        Logout
      </h2>

      <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 shadow-xl">
        <p className="text-gray-300 mb-8 text-lg leading-relaxed">
          Aapka session safely end ho jayega aur aap login page par redirect ho jayengi.
        </p>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={handleLogout}
            className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg flex items-center gap-2 transform hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7" />
            </svg>
            Haan, Logout Karo
          </button>

          <button
            onClick={() => navigate(-1)}
            className="px-8 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-all duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;