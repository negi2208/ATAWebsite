// src/components/UserPanel/OrderHistory.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthStore  } from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import { Search, X, Package } from "lucide-react";
import UserLayout from '../../Layout/UserLayout';

export default function OrderHistory() {
  const { isAuthenticated } = useAuthStore ();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  const limit = 7;

  // Fetch Orders
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/UserAuth/UserLogin");
      return;
    }
    fetchOrders();
  }, [isAuthenticated, navigate, currentPage]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);

      const endpoint = `${process.env.REACT_APP_API_URL}/api/user/order/list?page=${currentPage}&limit=${limit}`;
      const res = await axios.get(endpoint, { withCredentials: true });

      const data = res.data.data;
      const fetchedOrders = data.orders || [];
      
      setOrders(fetchedOrders);
      setFilteredOrders(fetchedOrders);
      setTotalPages(data.totalPages || 1);
      setTotalItems(data.totalItems || 0);
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/UserAuth/UserLogin");
      } else {
        setError(err.response?.data?.message || "Failed to load orders");
      }
      setOrders([]);
      setFilteredOrders([]);
    } finally {
      setLoading(false);
    }
  };

  // Search Handler
  const handleSearch = () => {
    if (!search.trim()) {
      setFilteredOrders(orders);
      return;
    }
    const filtered = orders.filter(order =>
      order.productName?.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredOrders(filtered);
  };

  const handleClear = () => {
    setSearch("");
    setFilteredOrders(orders);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const showNoMatches = search && filteredOrders.length === 0;

  return (
    <UserLayout activePage="orders">
      <div className="w-full max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-4xl font-black text-gray-900 mb-2">Order History</h1>
          <p className="text-gray-600">View and track all your past orders</p>
        </div>

        {/* Search Bar */}
        <div className="max-w-lg">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by product name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 
                         focus:outline-none focus:ring-2 focus:ring-pink-500 
                         focus:border-transparent transition-all text-sm"
              />
            </div>
            <button
              onClick={handleSearch}
              className="px-6 py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition"
            >
              Search
            </button>
            {search && (
              <button
                onClick={handleClear}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition"
              >
                Clear
              </button>
            )}
          </div>
          {search && (
            <p className="mt-2 text-sm text-gray-600">
              Searching for: <span className="font-semibold">"{search}"</span>
            </p>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="bg-white rounded-2xl shadow-lg p-16 text-center">
            <div className="inline-flex items-center gap-3">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-pink-600"></div>
              <span className="text-lg text-gray-600">Loading your orders...</span>
            </div>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
            <p className="text-red-700 font-medium text-lg">{error}</p>
            <button
              onClick={fetchOrders}
              className="mt-4 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && orders.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-16 text-center">
            <Package className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-600 font-medium">No orders yet</p>
            <p className="text-gray-500 mt-2">Your ordered items will appear here</p>
          </div>
        )}

        {/* Orders Table */}
        {!loading && !error && orders.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Sr. No.</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Product Name</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Qty</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Image</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="px-6 py-16 text-center text-gray-500">
                        <p className="text-lg">
                          No orders found matching <strong>"{search}"</strong>
                        </p>
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((order, index) => {
                      const srNo = (currentPage - 1) * limit + index + 1;
                      return (
                        <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-5 text-sm font-medium text-gray-900">{srNo}</td>
                          <td className="px-6 py-5 text-sm text-gray-800 max-w-xs">
                            <div className="truncate" title={order.productName}>
                              {order.productName || "N/A"}
                            </div>
                          </td>
                          <td className="px-6 py-5 text-sm font-bold text-gray-900">
                            ₹{order.price?.toFixed(2) || "N/A"}
                          </td>
                          <td className="px-6 py-5 text-sm text-center text-gray-700">
                            {order.quantity || 1}
                          </td>
                          <td className="px-6 py-5">
                            <span className={`inline-flex px-4 py-2 rounded-full text-xs font-bold ${
                              order.order_status === "Delivered" ? "bg-green-100 text-green-700" :
                              order.order_status === "Cancelled" ? "bg-red-100 text-red-700" :
                              order.order_status === "Processing" ? "bg-yellow-100 text-yellow-700" :
                              order.order_status === "Shipped" ? "bg-blue-100 text-blue-700" :
                              order.order_status === "Pending" ? "bg-orange-100 text-orange-700" :
                              "bg-gray-100 text-gray-700"
                            }`}>
                              {order.order_status || "Unknown"}
                            </span>
                          </td>
                          <td className="px-6 py-5 text-sm text-gray-600">
                            {order.order_date ? new Date(order.order_date).toLocaleDateString("en-IN") : "N/A"}
                          </td>
                          <td className="px-6 py-5 text-center">
                            {order.front_photo ? (
                              <button
                                onClick={() => setSelectedImage(order.front_photo)}
                                className="group focus:outline-none"
                              >
                                <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200 shadow-sm mx-auto hover:shadow-lg transition">
                                  <img
                                    src={order.front_photo}
                                    alt={order.productName}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                                  />
                                </div>
                                <p className="text-xs text-gray-500 mt-1">View</p>
                              </button>
                            ) : (
                              <span className="text-gray-400 text-xs">—</span>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalItems > limit && (
              <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-5 border-t border-gray-200 bg-gray-50 gap-4">
                <p className="text-sm text-gray-600">
                  Showing <strong>{(currentPage - 1) * limit + 1}</strong> -{" "}
                  <strong>{Math.min(currentPage * limit, totalItems)}</strong> of{" "}
                  <strong>{totalItems}</strong> orders
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                      currentPage === 1
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-white text-gray-700 hover:bg-pink-50 border border-gray-300"
                    }`}
                  >
                    Previous
                  </button>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const page = currentPage <= 3 ? i + 1 : currentPage > totalPages - 3 ? totalPages - 4 + i : currentPage - 2 + i;
                    if (page < 1 || page > totalPages) return null;
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          currentPage === page
                            ? "bg-pink-600 text-white"
                            : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                      currentPage === totalPages
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-white text-gray-700 hover:bg-pink-50 border border-gray-300"
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition"
            >
              <X className="w-10 h-10" />
            </button>
            <img
              src={selectedImage}
              alt="Product"
              className="w-full h-auto rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </UserLayout>
  );
}