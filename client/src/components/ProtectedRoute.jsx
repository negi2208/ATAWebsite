// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import authStore from "../store/authStore";

// UserInfo Component (inside same file)
const UserInfo = () => {
  const { currentTime = "Loading...", country = "IN" } = authStore();

  return (
    <div className="fixed top-4 left-4 bg-white p-3 rounded-lg shadow-md text-xs font-medium text-gray-700 border border-gray-200 z-50">
      <div className="flex items-center gap-2">
        <span>Current time:</span>
        <span className="font-mono text-blue-600">{currentTime} IST</span>
      </div>
      <div className="flex items-center gap-2 mt-1">
        <span>Country:</span>
        <span className="font-semibold text-green-600">{country}</span>
      </div>
    </div>
  );
};

// Main ProtectedRoute (handles both user & admin)
export default function ProtectedRoute({ children, allowedRole }) {
  const { isAuthenticated, role } = authStore();

  // Not logged in → redirect to login
  if (!isAuthenticated) {
    return <Navigate to={`/${allowedRole}/login`} replace />;
  }

  // Wrong role → go home
  if (role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  // Correct → show UserInfo + children
  return (
    <>
      <UserInfo />
      {children}
    </>
  );
}