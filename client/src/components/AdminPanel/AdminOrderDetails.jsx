import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader2, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router";
import { resolveImageUrl } from "../../utils/ImagesUtils";

const AdminOrderDetails = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const { orderId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/management/order/${orderId}`,
          { withCredentials: true }
        );

        const { success, data } = res.data;

        if (success && data) {
          setOrder(data);
        } else {
          toast.error("Order not found");
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch order details");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin text-blue-500" size={40} />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 font-semibold">
        Order not found
      </div>
    );
  }

  const orderStatusClass = {
    PLACED: "bg-yellow-100 text-yellow-700",
    CONFIRMED: "bg-blue-100 text-blue-700",
    SHIPPED: "bg-purple-100 text-purple-700",
    DELIVERED: "bg-green-100 text-green-700",
    CANCELLED: "bg-red-100 text-red-700",
  };

  const paymentStatusClass = {
    PENDING: "bg-yellow-100 text-yellow-700",
    PAID: "bg-green-100 text-green-700",
    FAILED: "bg-red-100 text-red-700",
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6 bg-gray-50 min-h-screen">

      {/* 🔙 BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-blue-600 hover:underline"
      >
        <ArrowLeft size={18} /> Back to Orders
      </button>

      {/* ================= ORDER INFO ================= */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">Order Details</h2>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div><b>Order ID:</b> {order.id}</div>
          <div><b>User ID:</b> {order.user_id}</div>
          <div><b>Cart ID:</b> {order.cart_id}</div>

          <div>
            <b>Order Status:</b>{" "}
            <span
              className={`px-2 py-1 text-xs font-semibold rounded-full ${orderStatusClass[order.order_status]
                }`}
            >
              {order.order_status}
            </span>
          </div>

          <div>
            <b>Payment Status:</b>{" "}
            <span
              className={`px-2 py-1 text-xs font-semibold rounded-full ${paymentStatusClass[order.payment_status]
                }`}
            >
              {order.payment_status}
            </span>
          </div>

          <div><b>Total Amount:</b> ₹{order.total_amount}</div>

          <div>
            <b>Created At:</b>{" "}
            {new Date(order.created_at).toLocaleString()}
          </div>
        </div>
      </div>

      {/* ================= CUSTOMER INFO ================= */}
      {order.User && (
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">Customer Information</h2>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <b>Name:</b> {order.User.full_name}
            </div>

            <div>
              <b>Phone:</b> {order.User.phone}
            </div>

            <div className="col-span-2">
              <b>Address:</b> {order.User.address}
            </div>
          </div>
        </div>
      )}

      {/* ================= ORDER ITEMS ================= */}
      {order.items?.length > 0 && (
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">Order Items</h2>

          {order.items.map((item, index) => {
            const variant = item.variant;
            const product = variant?.product;
            const images = variant?.ProductImage;

            return (
              <div
                key={index}
                className="border rounded-lg p-4 mb-6 space-y-4"
              >
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><b>Quantity:</b> {item.quantity}</div>
                  <div><b>Item Price:</b> ₹{item.price}</div>
                  <div><b>Variant:</b> {variant?.variant_name}</div>
                  <div><b>Part No:</b> {variant?.part_no}</div>
                  <div><b>Color:</b> {variant?.color}</div>
                  <div><b>Product:</b> {product?.name}</div>
                  {product?.brand && (<div><b>Brand:</b> {product?.brand}</div>)}
                  <div><b>Product Price:</b> ₹{product?.price}</div>
                </div>

                {/* 🖼️ PRODUCT IMAGES */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {images?.front_img && (
                    <img
                      src={resolveImageUrl(images?.front_img)}
                      alt="Front"
                      className="h-40 w-full object-cover rounded"
                    />
                  )}
                  {images?.left_img && (
                    <img
                      src={resolveImageUrl(images?.left_img)}
                      alt="Left"
                      className="h-40 w-full object-cover rounded"
                    />
                  )}
                  {images?.right_img && (
                    <img
                      src={resolveImageUrl(images?.right_img)}
                      alt="Right"
                      className="h-40 w-full object-cover rounded"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminOrderDetails;
