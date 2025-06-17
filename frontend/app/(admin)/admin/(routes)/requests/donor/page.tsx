'use client';

import React, { useEffect, useState } from 'react';
import { FaUserSlash, FaCheck, FaTimes } from 'react-icons/fa';
import { fetchOrganizationDonors, verifyDonor } from '@/services/OrganizationRequest';

type Donor = {
    id: string;
    fullName: string;
    email: string;
    organizationType: string;
    documentPath: string;
    isVerified: boolean;
};

export default function DonorRequestPage() {
    const [donors, setDonors] = useState<Donor[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [selectedDonor, setSelectedDonor] = useState<Donor | null>(null);
    const [actionType, setActionType] = useState<'accept' | 'reject' | null>(null);
    const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);

    const ITEMS_PER_PAGE = 5;

    useEffect(() => {
        const getDonors = async () => {
            try {
                setLoading(true);
                const data = await fetchOrganizationDonors();
                setDonors(data);
            } catch (err: any) {
                setError(err.message || 'Failed to load donors');
            } finally {
                setLoading(false);
            }
        };

        getDonors();
    }, []);

    const handleVerify = async () => {
        if (!selectedDonor || !actionType) return;
        const isVerified = actionType === 'accept';

        try {
            await verifyDonor(selectedDonor.id, isVerified);

            setDonors((prev) =>
                isVerified
                    ? prev.map((donor) =>
                        donor.id === selectedDonor.id ? { ...donor, isVerified: true } : donor
                    )
                    : prev.filter((donor) => donor.id !== selectedDonor.id)
            );

            setShowModal(false);
            setSelectedDonor(null);
            setActionType(null);
        } catch (err: any) {
            alert(err.message || 'Verification failed');
        }
    };

    const openModal = (
        donor: Donor,
        type: 'accept' | 'reject' | 'preview'
    ) => {
        setSelectedDonor(donor);
        if (type === 'preview') {
            const imageUrl = `http://localhost:5134/${donor.documentPath.replace(/\\/g, '/')}`;
            setPreviewImageUrl(imageUrl);
            setActionType(null);
        } else {
            setPreviewImageUrl(null);
            setActionType(type);
        }
        setShowModal(true);
    };

    const paginatedDonors = donors.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const totalPages = Math.ceil(donors.length / ITEMS_PER_PAGE);

    return (
        <div className="w-full max-w-6xl mx-auto px-2 sm:px-4 py-6">
            {loading ? (
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-28 w-28 border-b-4 border-green-600"></div>
                </div>
            ) : error ? (
                <p className="text-red-600">{error}</p>
            ) : donors.length === 0 ? (
                <div className="flex flex-col items-center justify-center mt-16 text-gray-500">
                    <FaUserSlash className="text-6xl mb-4 text-gray-400" />
                    <p className="text-lg font-medium">No donor requests found</p>
                    <p className="text-sm text-gray-400">Please check back later.</p>
                </div>
            ) : (
                <>
                    <h1 className="text-3xl font-bold text-green-700 mb-4">Donor Requests</h1>
                    <p className="text-gray-600 mb-6">Review and manage organization donor requests here.</p>

                    <div className="overflow-x-auto w-full bg-white shadow-md rounded-lg border border-gray-200">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-green-600 text-white">
                                <tr>
                                    <th className="px-6 py-3 text-left text-sm font-medium">Name</th>
                                    <th className="px-6 py-3 text-left text-sm font-medium">Email</th>
                                    <th className="px-6 py-3 text-left text-sm font-medium">Organization</th>
                                    <th className="px-6 py-3 text-left text-sm font-medium">Document</th>
                                    <th className="px-6 py-3 text-left text-sm font-medium">Verified</th>
                                    <th className="px-6 py-3 text-left text-sm font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {paginatedDonors.map((donor) => (
                                    <tr key={donor.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">{donor.fullName}</td>
                                        <td className="px-6 py-4">{donor.email}</td>
                                        <td className="px-6 py-4">{donor.organizationType}</td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => openModal(donor, 'preview')}
                                                className="text-green-600 hover:underline"
                                            >
                                                View
                                            </button>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${donor.isVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                {donor.isVerified ? 'Verified' : 'Pending'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 space-x-3">
                                            <button onClick={() => openModal(donor, 'accept')} title="Accept" className="text-green-600 hover:text-green-800">
                                                <FaCheck />
                                            </button>
                                            <button onClick={() => openModal(donor, 'reject')} title="Reject" className="text-red-600 hover:text-red-800">
                                                <FaTimes />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {totalPages > 1 && (
                        <div className="flex justify-end mt-4 space-x-2">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`px-4 py-1 border rounded ${page === currentPage
                                        ? 'bg-green-600 text-white border-green-600'
                                        : 'bg-white text-gray-600 border-gray-300 hover:bg-green-100'
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>
                    )}
                </>
            )}

            {/* Modal */}
            {showModal && selectedDonor && (
                <div className="fixed inset-0 flex items-center justify-center bg-opacity-30 z-50 backdrop-blur-sm">
                    <div className="rounded-lg py-2 px-4 w-full max-w-md border-2 border-gray-500 bg-white">
                        {previewImageUrl ? (
                            <>
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-lg font-semibold text-gray-800">Document Preview</h2>
                                    <FaTimes onClick={() => setShowModal(false)} className="cursor-pointer text-gray-700" />
                                </div>
                                <img src={previewImageUrl} alt="Document" className="w-full h-auto rounded" />
                            </>
                        ) : (
                            <>
                                <h2 className="text-lg font-semibold text-gray-800">
                                    Are you sure you want to {actionType === 'accept' ? 'accept' : 'reject'}{' '}
                                    <span className="font-bold">{selectedDonor.fullName}</span> as a donor?
                                </h2>
                                <div className="flex justify-end space-x-3 mt-6">
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-gray-700"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleVerify}
                                        className={`px-4 py-2 rounded text-white ${actionType === 'accept'
                                            ? 'bg-green-600 hover:bg-green-700'
                                            : 'bg-red-600 hover:bg-red-700'}`}
                                    >
                                        Confirm
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
