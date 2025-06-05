'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
    FaBoxOpen, FaTruck, FaCheckCircle, FaHourglassHalf,
    FaShippingFast, FaMapMarkerAlt, FaChevronDown, FaChevronUp
} from 'react-icons/fa';

const orders = [
    {
        id: 'ORD123',
        donor: { name: 'John Doe', location: 'Ramdhuni 04 Manpur, Sunsari' },
        receiver: { name: 'Jane Smith', location: 'Biratnagar 08 sindhu, Sunsari' },
        status: 'Pending Pickup',
        medicines: [
            {
                name: 'Paracetamol',
                quantity: 10,
                type: 'Donation',
                expiry: '2025-09-10',
            },
            {
                name: 'Amoxicillin',
                quantity: 5,
                type: 'Sell',
                price: 25.0,
                expiry: '2025-10-05',
            },
        ],
    },
    {
        id: 'ORD124',
        donor: { name: 'Alice Ray', location: 'Itahari 05, Sunsari' },
        receiver: { name: 'Bob Kumar', location: 'Dharan 10, Sunsari' },
        status: 'In Transit',
        medicines: [
            {
                name: 'Ibuprofen',
                quantity: 6,
                type: 'Donation',
                expiry: '2025-11-15',
            },
        ],
    },
];

export default function DeliveryOrders() {
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});

    const toggleExpand = (id: string) => {
        setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="min-h-screen px-4 md:px-10 py-8">
            <h1 className="text-2xl md:text-3xl font-bold text-green-700 flex items-center gap-3 mb-6">
                <FaTruck className="text-green-600 text-xl" /> Delivery Dashboard
            </h1>

            <div className="flex flex-wrap gap-6 items-start">
                {orders.map((order) => (
                    <Card
                        key={order.id}
                        className="bg-white border border-gray-200 shadow rounded-2xl p-6 w-full md:w-[48%]"
                    >
                        {/* Order Header */}
                        <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
                            <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
                                <FaBoxOpen className="text-green-600" /> Order #{order.id}
                            </h2>
                            <span className={`px-3 py-1 text-sm rounded-full font-medium flex items-center gap-2 ${order.status === 'Pending Pickup'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-blue-100 text-blue-700'
                                }`}>
                                {order.status === 'Pending Pickup' ? (
                                    <>
                                        <FaHourglassHalf /> Pending
                                    </>
                                ) : (
                                    <>
                                        <FaShippingFast /> Transit
                                    </>
                                )}
                            </span>
                        </div>

                        {/* Donor & Receiver Info */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                            <div>
                                <p className="font-semibold text-gray-800">Donor: {order.donor.name}</p>
                                <p className="text-sm text-gray-600 flex items-center gap-1">
                                    <FaMapMarkerAlt className="text-gray-500" /> {order.donor.location}
                                </p>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-800">Receiver: {order.receiver.name}</p>
                                <p className="text-sm text-gray-600 flex items-center gap-1">
                                    <FaMapMarkerAlt className="text-gray-500" /> {order.receiver.location}
                                </p>
                            </div>
                        </div>

                        {/* Buttons & Expand */}
                        <div className="flex justify-between items-center flex-wrap gap-2">
                            <Button
                                variant="primary"
                                className={`${order.status === 'Pending Pickup'
                                    ? 'bg-green-600 hover:bg-green-700'
                                    : 'bg-blue-600 hover:bg-blue-700'
                                    }`}
                            >
                                {order.status === 'Pending Pickup' ? (
                                    <>
                                        <FaTruck className="w-4 h-4 mr-2" /> Mark as Picked Up
                                    </>
                                ) : (
                                    <>
                                        <FaCheckCircle className="w-4 h-4 mr-2" /> Mark as Delivered
                                    </>
                                )}
                            </Button>

                            <p
                                className="text-sm text-green-700 cursor-pointer flex items-center gap-1 hover:underline"
                                onClick={() => toggleExpand(order.id)}
                            >
                                {expanded[order.id] ? <FaChevronUp /> : <FaChevronDown />}
                                {expanded[order.id] ? 'Hide Medicines' : 'View Medicines'}
                            </p>
                        </div>

                        {/* Medicines Info */}
                        {expanded[order.id] && (
                            <div className="mt-6 space-y-3 border-t-2 pt-4 border-gray-300 ">
                                {order.medicines.map((med, idx) => (
                                    <div
                                        key={idx}
                                        className={`p-3 border border-gray-300 rounded-lg `}
                                    >
                                        <p className="font-medium text-gray-800">{med.name}</p>
                                        <p className="text-sm text-gray-600">Quantity: {med.quantity}</p>
                                        <p className="text-sm text-gray-600">Expiry: {new Date(med.expiry).toLocaleDateString()}</p>
                                        {med.type === 'Sell' ? (
                                            <p className="text-sm text-green-700 font-semibold">
                                                Price: ${med.price?.toFixed(2)}
                                            </p>
                                        ) : (
                                            <p className="text-sm text-teal-700 font-semibold">Donated</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </Card>
                ))}
            </div>
        </div>
    );
}
