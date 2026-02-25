// src/Layout/UserLayout.jsx (or jo bhi path hai)
import React from 'react';
import Sidebar from '@/components/UserPanel/Sidebar';
import Header from '@/components/UserPanel/Header';
import { useAuthStore } from '../store/authStore';

export default function UserLayout({ children, activePage = "dashboard" }) {
  const { sidebarOpen } = useAuthStore();

  return (
    <div className="flex min-h-screen bg-neutral-200">
      {/* Sidebar */}
      <Sidebar activePage={activePage} />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        <Header />

        {/* Yeh line sabse important hai → perfect spacing */}
        <main
          className={`flex-1 p-4 sm:p-6 lg:p-8 transition-all duration-300 ease-in-out 
          ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}