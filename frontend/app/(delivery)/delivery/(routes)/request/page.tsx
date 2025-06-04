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
        donor: { name: 'John Doe', location: 'Donor Clinic, City A' },
        receiver: { name: 'Jane Smith', location: 'Receiver Home, City B' },
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
];

export default function DeliveryOrders() {
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});

    const toggleExpand = (id: string) => {
        setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="min-h-screen px-10 py-10 ">
            <h1 className="text-3xl font-bold text-green-700 flex items-center gap-3 mb-5">
                <FaTruck className="text-green-600" /> Delivery Dashboard
            </h1>
            
            <div className="w-full max-w-lg space-y-6">
                {orders.map((order) => (
                    <Card
                        key={order.id}
                        className="bg-white border border-gray-200 shadow rounded-2xl p-6 relative"
                    >
                        {/* Order Header */}
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
                                <FaBoxOpen className="text-green-600" /> Order #{order.id}
                            </h2>
                            <span className={`px-3 py-1 text-sm rounded-full font-medium flex items-center gap-2 ${order.status === 'Pending Pickup'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-blue-100 text-blue-700'
                                }`}>
                                {order.status === 'Pending Pickup' ? (
                                    <>
                                        <FaHourglassHalf /> Pending Pickup
                                    </>
                                ) : (
                                    <>
                                        <FaShippingFast /> In Transit
                                    </>
                                )}
                            </span>
                        </div>

                        {/* Donor & Receiver */}
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="font-semibold text-gray-800">Donor: {order.donor.name}</p>
                                <p className="text-sm text-gray-600 flex items-center gap-1">
                                    <FaMapMarkerAlt /> {order.donor.location}
                                </p>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-800">Receiver: {order.receiver.name}</p>
                                <p className="text-sm text-gray-600 flex items-center gap-1">
                                    <FaMapMarkerAlt /> {order.receiver.location}
                                </p>
                            </div>
                        </div>

                        {/* Action Button */}
                        <div className="flex justify-between items-center">
                            {order.status === 'Pending Pickup' ? (
                                <Button variant="primary" className="bg-green-600 hover:bg-green-700">
                                    <FaTruck className="w-4 h-4 mr-2" /> Mark as Picked Up
                                </Button>
                            ) : (
                                <Button variant="primary" className="bg-blue-600 hover:bg-blue-700">
                                    <FaCheckCircle className="w-4 h-4 mr-2" /> Mark as Delivered
                                </Button>
                            )}

                            {/* Toggle Medicines */}
                            <p
                                className="text-sm text-green-700 cursor-pointer flex items-center gap-1 hover:underline"
                                onClick={() => toggleExpand(order.id)}
                            >
                                {expanded[order.id] ? <FaChevronUp /> : <FaChevronDown />}
                                {expanded[order.id] ? 'Hide Medicines' : 'View Medicines'}
                            </p>
                        </div>

                        {/* Expanded Medicine Info */}
                        {expanded[order.id] && (
                            <div className="mt-6 space-y-3 border-t pt-4">
                                {order.medicines.map((med, idx) => (
                                    <div
                                        key={idx}
                                        className={`p-3 border rounded bg-gray-50 ${med.type === 'Sell' ? 'border-green-200' : 'border-teal-200'
                                            }`}
                                    >
                                        <p className="font-medium text-gray-800">{med.name}</p>
                                        <p className="text-sm text-gray-600">Quantity: {med.quantity}</p>
                                        <p className="text-sm text-gray-600">Expiry: {new Date(med.expiry).toLocaleDateString()}</p>
                                        {med.type === 'Sell' && (
                                            <p className="text-sm text-green-700 font-semibold">
                                                Price: ${med.price?.toFixed(2)}
                                            </p>
                                        )}
                                        {med.type === 'Donation' && (
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
