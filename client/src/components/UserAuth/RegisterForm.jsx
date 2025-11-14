// src/components/UserAuth/RegisterForm.jsx
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useUserStore } from '../../store/useUserStore';
import { toast } from 'react-hot-toast'; // Toast library

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    address: ''
  });

  const { login } = useUserStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Step 1: Save user (but don't login)
    login({
      name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      photo: null
    });

    // Step 2: Show Toast
    toast.success("Registration successful! Please login.", {
      duration: 4000,
      position: 'top-center',
      style: {
        background: '#10b981',
        color: 'white',
        fontWeight: 'bold',
      },
    });

    // Step 3: Reset form
    setFormData({
      fullName: '',
      email: '',
      password: '',
      phone: '',
      address: ''
    });
    setShowPassword(false);

    // NO REDIRECT — Stay on same page
  };

  return (
    <div>
      <form className="space-y-5" onSubmit={handleSubmit}>

        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Rahul Sharma"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="rahul@example.com"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 pr-14 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="+91 98765 43210"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address <span className="text-red-500">*</span>
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            rows="3"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="123, Green Valley, Sector 42, Gurgaon..."
          />
        </div>

        <p className="text-xs text-gray-500 leading-relaxed">
          Your personal data will be used to support your experience throughout this website, 
          to manage access to your account, and for other purposes described in our &nbsp;
          <a href="#" className="text-blue-600 hover:underline">privacy policy</a>.
        </p>

        <button
          type="submit"
          className="w-full bg-primary-600 text-white py-3.5 rounded-lg font-bold text-lg hover:bg-primary-700 transition-all shadow-md mt-6"
        >
          Register
        </button>
      </form>
    </div>
  );
}