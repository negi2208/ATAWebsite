// src/components/Checkout/CheckoutPage.jsx
import React, { useState } from "react";
import AddressForm from "./AddressForm";
import OrderSummary from "./OrderSummary";

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState(null);

  // DUMMY CART ITEMS (Zustand se replace kar dena)
  const cartItems = [
    { id: 1, name: "Michelin Pilot Sport 4", price: 12999, quantity: 2 },
    { id: 2, name: "Bridgestone Turanza T005", price: 10999, quantity: 1 }
  ];

  const subtotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);
  const totalAmount = Math.round(subtotal * 1.18); // GST included

  const handleAddressSubmit = (addr) => {
    setAddress(addr);
    setStep(2);
  };

  // RAZORPAY PAYMENT
  const payNow = () => {
    const options = {
      key: "rzp_test_9Bv6J1I2K3L4M5", // ← TEST KEY (safe hai)
      amount: totalAmount * 100,
      currency: "INR",
      name: "ATA Tires & Wheels",
      description: "Premium Tire Purchase",
      image: "/images/Logo/ata-logo-84.png",
      handler: function (response) {
        alert(`Payment Successful! 🎉\nPayment ID: ${response.razorpay_payment_id}`);
        // Redirect to success page
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
      theme: {
        color: "#e11d48"
      },
      modal: {
        ondismiss: () => {
          alert("Payment cancelled");
        }
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-rose-600 to-primary-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4"> Checkout</h1>
          <p className="text-xl opacity-90">100% Safe </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left: Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-2xl p-8">
                {/* Progress */}
                <div className="flex items-center justify-center mb-10">
                  <div className="flex items-center">
                    <div className={`w-14 h-14 rounded-full ${step >= 1 ? "bg-primary-600" : "bg-gray-300"} text-white flex items-center justify-center text-xl font-bold`}>1</div>
                    <div className="w-32 h-1 bg-gray-300 mx-4"></div>
                    <div className={`w-14 h-14 rounded-full ${step >= 2 ? "bg-primary-600" : "bg-gray-300"} text-white flex items-center justify-center text-xl font-bold`}>2</div>
                  </div>
                </div>

                {step === 1 && <AddressForm onNext={handleAddressSubmit} />}
                {step === 2 && (
                  <div className="text-center py-16">
                    <img src="https://razorpay.com/assets/razorpay-glyph.svg" alt="Razorpay" className="h-16 mx-auto mb-8" />
                    <h2 className="text-3xl font-bold mb-6">Complete Your Payment</h2>
                    <p className="text-2xl font-bold text-primary-600 mb-10">
                      ₹{totalAmount.toLocaleString("en-IN")}
                    </p>
                    <button
                      onClick={payNow}
                      className="bg-green-600 hover:bg-green-700 text-white font-bold py-6 px-20 rounded-full text-2xl shadow-2xl hover:shadow-green-500/50 transform hover:-translate-y-2 transition-all duration-300"
                    >
                      Pay Now → Razorpay
                    </button>
                    <p className="text-sm text-gray-500 mt-8">
                      UPI • Cards • Netbanking • Wallet • EMI Available
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Summary */}
            <div>
              <OrderSummary items={cartItems} address={address} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}