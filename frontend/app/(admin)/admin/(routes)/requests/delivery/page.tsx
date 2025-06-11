'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTruck } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import { FaRotate } from 'react-icons/fa6';

interface DeliveryPartner {
    id: string; // <-- Ensure the backend provides this
    firstName: string;
    lastName: string;
    email: string;
    licenseNumber: string;
    phoneNumber: string;
}

const DeliveryRequestsPage = () => {
    const [partners, setPartners] = useState<DeliveryPartner[]>([]);
    const [visiblePartners, setVisiblePartners] = useState<DeliveryPartner[]>([]);
    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const { ref, inView } = useInView();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setLoading(false);
                    return;
                }

                const response = await axios.get<DeliveryPartner[]>(
                    'http://localhost:5134/api/admin-review/delivery-partners',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                await new Promise((res) => setTimeout(res, 2000)); // Simulated delay

                const data = response.data;
                setPartners(data);
                setVisiblePartners(data.slice(0, 10));
                setHasMore(data.length > 10);
            } catch (error) {
                setMessage('Failed to load delivery partners. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (inView && hasMore && !loading) {
            const nextBatch = partners.slice(visiblePartners.length, visiblePartners.length + 10);
            setVisiblePartners((prev) => [...prev, ...nextBatch]);
            if (visiblePartners.length + nextBatch.length >= partners.length) {
                setHasMore(false);
            }
        }
    }, [inView, hasMore, loading, partners, visiblePartners]);

    const handleAction = async (id: string, action: 'approve' | 'reject') => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found.');
                return;
            }

            const url = `http://localhost:5134/api/delivery-partner/${action}/${id}`;
            await axios.put(
                url,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Remove from both lists after action
            setPartners((prev) => prev.filter((p) => p.id !== id));
            setVisiblePartners((prev) => prev.filter((p) => p.id !== id));

            setMessage(`Delivery Partner ${action === 'approve' ? 'approved' : 'rejected'} successfully.`);
            setTimeout(() => setMessage(null), 3000); // Hide message after 3 seconds
        } catch (err) {
            setMessage(`Failed to ${action} delivery partner. Please try again.`);
            setTimeout(() => setMessage(null), 3000);
        }
    };

    return (
        <div className="flex flex-col items-center justify-start min-h-screen p-7">
            {message && (
                <div className="w-full text-center bg-blue-100 text-blue-700 py-2 px-4 rounded mb-4">
                    {message}
                </div>
            )}

            {loading ? (
                <>
                    <FaRotate className="animate-spin text-4xl text-gray-400 mb-4" />
                    <p className="text-gray-500 text-center">Loading delivery partners...</p>
                </>
            ) : visiblePartners.length === 0 ? (
                <div className="flex flex-col items-center text-gray-600 mt-12">
                    <FaTruck className="mb-4 text-8xl text-red-600" />
                    <p>No delivery partners registered yet.</p>
                </div>
            ) : (
                <div className="w-full space-y-4 p-3">
                    <h1 className="text-2xl font-semibold mb-4">Delivery Partner Requests</h1>
                    {visiblePartners.map((partner) => (
                        <div
                            key={partner.id}
                            className="bg-white p-4 shadow rounded flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                        >
                            <div>
                                <p className="font-semibold">
                                    {partner.firstName} {partner.lastName}
                                </p>
                                <p className="text-sm text-gray-600">{partner.email}</p>
                                <p className="text-sm text-gray-600">Phone: {partner.phoneNumber}</p>
                                <p className="text-sm text-gray-600">License: {partner.licenseNumber}</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleAction(partner.id, 'approve')}
                                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded"
                                >
                                    Approve
                                </button>
                                <button
                                    onClick={() => handleAction(partner.id, 'reject')}
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    ))}
                    {hasMore && (
                        <div ref={ref} className="text-center text-sm text-gray-500 py-4">
                            Loading more...
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default DeliveryRequestsPage;
