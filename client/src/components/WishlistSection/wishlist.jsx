// src/components/WishlistSection/Wishlist.jsx
import React, { useEffect, useState } from "react";
import EmptyWishlist from "./EmptyWishlist";
import { Trash2, ShoppingCart } from "lucide-react";
import { api } from "../../utils/api";
import { getGuestToken } from "../../utils/guest";
import toast from "react-hot-toast";

const WishlistSection = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const guest_token = getGuestToken();
  const user_id = localStorage.getItem("user_id");

  const fetchWishlist = async () => {
    try {
      const res = await api.get("/api/wishlist", {
        params: user_id ? { user_id } : { guest_token },
      });

      setWishlistItems(res.data?.data || []);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load wishlist");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const removeItem = async (product_id) => {
    try {
      await api.delete(`/api/wishlist/remove/${product_id}`, {
        data: user_id ? { user_id } : { guest_token },
      });

      setWishlistItems((prev) =>
        prev.filter((item) => item.product_id !== product_id)
      );

      toast.success("Removed from wishlist");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to remove item");
    }
  };

  if (loading) return null;
  if (wishlistItems.length === 0) return <EmptyWishlist />;


  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold">
          My Wishlist ({wishlistItems.length})
        </h2>
      </div>

      <div className="p-6 space-y-6">
        {wishlistItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 p-4 border rounded-lg"
          >
            {/* IMAGE PLACEHOLDER */}
            <div className="w-24 h-24 bg-gray-100 rounded-xl" />

            {/* PRODUCT INFO */}
            <div className="flex-1">
              <h3 className="font-semibold">
                {item.product?.name}
              </h3>
              <p className="text-primary-600 font-bold">
                ₹{Number(item.product?.price).toLocaleString("en-IN")}
              </p>
            </div>

            {/* ADD TO CART (OPTIONAL LATER) */}
            <button className="p-3 bg-primary-600 text-white rounded-lg">
              <ShoppingCart />
            </button>

            {/* REMOVE */}
            <button
              onClick={() => removeItem(item.product_id)}
              className="p-3 bg-red-100 text-red-600 rounded-lg"
            >
              <Trash2 />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistSection;
