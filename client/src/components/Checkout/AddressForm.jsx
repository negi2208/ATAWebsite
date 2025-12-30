// src/components/Checkout/AddressForm.jsx
import React, { useState } from "react";

export default function AddressForm({ onNext }) {
  const [form, setForm] = useState({
    name: "", phone: "", pincode: "", city: "", address: "", landmark: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, '');
      const limited = digitsOnly.slice(0, 10);
      setForm({ ...form, [name]: limited });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.pincode || !form.address) {
      alert("Please fill all required fields");
      return;
    }
    onNext(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="text-2xl font-bold mb-6">Delivery Address</h3>

      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          required
          placeholder="Full Name *"
          value={form.name}
          onChange={handleChange}
          className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-600 focus:outline-none"
        />
        <input
          type="tel"
          name="phone"
          required
          placeholder="Mobile Number *"
          value={form.phone}
          onChange={handleChange}
          pattern="[0-9]{10}"
          title="Please enter a 10-digit mobile number"
          className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-600"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="text"
          name="pincode"
          required
          placeholder="Pincode *"
          value={form.pincode}
          onChange={handleChange}
          className="w-full px-5 py-4 border border-gray-300 rounded-xl"
        />
        <input
          type="text"
          name="city"
          required
          placeholder="City *"
          value={form.city}
          onChange={handleChange}
          className="w-full px-5 py-4 border border-gray-300 rounded-xl"
        />
      </div>

      <textarea
        name="address"
        required
        rows="3"
        placeholder="Full Address (House No, Street, Area) *"
        value={form.address}
        onChange={handleChange}
        className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-600"
      />

      {/* <input
        type="text"
        name="landmark"
        placeholder="Landmark (Optional)"
        value={form.landmark}
        onChange={handleChange}
        className="w-full px-5 py-4 border border-gray-300 rounded-xl"
      /> */}

      <button
        type="submit"
        className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-5 rounded-xl text-lg transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1"
      >
        Continue to Payment
      </button>
    </form>
  );
}
