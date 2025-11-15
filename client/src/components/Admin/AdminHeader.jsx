import useAdminStore from '../store/useAdminStore';

export default function AdminHeader() {
  const { user, logout } = useAdminStore();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-700">{user?.name}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
          <button 
            onClick={logout}
            className="text-red-600 hover:text-red-700 text-sm font-medium"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}