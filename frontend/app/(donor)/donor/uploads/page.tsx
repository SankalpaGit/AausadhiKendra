'use client'

import { useState } from "react";
import { FiDownload } from "react-icons/fi";
import { MdDateRange } from "react-icons/md";
import { IoCloudUploadOutline } from "react-icons/io5";
import Navbar from "@/components/Navbar";

export default function Page() {
    const [file, setFile] = useState<File | null>(null);

    return (
        <>
            <Navbar />
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 p-6 min-h-screen">
                {/* Single Medicine Upload */}
                <div className="bg-white shadow-md rounded-xl border border-gray-200 p-6 h-fit space-y-6">
                    <div>
                        <h2 className="text-xl font-bold text-green-700">Single Medicine Upload</h2>
                        <p className="text-sm text-gray-500">Add a single medicine to your inventory</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input className="p-2 border rounded-lg focus:ring-2 focus:ring-green-500" type="text" placeholder="Enter medicine name" />
                        <input className="p-2 border rounded-lg focus:ring-2 focus:ring-green-500" type="number" placeholder="Enter quantity" />

                        <div className="flex items-center border rounded-lg p-2">
                            <MdDateRange className="text-green-500 mr-2" />
                            <input className="w-full outline-none" type="date" />
                        </div>

                        <select className="p-2 border rounded-lg focus:ring-2 focus:ring-green-500">
                            <option>Donation</option>
                            <option>Sale</option>
                        </select>
                    </div>

                    <textarea
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                        placeholder="Enter medicine description"
                        rows={4}
                    ></textarea>

                    <button className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition">
                        Add Medicine
                    </button>
                </div>

                {/* Bulk Upload */}
                <div className="bg-white shadow-md rounded-xl p-6 h-fit border border-gray-200 space-y-6">
                    <div>
                        <h2 className="text-xl font-bold text-green-700">Bulk Upload</h2>
                        <p className="text-sm text-gray-500">Upload multiple medicines at once using CSV</p>
                    </div>

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
                        <label
                            htmlFor="csv-upload"
                            className="mt-2 cursor-pointer bg-green-100 px-4 py-2 rounded-lg border border-green-300 hover:bg-green-200 transition"
                        >
                            Select CSV File
                        </label>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                        <FiDownload className="text-green-600 text-lg" />
                        <button className="text-green-700 font-medium hover:underline">Download Template</button>
                    </div>

                    <p className="text-sm text-gray-600">
                        The CSV file should contain the following columns: Medicine Name, Quantity, Expiry Date, Type (Donation/Sale), Description
                    </p>

                    <button className="bg-green-300 text-white py-2 rounded-lg w-full font-medium cursor-not-allowed">
                        Upload Medicines
                    </button>
                </div>
            </div>
        </>
    );
}
