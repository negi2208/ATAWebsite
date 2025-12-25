// src/components/UserPanel/SupportPage.jsx
import React, { useState } from 'react';
import UserLayout from '../../Layout/UserLayout';
import { Phone, Mail, MessageCircle, ChevronDown, ChevronUp, FileText } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function SupportPage() {
  const [formData, setFormData] = useState({
    title: '',
    message: ''
  });

  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Ticket submitted successfully! We’ll get back soon.', {
      duration: 5000,
      style: { background: '#10b981', color: 'white', fontWeight: 'bold' },
    });
    setFormData({ title: '', message: '' });
  };

  const handleCancel = () => {
    setFormData({ title: '', message: '' });
  };

  const faqs = [
    {
      q: "How long does delivery take?",
      a: "Standard delivery takes 3-5 business days. Express delivery is available in 1-2 days for select locations."
    },
    {
      q: "What is your return policy?",
      a: "We offer a 15-day return policy for unused items in original packaging. Custom parts are non-returnable."
    },
    {
      q: "Do you provide installation support?",
      a: "Yes! We offer free video call installation for all products. Book a slot via WhatsApp."
    },
    {
      q: "Are spare parts genuine?",
      a: "100% genuine OEM parts with 6-month warranty. Each part comes with a authenticity certificate."
    }
  ];

  return (
    <UserLayout activePage="support">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-black mb-3">Need Help?</h1>
          <p className="text-lg text-gray-600">We're here 24/7 to assist you</p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow-md p-6 text-center border border-red-100">
            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-7 h-7 text-red-600" />
            </div>
            <h3 className="font-bold text-gray-800">Call Us</h3>
            <p className="text-2xl font-bold text-red-600 mt-2">+91 98765 43210</p>
            <p className="text-sm text-gray-500 mt-1">Mon-Sun: 9AM - 9PM</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 text-center border border-red-100">
            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-7 h-7 text-red-600" />
            </div>
            <h3 className="font-bold text-gray-800">WhatsApp</h3>
            <p className="text-2xl font-bold text-red-600 mt-2">+91 98765 43210</p>
            <p className="text-sm text-gray-500 mt-1">Instant reply guaranteed</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 text-center border border-red-100">
            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-7 h-7 text-red-600" />
            </div>
            <h3 className="font-bold text-gray-800">Email Us</h3>
            <p className="text-lg font-bold text-red-600 mt-2">support@bikezone.com</p>
            <p className="text-sm text-gray-500 mt-1">Reply within 2 hours</p>
          </div>
        </div>

        {/* Ticket Form + FAQ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Ticket Form (Only Title + Message) */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-red-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <FileText className="w-6 h-6 text-red-600" />
              Raise a Support Ticket
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="Enter ticket title"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-700 placeholder-gray-400"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Describe your issue"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-700 placeholder-gray-400 resize-none"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-red-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-red-700 transition-all shadow-md"
                >
                  Submit Ticket
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>

          {/* FAQ Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between hover:bg-red-50 transition-all rounded-xl"
                  >
                    <span className="font-medium text-gray-800 pr-4">{faq.q}</span>
                    {openFaq === i ? <ChevronUp className="w-5 h-5 text-red-600" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-4 pt-2 text-gray-600 text-sm">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </UserLayout>
  );
}