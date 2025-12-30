// src/components/Cart/CartSection.jsx
import React, { useEffect, useState } from "react";
import EmptyCart from "./EmptyCart";
import { Trash2, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";
import { api } from "../../utils/api";
import { getGuestToken } from "../../utils/guest";

const CartImageSlider = ({ images, alt }) => {
  const [index, setIndex] = React.useState(0);

  const finalImages =
    images && images.length > 0
      ? images
      : ["/images/placeholder.jpg"];

  React.useEffect(() => {
    if (finalImages.length <= 1) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % finalImages.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [finalImages.length]);

  return (
    <img
      src={finalImages[index]}
      alt={alt}
      className="w-full h-full object-cover transition-opacity duration-700"
    />
  );
};

export default function CartSection() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const guest_token = getGuestToken();
  const user_id = localStorage.getItem("user_id"); 

  const fetchCart = async () => {
    try {
      const res = await api.get("/api/cart", {
        params: user_id ? { user_id } : { guest_token },
      });

      setCartItems(res.data?.data?.items || []);
    } catch (err) {
      console.error("Failed to fetch cart", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);


  const updateQuantity = async (itemId, newQty) => {
    if (newQty < 1) return;

    await api.put("/api/cart/update", {
      itemId,
      quantity: newQty,
    });

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const removeItem = async (itemId) => {
    await api.delete(`/api/cart/remove/${itemId}`);
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  if (loading) return null;
  if (cartItems.length === 0) return <EmptyCart />;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  return (
    <div className="grid lg:grid-cols-3 gap-6 xl:gap-8">
      {/* CART ITEMS */}
      <div className="lg:col-span-2 space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          Shopping Cart ({cartItems.length} items)
        </h2>

        {cartItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all"
          >
            <div className="flex flex-col sm:flex-row gap-4 p-4">
              {/* IMAGE */}
              {/* IMAGE – FULL WIDTH */}
              <div className="w-full sm:w-48 md:w-56 lg:w-64 h-40 sm:h-32 md:h-36 lg:h-40 flex-shrink-0 rounded-xl overflow-hidden border">
                <CartImageSlider
                  alt={item.product?.name}
                  images={
                    item.product?.variants?.[0]?.ProductImage
                      ? [
                        item.product.variants[0].ProductImage.front_img,
                        item.product.variants[0].ProductImage.left_img,
                        item.product.variants[0].ProductImage.right_img,
                      ].filter(Boolean)
                      : []
                  }
                />
              </div>
              {/* DETAILS */}
              <div className="flex-1">
                <h3 className="font-bold text-lg">
                  {item.product?.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {item.product?.brand}
                </p>
                <p className="text-xl font-bold text-primary-600">
                  ₹{Number(item.price).toLocaleString("en-IN")}
                </p>
              </div>

              {/* QTY + REMOVE */}
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-gray-100 rounded-full px-3">
                  <button
                    onClick={() =>
                      updateQuantity(item.id, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1}
                  >
                    <Minus />
                  </button>

                  <span className="px-4 font-bold">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      updateQuantity(item.id, item.quantity + 1)
                    }
                  >
                    <Plus />
                  </button>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="p-3 bg-red-100 text-red-600 rounded-xl"
                >
                  <Trash2 />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* SUMMARY */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24">
          <h3 className="text-xl font-bold mb-4">Order Summary</h3>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(0)}</span>
            </div>
            <div className="flex justify-between">
              <span>GST (18%)</span>
              <span>₹{tax.toFixed(0)}</span>
            </div>
            <div className="border-t pt-4 flex justify-between text-xl font-bold">
              <span>Total</span>
              <span className="text-primary-600">
                ₹{total.toFixed(0)}
              </span>
            </div>
          </div>

          <Link
            to="/checkout"
            className="block mt-6 bg-primary-600 text-white py-4 rounded-xl text-center font-bold"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
