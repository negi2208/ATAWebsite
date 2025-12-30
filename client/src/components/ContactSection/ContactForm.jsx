
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import toast, { Toaster } from 'react-hot-toast';
import { Mail, Phone, MapPin, Globe, DollarSign, Package, Loader2 } from 'lucide-react';
import axios from "axios";

// Validation Schema
const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject is required'),
  message: z.string().optional(),
 
});

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });

const onSubmit = async (data) => {
  setIsLoading(true);
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/contact`,
      data
    );

    if (res.data?.success) {
      toast.success("Thank you! Your message has been sent successfully.");
      reset();
    } else {
      toast.error(res.data?.message || "Failed to send message.");
    }
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      "Failed to send message. Please try again."
    );
  } finally {
    setIsLoading(false);
  }
};


  return (
    <>
      <Toaster position="top-right" />

      <div className="min-h-screen bg-gray-50 py-12 px-4">
        {/* Header */}
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Contact Us</h1>
        </div>

        {/* Feature Cards */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-lg shadow-sm p-6 flex items-start space-x-4 hover:shadow-md transition">
            <div className="bg-red-100 p-3 rounded-full">
              <Package className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Original Products</h3>
              <p className="text-sm text-gray-600 mt-1">100% genuine auto parts from trusted brands.</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 flex items-start space-x-4 hover:shadow-md transition">
            <div className="bg-red-100 p-3 rounded-full">
              <DollarSign className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Affordable Rates</h3>
              <p className="text-sm text-gray-600 mt-1">Best prices with premium quality guaranteed.</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 flex items-start space-x-4 hover:shadow-md transition">
            <div className="bg-red-100 p-3 rounded-full">
              <Globe className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Wide Variety</h3>
              <p className="text-sm text-gray-600 mt-1">Thousands of parts available in stock.</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Our Stores */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Stores</h2>
            <p className="text-gray-600 mb-10 leading-relaxed">
              Visit our physical locations or contact us anytime. We're here to help you find the perfect part.
            </p>

            <div className="space-y-8">
              <div className="bg-white p-8 rounded-xl shadow-sm border">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3 mb-4">
                  <MapPin className="w-6 h-6 text-red-600" />
                  United States
                </h3>
                <p className="text-gray-700 font-medium">ATA Genuine Parts - New York</p>
                <p className="text-gray-600 mb-4">205 Middle Road, 2nd Floor, NY 10001</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-700">
                    <Phone className="w-5 h-5 text-red-600" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Mail className="w-5 h-5 text-red-600" />
                    <a href="mailto:usa@atagenuineparts.com" className="hover:text-red-600">usa@atagenuineparts.com</a>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm border">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3 mb-4">
                  <MapPin className="w-6 h-6 text-red-600" />
                  Netherlands
                </h3>
                <p className="text-gray-700 font-medium">ATA Europe HQ</p>
                <p className="text-gray-600 mb-4">Keizersgracht 241, 1016 EA Amsterdam</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-700">
                    <Phone className="w-5 h-5 text-red-600" />
                    <span>+31 20 765 4321</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Mail className="w-5 h-5 text-red-600" />
                    <a href="mailto:eu@atagenuineparts.com" className="hover:text-red-600">eu@atagenuineparts.com</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10 border">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Write to Us</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your name <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('name')}
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your email <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('subject')}
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
                  placeholder="How can we help you?"
                />
                {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your message
                </label>
                <textarea
                  {...register('message')}
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition resize-none"
                  placeholder="Write your message here..."
                />
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-lg transition duration-200 shadow-md hover:shadow-lg disabled:opacity-70 flex items-center justify-center gap-3"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}