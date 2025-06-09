'use client';

import { useState } from 'react';
import {
  FaBox,
  FaCalendarAlt,
  FaPills,
  FaCheckCircle,
  FaHourglassHalf,
} from 'react-icons/fa';

type OrderStatus = 'All' | 'Pending' | 'Complete';

const orders = [
  {
    id: 'ORD101',
    expiry: '2025-07-01',
    status: 'Pending',
    item: 'Paracetamol 500mg',
    quantity: 10,
  },
  {
    id: 'ORD102',
    expiry: '2025-08-01',
    status: 'Complete',
    item: 'Amoxicillin 250mg',
    quantity: 5,
  },
  {
    id: 'ORD103',
    expiry: '2025-06-20',
    status: 'Pending',
    item: 'Ibuprofen 200mg',
    quantity: 6,
  },
];

// Helper to check if expiry date is within 30 days
const isExpiringSoon = (expiryDate: string) => {
  const now = Date.now();
  const expiry = new Date(expiryDate).getTime();
  const thirtyDaysMs = 1000 * 60 * 60 * 24 * 30;
  return expiry - now < thirtyDaysMs;
};

export default function Page() {
  const [filter, setFilter] = useState<OrderStatus>('All');

  const filteredOrders =
    filter === 'All' ? orders : orders.filter((o) => o.status === filter);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 md:px-10">
      <h1 className="text-2xl md:text-3xl font-bold text-green-700 mb-6">My Orders</h1>

      {/* Filter Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-200">
        {(['All', 'Pending', 'Complete'] as OrderStatus[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`pb-2 px-3 text-sm font-medium ${
              filter === tab
                ? 'border-b-2 border-green-600 text-green-700'
                : 'text-gray-500 hover:text-green-600'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex flex-col gap-3 relative"
          >
            {/* Header: Order ID + Status */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-gray-800 font-semibold">
                <FaBox className="text-green-600" />
                #{order.id}
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 select-none ${
                  order.status === 'Pending'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-green-100 text-green-700'
                }`}
              >
                {order.status === 'Pending' ? <FaHourglassHalf /> : <FaCheckCircle />}
                {order.status}
              </span>
            </div>

            {/* Medicine Info */}
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <FaPills className="text-gray-500" />
              <span className="font-medium">{order.item}</span>
              • Qty: {order.quantity}
            </div>

            {/* Expiry */}
            <div
              className={`text-sm font-semibold ${
                isExpiringSoon(order.expiry)
                  ? 'text-red-600'
                  : 'text-gray-700'
              } flex items-center gap-2`}
            >
              <FaCalendarAlt className="text-gray-400" />
              Expiry: {new Date(order.expiry).toLocaleDateString()}
              {isExpiringSoon(order.expiry) && (
                <span className="ml-2 bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-xs font-semibold select-none">
                  Expiring Soon
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center text-gray-500 mt-10 text-sm">No orders found.</div>
      )}
    </div>
  );
}
