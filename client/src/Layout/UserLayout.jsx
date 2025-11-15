// src/components/Layout/UserLayout.jsx
import React from 'react';
import Sidebar from '@/components/UserPanel/Sidebar';
import Header from '@/components/UserPanel/Header';
import { useUserStore } from '../store/authStore';

export default function UserLayout({ children, activePage = "dashboard" }) {
  const { sidebarOpen } = useUserStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100 flex">
      <Sidebar activePage={activePage} />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className={`flex-1 p-6 lg:p-8 transition-all duration-300 ${sidebarOpen ? 'lg:ml-20' : 'lg:ml-30'}`}>
          {children}
        </main>
      </div>
    </div>
  );
}