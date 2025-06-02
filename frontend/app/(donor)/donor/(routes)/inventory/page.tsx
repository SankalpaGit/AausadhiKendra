'use client';

import Navbar from '@/components/Navbar';
import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

type Medicine = {
    id: number;
    name: string;
    unitPrice: number;
    quantity: number;
    expiryDate: string;
    label: 'Sale' | 'Donation';
};

export default function Page() {
    const [medicines, setMedicines] = useState<Medicine[]>([
        {
            id: 1,
            name: 'Paracetamol',
            unitPrice: 5.0,
            quantity: 100,
            expiryDate: '2025-12-31',
            label: 'Donation',
        },
        {
            id: 2,
            name: 'Aspirin',
            unitPrice: 10.0,
            quantity: 100,
            expiryDate: '2025-12-31',
            label: 'Sale',
        },
    ]);


    const handleDelete = (id: number) => {
        setMedicines(medicines.filter((med) => med.id !== id));
    };

    return (
        <>
  
            <div className="p-8 max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-700">Medicine Inventory</h1>
                </div>

                <div className="overflow-x-auto rounded-lg border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200 bg-white">
                        <thead className="bg-green-100 text-sm font-semibold text-gray-700 uppercase">
                            <tr>
                                <th className="px-6 py-3 text-left">Medicine Name</th>
                                <th className="px-6 py-3 text-left">Unit Price</th>
                                <th className="px-6 py-3 text-left">Quantity</th>
                                <th className="px-6 py-3 text-left">Expiry Date</th>
                                <th className="px-6 py-3 text-left">Label</th>
                                <th className="px-6 py-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-sm">
                            {medicines.map((med) => (
                                <tr key={med.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4">{med.name}</td>
                                    <td className="px-6 py-4">₹{med.unitPrice.toFixed(2)}</td>
                                    <td className="px-6 py-4">{med.quantity}</td>
                                    <td className="px-6 py-4">{med.expiryDate}</td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-medium ${med.label === 'Sale'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-yellow-100 text-yellow-800'
                                                }`}
                                        >
                                            {med.label}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <button
                                                className="text-blue-600 hover:text-blue-800"
                                                title="Edit"
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(med.id)}
                                                className="text-red-600 hover:text-red-800"
                                                title="Delete"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
