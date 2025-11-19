// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import authStore from "../stores/authStore";

// UserInfo (inside same file)
const UserInfo = () => {
  const { currentTime, country } = authStore();
  if (!currentTime) return null;

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

// Protected Route (Admin + User)
export default function ProtectedRoute({ children, role: requiredRole }) {
  const { isAuthenticated, role } = authStore();

  if (!isAuthenticated) {
    return <Navigate to={`/${requiredRole}/login`} replace />;
  }

  if (role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <UserInfo />
      {children}
    </>
  );
}