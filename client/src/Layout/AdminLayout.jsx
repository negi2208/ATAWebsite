// src/Layout/AdminLayout.jsx
import AdminSidebar from '@/components/AdminPanel/AdminSidebar';
import AdminHeader from '@/components/AdminPanel/AdminHeader';
import { Outlet } from 'react-router-dom';


export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
    
      <AdminSidebar />
    <div className="ml-64 flex-1 flex flex-col">
        <AdminHeader />
       <main className="p-6">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

