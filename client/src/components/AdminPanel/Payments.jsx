import React, { useState, useEffect } from "react";
import { Eye, Download } from "lucide-react";
import axios from "axios";
import * as XLSX from "xlsx";
import toast from "react-hot-toast";

const Detail = ({ label, value, badge }) => (
  <div className="flex justify-between items-center">
    <span className="text-gray-500">{label}</span>

    {badge ? (
      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 capitalize">
        {value}
      </span>
    ) : (
      <span className="font-medium text-right">{value}</span>
    )}
  </div>
);

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [transactionId, setTransactionId] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 10;

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/management/payment`,
        {
          params: {
            transaction_id: transactionId,
            status: statusFilter,
            start_date: startDate || null,
            end_date: endDate || null,
            page: currentPage,
            limit,
          },
          withCredentials: true,
        }
      );

      const { success, data, message } = res.data;

      if (success) {
        const normalized = (data.data || []).map((p) => ({
          id: p.id,
          order_id: p.order_id,
          amount: p.amount,
          payment_status: p.status?.toLowerCase(),
          transaction_id: p.razorpay_payment_id || "-",

          // SAME FIELD AS BACKEND FILTER
          payment_date: p.createdAt,
        }));

        setPayments(normalized);
        setTotalPages(data.pagination?.totalPages || 1);

        if (message) toast.success(message);
      } else {
        setPayments([]);
        toast.error(message || "Failed to fetch payments");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error fetching payments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [currentPage, statusFilter, startDate, endDate]);

  const handleSearch = () => {
    setCurrentPage(1);
    fetchPayments();
  };

  const exportExcel = () => {
    if (!payments.length) return;

    const worksheet = XLSX.utils.json_to_sheet(
      payments.map((p, idx) => ({
        SR: (currentPage - 1) * limit + idx + 1,
        "Payment ID": p.id,
        "Order ID": p.order_id,
        Amount: p.amount,
        Status: p.payment_status,
        "Transaction ID": p.transaction_id,
        "Payment Date": p.payment_date
          ? new Date(p.payment_date).toISOString().split("T")[0]
          : "-",
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Payments");
    XLSX.writeFile(workbook, "Payments_Report.xlsx");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Payments & Transactions</h2>
        <button
          onClick={exportExcel}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Download className="h-4 w-4" /> Export Report
        </button>
      </div>

      {/* Filters */}
      <div className="mb-4 flex gap-2 w-full bg-white shadow-sm p-4 rounded-lg">
        <input
          type="text"
          placeholder="Search by Transaction ID..."
          value={transactionId}
          onChange={(e) => setTransactionId(e.target.value)}
          className="border rounded-lg px-3 py-2 w-full"
        />

        <button
          onClick={handleSearch}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg"
        >
          Search
        </button>

        <select
          className="border rounded-lg px-3 py-2"
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="all">All</option>
          <option value="created">Created</option>
          <option value="success">Success</option>
          <option value="failed">Failed</option>
          <option value="refunded">Refunded</option>
        </select>

        <input
          type="date"
          className="border rounded-lg px-3 py-2"
          value={startDate}
          onChange={(e) => {
            setStartDate(e.target.value);
            setCurrentPage(1);
          }}
        />

        <input
          type="date"
          className="border rounded-lg px-3 py-2"
          value={endDate}
          onChange={(e) => {
            setEndDate(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        {loading ? (
          <div className="text-center p-6 text-gray-500">
            Loading payments...
          </div>
        ) : payments.length === 0 ? (
          <div className="text-center p-6 text-gray-500">
            No transactions available.
          </div>
        ) : (
          <table className="w-full border-collapse">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-3 border">SR.</th>
                <th className="p-3 border">Payment ID</th>
                <th className="p-3 border">Order ID</th>
                <th className="p-3 border">Amount</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Transaction ID</th>
                <th className="p-3 border">Payment Date</th>
                <th className="p-3 border text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {payments.map((p, index) => (
                <tr key={p.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 border">
                    {(currentPage - 1) * limit + index + 1}
                  </td>

                  <td className="p-3 border text-blue-600">{p.id}</td>

                  <td className="p-3 border">{p.order_id}</td>

                  <td className="p-3 border font-bold">{p.amount}</td>

                  <td className="p-3 border capitalize">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${p.payment_status === "created"
                        ? "bg-yellow-100 text-yellow-800"
                        : p.payment_status === "success"
                          ? "bg-green-100 text-green-800"
                          : p.payment_status === "failed"
                            ? "bg-red-100 text-red-800"
                            : p.payment_status === "refunded"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                    >
                      {p.payment_status}
                    </span>
                  </td>

                  <td className="p-3 border">{p.transaction_id}</td>

                  <td className="p-3 border">
                    {p.payment_date
                      ? new Date(p.payment_date)
                        .toISOString()
                        .split("T")[0]
                      : "-"}
                  </td>

                  <td className="p-3 border text-center">
                    <Eye
                      className="h-4 w-4 text-blue-600 cursor-pointer inline-block"
                      onClick={() => setSelectedPayment(p)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-end items-center gap-2 mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 border rounded ${currentPage === i + 1
                ? "bg-blue-600 text-white"
                : ""
                }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Payment Modal */}
      {selectedPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 relative shadow-lg">

            {/* Close */}
            <button
              className="absolute top-3 right-3 text-gray-400 text-xl hover:text-black"
              onClick={() => setSelectedPayment(null)}
            >
              &times;
            </button>

            <h3 className="text-lg font-bold mb-4 border-b pb-2">
              Payment Details
            </h3>

            <div className="space-y-3 text-sm">
              <Detail label="Payment ID" value={selectedPayment.id} />
              <Detail label="Order ID" value={selectedPayment.order_id} />
              <Detail label="Amount" value={`₹${selectedPayment.amount}`} />
              <Detail
                label="Transaction ID"
                value={selectedPayment.transaction_id || "-"}
              />
              <Detail
                label="Payment Date"
                value={
                  selectedPayment.payment_date
                    ? new Date(selectedPayment.payment_date)
                      .toLocaleDateString("en-IN")
                    : "-"
                }
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payments;