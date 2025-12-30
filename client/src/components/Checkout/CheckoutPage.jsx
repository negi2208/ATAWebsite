// src/components/Checkout/CheckoutPage.jsx
import React, { useState } from "react";
import AddressForm from "./AddressForm";
import OrderSummary from "./OrderSummary";
import { ArrowRight } from "lucide-react";
import axios from "axios";


export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("online"); // "online" or "cod"

  // Dummy Cart
  const cartItems = [
    { id: 1, name: "Michelin Pilot Sport 4", price: 12999, quantity: 2 },
    { id: 2, name: "Bridgestone Turanza T005", price: 10999, quantity: 1 }
  ];

  const subtotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);
  const totalAmount = Math.round(subtotal * 1.18);

  const handleAddressSubmit = (addr) => {
    setAddress(addr);
    setStep(2);
  };

  // COD Order
  const placeCODOrder = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/payment/cod`,
        {
          user: {
            full_name: address.name,
            phone: address.phone,
            address: `${address.address}, ${address.city} - ${address.pincode}`,
          },
          amount: totalAmount,
          guest_token: localStorage.getItem("guest_token"),
        }
      );

      window.location.href = "/order-success";
    } catch (error) {
      console.error(error);
      alert("Order failed. Please try again.");
    }
  };

  // Razorpay Payment
const payNow = async () => {
  try {
    // 1️⃣ Call create payment API
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/payment/create`,
      {
        user: {
          full_name: address.name,
          phone: address.phone,
          address: `${address.address}, ${address.city} - ${address.pincode}`,
        },
        amount: totalAmount,
        guest_token: localStorage.getItem("guest_token"),
      }
    );

    const { key, order, user_id } = res.data;

    // 2️⃣ Open Razorpay Checkout
    const options = {
      key,
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,

      name: "ATA Tires & Wheels",
      description: "Order Payment",

      handler: async function (response) {
        // 3️⃣ Verify payment + create order
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/payment/verify`,
          {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            user_id, 
            guest_token: localStorage.getItem("guest_token"),
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
      {/* Hero */}
      <section className="bg-gradient-to-br from-rose-600 to-primary-700 text-white py-14 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-2">Checkout</h1>
          <p className="text-lg opacity-90">100% Safe & Secure Payment</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">

          {/* Grid */}
          <div className="grid lg:grid-cols-3 gap-8">

            {/* LEFT SIDE — FORM */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">

                {/* Step Progress */}
                <div className="flex items-center justify-center mb-10">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl ${step >= 1 ? "bg-primary-600" : "bg-gray-300"}`}>1</div>

                    <div className="w-20 sm:w-32 h-1 bg-gray-300 mx-2 sm:mx-4"></div>

                    <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl ${step >= 2 ? "bg-primary-600" : "bg-gray-300"}`}>2</div>
                  </div>
                </div>

                {/* Step 1 – Address Form */}
                {step === 1 && <AddressForm onNext={handleAddressSubmit} />}

                {/* Step 2 – Payment */}
                {step === 2 && (
                  <div className="text-center py-16 px-4">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-6">Choose Payment Method</h2>

                    {/* Payment Method Selection */}
                    <div className="mb-8">
                      <div className="flex justify-center gap-6 mb-4">
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="online"
                            checked={paymentMethod === "online"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="mr-2"
                          />
                          <span className="text-lg font-medium">Online Payment</span>
                        </label>
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="cod"
                            checked={paymentMethod === "cod"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="mr-2"
                          />
                          <span className="text-lg font-medium">Cash on Delivery</span>
                        </label>
                      </div>
                    </div>

                    {paymentMethod === "online" && (
                      <>
                        <img
                          src="https://razorpay.com/assets/razorpay-glyph.svg"
                          alt="Razorpay"
                          className="h-12 sm:h-16 mx-auto mb-6"
                        />

                        <h3 className="text-xl font-bold mb-4">Complete Your Payment</h3>

                        <p className="text-2xl font-bold text-primary-600 mb-6">
                          ₹{totalAmount.toLocaleString("en-IN")}
                        </p>

                        {/* Pay Button */}
                        <button
                          onClick={payNow}
                          className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 sm:py-5 px-10 sm:px-20 rounded-full text-xl shadow-xl hover:shadow-green-500/40 transition-transform transform hover:-translate-y-1 flex items-center gap-3 mx-auto"
                        >
                          Pay Now <ArrowRight className="w-6 h-6" />
                        </button>

                        <p className="text-sm text-gray-500 mt-6">
                          UPI • Cards • Netbanking • Wallet • EMI Available
                        </p>
                      </>
                    )}

                    {paymentMethod === "cod" && (
                      <>
                        <h3 className="text-xl font-bold mb-4">Cash on Delivery</h3>

                        <p className="text-2xl font-bold text-primary-600 mb-6">
                          ₹{totalAmount.toLocaleString("en-IN")}
                        </p>

                        <p className="text-gray-600 mb-6">
                          Pay when your order is delivered to your doorstep.
                        </p>

                        {/* COD Button */}
                        <button
                          onClick={placeCODOrder}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 sm:py-5 px-10 sm:px-20 rounded-full text-xl shadow-xl hover:shadow-blue-500/40 transition-transform transform hover:-translate-y-1 flex items-center gap-3 mx-auto"
                        >
                          Place Order <ArrowRight className="w-6 h-6" />
                        </button>
                      </>
                    )}
                  </div>
                )}

              </div>
            </div>

            {/* RIGHT SIDE — SUMMARY */}
            <div className="">
              <OrderSummary items={cartItems} address={address} />
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
