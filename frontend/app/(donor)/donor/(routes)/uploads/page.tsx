'use client'

import { useState } from "react";
import { FiDownload } from "react-icons/fi";
import { IoCloudUploadOutline } from "react-icons/io5";

export default function UploadPage() {
    const [file, setFile] = useState<File | null>(null);

    // 🔽 Function to handle template download for bulk upload
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
        <>
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 p-6 min-h-screen">
                {/* 🚑 Single Medicine Upload Section */}
                <div className="bg-white shadow-md rounded-xl border border-gray-200 p-6 h-fit space-y-6">
                    <div>
                        <h2 className="text-xl font-bold text-green-700">Single Medicine Upload</h2>
                        <p className="text-sm text-gray-500">Add a single medicine to your inventory</p>
                    </div>

                    {/* Medicine Name Input */}
                    <div className="flex w-full items-center rounded-lg">
                        <input
                            className="p-2 w-full border rounded-lg focus:ring-2 focus:ring-green-500"
                            type="text"
                            placeholder="Enter medicine name"
                        />
                    </div>

                    {/* Quantity and Expiry Date Inputs */}
                    <div className="flex justify-between gap-2 w-full items-center">
                        <input
                            className="p-2 w-1/2 border rounded-lg focus:ring-2 focus:ring-green-500"
                            type="number"
                            placeholder="Enter quantity"
                        />
                        <input
                            className="w-1/2 p-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                            type="date"
                        />
                    </div>

                    {/* 🔁 Unit Price Input (replacing description) */}
                    <div className="flex w-full items-center rounded-lg">
                        <input
                            className="p-2 w-full border rounded-lg focus:ring-2 focus:ring-green-500"
                            type="number"
                            placeholder="Enter unit price"
                            step="0.01"
                        />
                    </div>

                    <button className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition">
                        Add Medicine
                    </button>
                </div>

                {/* 📦 Bulk Upload Section */}
                <div className="bg-white shadow-md rounded-xl p-6 h-fit border border-gray-200 space-y-6">
                    <div>
                        <h2 className="text-xl font-bold text-green-700">Bulk Upload</h2>
                        <p className="text-sm text-gray-500">Upload multiple medicines at once using CSV</p>
                    </div>

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
                        className={`py-2 rounded-lg w-full font-medium transition ${file
                                ? "bg-green-600 text-white hover:bg-green-700 cursor-pointer"
                                : "bg-green-300 text-white cursor-not-allowed"
                            }`}
                        disabled={!file}
                        onClick={() => {
                            if (!file) return;
                            // 🚀 Handle actual upload logic here
                            console.log("Uploading file:", file.name);
                        }}
                    >
                        Upload Medicines
                    </button>
                </div>
            </div>
        </>
    );
}
