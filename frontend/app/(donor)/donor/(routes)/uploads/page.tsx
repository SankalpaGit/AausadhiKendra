'use client'

import { useState } from "react";
import { FiDownload } from "react-icons/fi";
import { IoCloudUploadOutline } from "react-icons/io5";
import axios from "axios";
import Papa from 'papaparse';

export default function UploadPage() {
    // State for single medicine form
    const [singleMedicine, setSingleMedicine] = useState({
        name: "",
        quantity: 0,
        expiryDate: "",
        unitPrice: 0,
    });
    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    // API base URL from .env
    const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5134/api";

    // Handle input changes for single medicine form
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSingleMedicine((prev) => ({
            ...prev,
            [name]: name === "quantity" || name === "unitPrice" ? parseFloat(value) : value,
        }));
    };

    // Handle single medicine submission
    const handleSingleMedicineSubmit = async () => {
        setIsLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await axios.post(
                `${API_URL}/medicine/add`,
                {
                    Name: singleMedicine.name,
                    Quantity: singleMedicine.quantity,
                    ExpiryDate: singleMedicine.expiryDate,
                    UnitPrice: singleMedicine.unitPrice,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`, // Adjust based on your auth setup
                    },
                }
            );

            setSuccess(response.data.message);
            setSingleMedicine({ name: "", quantity: 0, expiryDate: "", unitPrice: 0 }); // Reset form
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to add medicine");
        } finally {
            setIsLoading(false);
        }
    };

    // Handle CSV parsing and bulk upload
    const handleBulkUpload = async () => {
        if (!file) return;

        setIsLoading(true);
        setError(null);
        setSuccess(null);

        Papa.parse(file, {
            complete: async (result) => {
                try {
                    const medicines = result.data
                        .slice(1) // Skip header row
                        .filter((row: any) => row[0]) // Filter out empty rows
                        .map((row: any) => ({
                            Name: row[0],
                            Quantity: parseInt(row[1], 10),
                            ExpiryDate: row[2],
                            UnitPrice: parseFloat(row[3]),
                        }));

                    const response = await axios.post(
                        `${API_URL}/medicine/add-bulk`,
                        { Medicines: medicines },
                        {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem("token")}`, // Adjust based on your auth setup
                            },
                        }
                    );

                    setSuccess(response.data.message);
                    setFile(null); // Reset file input
                } catch (err: any) {
                    setError(err.response?.data?.message || "Failed to upload medicines");
                } finally {
                    setIsLoading(false);
                }
            },
            header: false,
            skipEmptyLines: true,
        });
    };

    // Handle template download
    const handleDownloadTemplate = () => {
        const headers = ["Medicine Name", "Quantity", "Expiry Date", "Unit Price"];
        const csvContent = headers.join(",") + "\n";

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "medicine_template.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 p-6 min-h-screen">
            {/* Single Medicine Upload Section */}
            <div className="bg-white shadow-md rounded-xl border border-gray-200 p-6 h-fit space-y-6">
                <div>
                    <h2 className="text-xl font-bold text-green-700">Single Medicine Upload</h2>
                    <p className="text-sm text-gray-500">Add a single medicine to your inventory</p>
                </div>

                {/* Display Error or Success */}
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {success && <p className="text-green-500 text-sm">{success}</p>}

                {/* Medicine Name Input */}
                <div className="flex w-full items-center rounded-lg">
                    <input
                        className="p-2 w-full border rounded-lg focus:ring-2 focus:ring-green-500"
                        type="text"
                        name="name"
                        value={singleMedicine.name}
                        onChange={handleInputChange}
                        placeholder="Enter medicine name"
                    />
                </div>

                {/* Quantity and Expiry Date Inputs */}
                <div className="flex justify-between gap-2 w-full items-center">
                    <input
                        className="p-2 w-1/2 border rounded-lg focus:ring-2 focus:ring-green-500"
                        type="number"
                        name="quantity"
                        value={singleMedicine.quantity || ""}
                        onChange={handleInputChange}
                        placeholder="Enter quantity"
                    />
                    <input
                        className="w-1/2 p-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                        type="date"
                        name="expiryDate"
                        value={singleMedicine.expiryDate}
                        onChange={handleInputChange}
                    />
                </div>

                {/* Unit Price Input */}
                <div className="flex w-full items-center rounded-lg">
                    <input
                        className="p-2 w-full border rounded-lg focus:ring-2 focus:ring-green-500"
                        type="number"
                        name="unitPrice"
                        value={singleMedicine.unitPrice || ""}
                        onChange={handleInputChange}
                        placeholder="Enter unit price"
                        step="0.01"
                    />
                </div>

                <button
                    className={`w-full py-2 rounded-lg font-medium transition ${isLoading
                        ? "bg-green-300 text-white cursor-not-allowed"
                        : "bg-green-600 text-white hover:bg-green-700"
                        }`}
                    onClick={handleSingleMedicineSubmit}
                    disabled={isLoading}
                >
                    {isLoading ? "Adding..." : "Add Medicine"}
                </button>
            </div>

            {/* Bulk Upload Section */}
            <div className="bg-white shadow-md rounded-xl p-6 h-fit border border-gray-200 space-y-6">
                <div>
                    <h2 className="text-xl font-bold text-green-700">Bulk Upload</h2>
                    <p className="text-sm text-gray-500">Upload multiple medicines at once using CSV</p>
                </div>

                {/* Display Error or Success */}
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {success && <p className="text-green-500 text-sm">{success}</p>}

                {/* CSV Upload Box */}
                <div className="border-dashed border-2 border-green-400 bg-green-50 rounded-xl flex flex-col items-center justify-center p-8 text-center text-gray-600 space-y-2">
                    <IoCloudUploadOutline className="text-3xl text-green-500" />
                    <p className="font-medium">Drag and drop your CSV file</p>
                    <p className="text-sm text-gray-500">Or click to browse files</p>
                    <input
                        type="file"
                        accept=".csv"
                        className="hidden"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                        id="csv-upload"
                    />
                    {file && (
                        <p className="text-sm text-green-700 text-center">
                            Selected File: <strong>{file.name}</strong>
                        </p>
                    )}

                    <label
                        htmlFor="csv-upload"
                        className="mt-2 cursor-pointer bg-green-100 px-4 py-2 rounded-lg border border-green-300 hover:bg-green-200 transition"
                    >
                        Select CSV File
                    </label>
                </div>

                {/* Download Template Button */}
                <div className="flex items-center gap-2 text-sm">
                    <FiDownload className="text-green-600 text-lg" />
                    <button
                        className="text-green-700 font-medium hover:underline"
                        onClick={handleDownloadTemplate}
                    >
                        Download Template
                    </button>
                </div>

                {/* CSV Format Information */}
                <p className="text-sm text-gray-600">
                    The CSV file should contain the following columns: Medicine Name, Quantity, Expiry Date, Unit Price
                </p>

                {/* Upload Button */}
                <button
                    className={`py-2 rounded-lg w-full font-medium transition ${file && !isLoading
                        ? "bg-green-600 text-white hover:bg-green-700 cursor-pointer"
                        : "bg-green-300 text-white cursor-not-allowed"
                        }`}
                    disabled={!file || isLoading}
                    onClick={handleBulkUpload}
                >
                    {isLoading ? "Uploading..." : "Upload Medicines"}
                </button>
            </div>
        </div>
    );
}