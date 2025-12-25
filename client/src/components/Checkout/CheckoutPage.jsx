// src/components/Checkout/CheckoutPage.jsx
import React, { useState } from "react";
import AddressForm from "./AddressForm";
import OrderSummary from "./OrderSummary";
import { ArrowRight } from "lucide-react";

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState(null);

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

  // Razorpay Payment
  const payNow = () => {
    const options = {
      key: "rzp_test_9Bv6J1I2K3L4M5",
      amount: totalAmount * 100,
      currency: "INR",
      name: "ATA Tires & Wheels",
      description: "Premium Tire Purchase",
      image: "/images/Logo/ata-logo-84.png",
      handler: function (response) {
        alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
        window.location.href = "/order-success";
      },
      prefill: {
        name: address.name,
        contact: address.phone,
        email: "customer@atatires.com"
      },
      notes: {
        address: `${address.address}, ${address.city} - ${address.pincode}`
      },
      theme: { color: "#e11d48" }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
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
                    <img
                      src="https://razorpay.com/assets/razorpay-glyph.svg"
                      alt="Razorpay"
                      className="h-12 sm:h-16 mx-auto mb-6"
                    />

                    <h2 className="text-2xl sm:text-3xl font-bold mb-4">Complete Your Payment</h2>

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
