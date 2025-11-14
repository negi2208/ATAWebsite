// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import UserLayout from '../../Layout/UserLayout';
import StatsCard from '../../components/UserPanel/StatsCard';
import { Package, Clock, Heart, Headphones, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [selectedImage, setSelectedImage] = useState(null);

  const user = {
    name: "Rahul Sharma",
    totalOrders: 156,
    pendingOrders: 3,
    wishlistItems: 8,
    supportTickets: 2,
  };

  const allOrders = [
    { srNo: 1, productName: "Dark Green Gown With Front And Back Fea...", price: 5999.00, qty: 3, status: "Cancelled", date: "Oct 30, 2025", image: "https://via.placeholder.com/300" },
    { srNo: 2, productName: "Royal Blue Velvet Short Kurta With Hand...", price: 4999.00, qty: 3, status: "Delivered", date: "Oct 27, 2025", image: "https://via.placeholder.com/300" },
    { srNo: 3, productName: "Black Silk Saree With Golden Border", price: 8999.00, qty: 1, status: "Processing", date: "Nov 12, 2025", image: "https://via.placeholder.com/300" },
    { srNo: 4, productName: "Red Anarkali Suit with Dupatta", price: 7499.00, qty: 2, status: "Shipped", date: "Nov 10, 2025", image: "https://via.placeholder.com/300" },
    { srNo: 5, productName: "White Cotton Kurti Set", price: 2499.00, qty: 5, status: "Delivered", date: "Nov 08, 2025", image: "https://via.placeholder.com/300" },
    { srNo: 6, productName: "Maroon Lehenga Choli", price: 12999.00, qty: 1, status: "Pending", date: "Nov 14, 2025", image: "https://via.placeholder.com/300" },
    { srNo: 7, productName: "Pink Georgette Saree", price: 5499.00, qty: 2, status: "Cancelled", date: "Nov 05, 2025", image: "https://via.placeholder.com/300" },
    { srNo: 8, productName: "Navy Blue Sherwani", price: 8999.00, qty: 1, status: "Delivered", date: "Nov 01, 2025", image: "https://via.placeholder.com/300" },
    { srNo: 9, productName: "Yellow Salwar Kameez", price: 3999.00, qty: 4, status: "Processing", date: "Oct 29, 2025", image: "https://via.placeholder.com/300" },
    { srNo: 10, productName: "Golden Banarasi Saree", price: 15999.00, qty: 1, status: "Shipped", date: "Oct 25, 2025", image: "https://via.placeholder.com/300" },
  ];

  // SIRF 5 RECENT ORDERS → LATEST DATE FIRST → Sr. No. 1 SE
  const recentOrders = [...allOrders]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5)
    .map((order, index) => ({
      ...order,
      displaySrNo: index + 1  // ← YEH NAYA FIELD
    }));

  return (
    <UserLayout activePage="dashboard">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard title="Total Orders" value={user.totalOrders} icon={Package} color="text-pink-600" />
          <StatsCard title="Pending Orders" value={user.pendingOrders} icon={Clock} color="text-yellow-600" />
          <StatsCard title="Wishlist Items" value={user.wishlistItems} icon={Heart} color="text-purple-600" />
          <StatsCard title="Support Tickets" value={user.supportTickets} icon={Headphones} color="text-green-600" />
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-800">Recent Orders</h3>
            <Link 
              to="/user/orders" 
              className="text-primary-600 font-bold hover:underline text-sm flex items-center gap-1 cursor-pointer"
            >
              View All <span>→</span>
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Sr. No.</th>
                  <th className="px-6 pl-8 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Product Name</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">QTY</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Image</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentOrders.map(order => (
                  <tr key={order.srNo} className="hover:bg-neutral-100 transition-colors">
                    {/* YAHAN displaySrNo USE KARO */}
                    <td className="px-6 py-5 text-sm font-medium text-gray-900">{order.displaySrNo}</td>
                    <td className="px-6 pl-8 py-5 text-sm text-gray-800 max-w-xs">
                      <div className="truncate" title={order.productName}>{order.productName}</div>
                    </td>
                    <td className="px-6 py-5 text-sm font-bold text-gray-900">₹{order.price.toFixed(2)}</td>
                    <td className="px-6 py-5 text-sm font-medium text-gray-700 text-center">{order.qty}</td>
                    <td className="px-6 py-5">
                      <span className={`inline-flex items-center px-4 py-2 rounded-full text-xs font-bold ${
                        order.status === "Delivered" ? "bg-green-100 text-green-700" :
                        order.status === "Cancelled" ? "bg-red-100 text-red-700" :
                        order.status === "Processing" ? "bg-yellow-100 text-yellow-700" :
                        order.status === "Shipped" ? "bg-blue-100 text-blue-700" :
                        order.status === "Pending" ? "bg-orange-100 text-orange-700" :
                        "bg-gray-100 text-gray-700"
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-sm text-gray-600">{order.date}</td>
                    <td className="px-6 py-5 text-center">
                      <button
                        onClick={() => setSelectedImage(order.image)}
                        className="group inline-block focus:outline-none"
                      >
                        <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200 shadow-sm mx-auto">
                          <img 
                            src={order.image} 
                            alt={order.productName} 
                            className="w-full h-full object-cover transition-transform group-hover:scale-105"
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Product</p>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Full Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-3xl w-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 p-1 transition-all"
            >
              <X className="w-8 h-8" />
            </button>
            <img 
              src={selectedImage} 
              alt="Full size product"
              className="w-full h-auto rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </UserLayout>
  );
}