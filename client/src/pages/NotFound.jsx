import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <h1 className="text-7xl font-extrabold text-red-600">404</h1>
      <p className="mt-4 text-xl font-semibold text-gray-800">
        Page Not Found
      </p>
      <p className="mt-2 text-gray-600 text-center max-w-md">
        The page you are looking for doesn’t exist or has been moved.
      </p>

      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;