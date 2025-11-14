// src/components/UserPanel/OrderTrackingPage.jsx
import React, { useState, useEffect } from 'react';
import UserLayout from '../../Layout/UserLayout';
import { Package, Truck, CheckCircle, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { format } from 'date-fns';

const statusConfig = {
  Pending: { color: 'bg-blue-100 text-blue-800', icon: Package },
  'In Transit': { color: 'bg-orange-100 text-orange-800', icon: Truck },
  Delivered: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
  Issues: { color: 'bg-red-100 text-red-800', icon: AlertCircle },
};

export default function OrderTrackingPage() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('All Orders');
  const [expanded, setExpanded] = useState({});

  // DUMMY ORDERS – 3 PENDING, 2 IN TRANSIT, 12 DELIVERED, 1 ISSUE
  const dummyOrders = [
    {
      id: 'ORD-001',
      status: 'Delivered',
      orderedOn: '2024-11-02',
      price: 149.99,
      items: 3,
      carrier: 'FedEx',
      tracking: 'FX1234567890',
      estDelivery: 'Nov 12',
      timeline: [
        { status: 'Order Placed', date: 'Nov 02, 2024', completed: true },
        { status: 'Processing', date: 'Nov 03, 2024', completed: true },
        { status: 'Shipped', date: 'Nov 11, 2024', completed: true },
        { status: 'Delivered', date: 'Nov 12, 2024', completed: true },
      ],
      address: '123 Main St, New York, NY 10001',
    },
    {
      id: 'ORD-002',
      status: 'In Transit',
      orderedOn: '2024-11-12',
      price: 89.50,
      items: 2,
      carrier: 'UPS',
      tracking: 'UPS987654321',
      estDelivery: 'Nov 16',
      timeline: [
        { status: 'Order Placed', date: 'Nov 12, 2024', completed: true },
        { status: 'Processing', date: 'Nov 13, 202フィル4', completed: true },
        { status: 'Shipped', date: 'Nov 14, 2024', completed: true },
        { status: 'Delivered', date: 'Nov 16, 2024', completed: false },
      ],
      address: '456 Oak Ave, Los Angeles, CA 90001',
    },
    {
      id: 'ORD-003',
      status: 'Pending',
      orderedOn: '2024-11-14',
      price: 250.00,
      items: 5,
      carrier: 'DHL',
      tracking: 'DHL555888444',
      estDelivery: 'Nov 18',
      timeline: [
        { status: 'Order Placed', date: 'Nov 14, 2024', completed: true },
        { status: 'Processing', date: 'Nov 15, 2024', completed: false },
        { status: 'Shipped', date: 'Nov 16, 2024', completed: false },
        { status: 'Delivered', date: 'Nov 18, 2024', completed: false },
      ],
      address: '789 Pine Rd, Chicago, IL 60601',
    },
    // Add more dummy orders if needed
  ];

  useEffect(() => {
    const saved = localStorage.getItem('trackingOrders');
    if (saved && JSON.parse(saved).length > 0) {
      setOrders(JSON.parse(saved));
    } else {
      const allOrders = [
        ...Array(3).fill(dummyOrders[2]).map((o, i) => ({ ...o, id: `ORD-00${i + 4}`, items: Math.floor(Math.random() * 5) + 1 })),
        ...Array(2).fill(dummyOrders[1]).map((o, i) => ({ ...o, id: `ORD-00${i + 7}` })),
        ...Array(12).fill(dummyOrders[0]).map((o, i) => ({ ...o, id: `ORD-0${i + 10}` })),
        ...Array(1).fill({ ...dummyOrders[2], status: 'Issues' }).map((o, i) => ({ ...o, id: 'ORD-099' })),
        ...dummyOrders,
      ];
      setOrders(allOrders);
      localStorage.setItem('trackingOrders', JSON.stringify(allOrders));
    }
  }, []);

  const stats = {
    'Pending Orders': orders.filter(o => o.status === 'Pending').length,
    'In Transit': orders.filter(o => o.status === 'In Transit').length,
    'Delivered': orders.filter(o => o.status === 'Delivered').length,
    'Issues': orders.filter(o => o.status === 'Issues').length,
  };

  const filteredOrders = filter === 'All Orders' ? orders : orders.filter(o => o.status === filter.replace(' Orders', '').replace('In Transit', 'In Transit'));

  const toggleExpand = (id) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <UserLayout activePage="track">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-800">Order Tracking</h1>
          <p className="text-gray-600 mt-1">Monitor your orders and shipments</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {Object.entries(stats).map(([label, count]) => {
            const config = statusConfig[label.replace(' Orders', '')] || statusConfig['Pending'];
            const Icon = config.icon;
            return (
              <div key={label} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{label}</p>
                    <p className="text-2xl font-bold text-gray-800">{count}</p>
                  </div>
                  <div className={`p-3 rounded-full ${config.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {['All Orders', 'Pending Orders', 'In Transit', 'Delivered', 'Issues'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === f
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.map((order) => {
            const config = statusConfig[order.status] || statusConfig['Pending'];
            const isExpanded = expanded[order.id];

            return (
              <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Order Header */}
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-bold text-gray-800">{order.id}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">Ordered on {order.orderedOn}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-800">${order.price.toFixed(2)}</p>
                      <p className="text-sm text-gray-600">{order.items} item{order.items > 1 ? 's' : ''}</p>
                    </div>
                  </div>

                  {/* Carrier Info */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 text-sm">
                    <div>
                      <p className="text-gray-600">Carrier</p>
                      <p className="font-medium">{order.carrier}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Tracking #</p>
                      <p className="font-medium">{order.tracking}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Est. Delivery</p>
                      <p className="font-medium">{order.estDelivery}</p>
                    </div>
                  </div>
                </div>

                {/* Expandable Section */}
                <div className={`${isExpanded ? 'block' : 'hidden'} border-t`}>
                  <div className="p-6 space-y-6">
                    {/* Timeline */}
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-4">Delivery Timeline</h4>
                      <div className="space-y-3">
                        {order.timeline.map((step, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${step.completed ? 'bg-green-500' : 'bg-gray-300'}`}>
                              {step.completed && <CheckCircle className="w-4 h-4 text-white" />}
                            </div>
                            <div className="flex-1">
                              <p className={`font-medium ${step.completed ? 'text-gray-800' : 'text-gray-500'}`}>
                                {step.status}
                              </p>
                              <p className="text-sm text-gray-500">{step.date}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Address */}
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Delivery Address</p>
                      <p className="font-medium text-gray-800">{order.address}</p>
                    </div>
                  </div>
                </div>

                {/* Show More / Less */}
                <button
                  onClick={() => toggleExpand(order.id)}
                  className="w-full py-3 border-t text-sm font-medium text-gray-600 hover:bg-gray-50 flex items-center justify-center gap-1"
                >
                  {isExpanded ? 'Show Less' : 'Show More'}
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </UserLayout>
  );
}