// src/components/UserPanel/OrderHistory.jsx
import UserLayout from '../../Layout/UserLayout';
import { Search, X } from "lucide-react";
import { useState, useMemo } from "react";

export default function OrderHistory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null); // For modal
  const itemsPerPage = 7;

  // Sample data
  const rawOrders = [
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
    { srNo: 11, productName: "Green Embroidered Kurta", price: 3499.00, qty: 3, status: "Delivered", date: "Oct 22, 2025", image: "https://via.placeholder.com/300" },
    { srNo: 12, productName: "Beige Pathani Suit", price: 5999.00, qty: 2, status: "Cancelled", date: "Oct 20, 2025", image: "https://via.placeholder.com/300" },
    { srNo: 13, productName: "Purple Velvet Gown", price: 7999.00, qty: 1, status: "Pending", date: "Nov 13, 2025", image: "https://via.placeholder.com/300" },
    { srNo: 14, productName: "Cream Silk Kurta Pajama", price: 4499.00, qty: 2, status: "Delivered", date: "Nov 09, 2025", image: "https://via.placeholder.com/300" },
    { srNo: 15, productName: "Teal Blue Anarkali", price: 6999.00, qty: 1, status: "Shipped", date: "Nov 07, 2025", image: "https://via.placeholder.com/300" },
    { srNo: 16, productName: "Orange Cotton Saree", price: 2999.00, qty: 3, status: "Processing", date: "Nov 04, 2025", image: "https://via.placeholder.com/300" },
    { srNo: 17, productName: "Grey Nehru Jacket Set", price: 5499.00, qty: 2, status: "Delivered", date: "Nov 02, 2025", image: "https://via.placeholder.com/300" },
    { srNo: 18, productName: "Indigo Denim Kurti", price: 2799.00, qty: 4, status: "Cancelled", date: "Oct 31, 2025", image: "https://via.placeholder.com/300" },
    { srNo: 19, productName: "Mustard Yellow Lehenga", price: 11999.00, qty: 1, status: "Pending", date: "Oct 28, 2025", image: "https://via.placeholder.com/300" },
    { srNo: 20, productName: "Silver Embellished Saree", price: 13999.00, qty: 1, status: "Delivered", date: "Oct 26, 2025", image: "https://via.placeholder.com/300" },
  ];

  // Filter by search
  const filteredOrders = useMemo(() => {
    if (!searchQuery.trim()) return rawOrders;
    const q = searchQuery.toLowerCase();
    return rawOrders.filter(order =>
      order.productName.toLowerCase().includes(q) ||
      order.status.toLowerCase().includes(q) ||
      order.date.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Pagination
  const totalItems = filteredOrders.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <UserLayout activePage="orders">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black mb-2">Order History</h1>
        <p className="text-gray-600 mb-8">Track and manage all your orders</p>

        {/* SEARCH BAR */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by product, status or date..."
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 
                         focus:outline-none focus:ring-2 focus:ring-primary-500 
                         focus:border-transparent transition-all text-sm"
            />
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Sr. No.</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Product Name</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">QTY</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Image</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedOrders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500 text-sm">
                      No orders found matching "<strong>{searchQuery}</strong>"
                    </td>
                  </tr>
                ) : (
                  paginatedOrders.map(order => (
                    <tr key={order.srNo} className="hover:bg-neutral-100 transition-colors">
                      <td className="px-6 py-5 text-sm font-medium text-gray-900">{order.srNo}</td>
                      <td className="px-6 py-5 text-sm text-gray-800 max-w-xs">
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
                          "bg-gray-100 text-gray-700"
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-sm text-gray-600">{order.date}</td>
                      <td className="px-6 py-5 text-center">
                        {/* Clickable Image with "Product" text */}
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
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          {totalItems > 17 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
              <p className="text-sm text-gray-600">
                Showing <strong>{(currentPage - 1) * itemsPerPage + 1}</strong> to{" "}
                <strong>{Math.min(currentPage * itemsPerPage, totalItems)}</strong> of{" "}
                <strong>{totalItems}</strong> results
              </p>

              <div className="flex gap-1">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-primary-50 border border-gray-300"
                  }`}
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      currentPage === page
                        ? "bg-black text-white"
                        : "bg-white text-gray-700 hover:bg-neutral-200 border border-gray-300"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-neutral-200 border border-gray-300"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
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