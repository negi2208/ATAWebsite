import React, { useEffect, useState } from "react";
import AddressForm from "./AddressForm";
import OrderSummary from "./OrderSummary";
import { ArrowRight } from "lucide-react";
import axios from "axios";
import { api } from "../../utils/api";
import { getGuestToken } from "../../utils/guest";

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("online");

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const guest_token = getGuestToken();
  const user_id = localStorage.getItem("user_id");

  /* ================= FETCH CART ================= */
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

  if (loading) return null;

  if (!cartItems.length) {
    window.location.href = "/cart";
    return null;
  }

  /* ================= TOTALS ================= */
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const tax = subtotal * 0.18;
  const totalAmount = Math.round(subtotal + tax);

  /* ================= ADDRESS ================= */
  const handleAddressSubmit = (addr) => {
    setAddress(addr);
    setStep(2);
  };

  /* ================= COD ORDER ================= */
  const placeCODOrder = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/payment/cod`,
        {
          user: {
            full_name: address.name,
            phone: address.phone,
            address: `${address.address}, ${address.city} - ${address.pincode}`,
          },
          amount: totalAmount,
          guest_token,
        }
      );

      window.location.href = "/order-success";
    } catch (error) {
      console.error(error);
      alert("Order failed. Please try again.");
    }
  };

  /* ================= ONLINE PAYMENT ================= */
  const payNow = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/payment/create`,
        {
          user: {
            full_name: address.name,
            phone: address.phone,
            address: `${address.address}, ${address.city} - ${address.pincode}`,
          },
          amount: totalAmount,
          guest_token,
        }
      );

      const { key, order, user_id } = res.data;

      const options = {
        key,
        order_id: order.id,
        amount: order.amount,
        currency: order.currency,
        name: "ATA Tires & Wheels",
        description: "Order Payment",

        handler: async function (response) {
          await axios.post(
            `${import.meta.env.VITE_API_URL}/api/payment/verify`,
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              user_id,
              guest_token,
            }
          );

          window.location.href = "/order-success";
        },

        prefill: {
          name: address.name,
          contact: address.phone,
        },

        theme: { color: "#e11d48" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <>
      {/* HERO */}
      <section className="bg-gradient-to-br from-rose-600 to-primary-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold">Checkout</h1>
          <p className="opacity-90">Secure Payment</p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-3 gap-8">

            {/* LEFT */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-6">

              {/* STEP INDICATOR */}
              <div className="flex justify-center mb-10">
                <div className="flex items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${step >= 1 ? "bg-primary-600" : "bg-gray-300"}`}>1</div>
                  <div className="w-24 h-1 bg-gray-300 mx-4"></div>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${step >= 2 ? "bg-primary-600" : "bg-gray-300"}`}>2</div>
                </div>
              </div>

              {/* STEP 1 */}
              {step === 1 && <AddressForm onNext={handleAddressSubmit} />}

              {/* STEP 2 */}
              {step === 2 && (
                <div className="text-center py-12">

                  <h2 className="text-2xl font-bold mb-6">
                    Choose Payment Method
                  </h2>

                  <div className="flex justify-center gap-6 mb-8">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        value="online"
                        checked={paymentMethod === "online"}
                        onChange={() => setPaymentMethod("online")}
                      />
                      Online
                    </label>

                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        value="cod"
                        checked={paymentMethod === "cod"}
                        onChange={() => setPaymentMethod("cod")}
                      />
                      COD
                    </label>
                  </div>

                  <p className="text-2xl font-bold text-primary-600 mb-6">
                    ₹{totalAmount.toLocaleString("en-IN")}
                  </p>

                  {paymentMethod === "online" && (
                    <button
                      onClick={payNow}
                      className="bg-green-600 text-white py-4 px-14 rounded-full text-lg font-bold flex items-center gap-3 mx-auto"
                    >
                      Pay Now <ArrowRight />
                    </button>
                  )}

                  {paymentMethod === "cod" && (
                    <button
                      onClick={placeCODOrder}
                      className="bg-blue-600 text-white py-4 px-14 rounded-full text-lg font-bold flex items-center gap-3 mx-auto"
                    >
                      Place Order <ArrowRight />
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* RIGHT */}
            <OrderSummary items={cartItems} />
          </div>
        </div>
      </section>
    </>
  );
}