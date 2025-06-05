'use client';
import {
    FaTruck,
    FaBoxOpen,
    FaCheckCircle,
    FaMapMarkedAlt,
    FaClipboardList,
    FaMapMarkerAlt
} from "react-icons/fa";

export default function DeliveryPartnerHome() {
    return (
        <>
            <div className="px-10 py-6">
                <h1 className="text-3xl font-bold text-green-700">Welcome, Delivery Partner</h1>
            </div>

            <div className="min-h-screen bg-white   flex flex-col gap-8 px-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
                    {/* Today's Deliveries */}
                    <div className="bg-gray-50 shadow-sm rounded-xl p-6 flex flex-col items-center text-center border hover:shadow-md transition">
                        <FaTruck className="text-3xl text-green-600 mb-2" />
                        <p className="text-lg font-semibold text-gray-700">Today's Deliveries</p>
                        <p className="text-2xl font-bold text-green-600">4</p>
                    </div>

                    {/* Pending Pickups */}
                    <div className="bg-gray-50 shadow-sm rounded-xl p-6 flex flex-col items-center text-center border hover:shadow-md transition">
                        <FaBoxOpen className="text-3xl text-yellow-500 mb-2" />
                        <p className="text-lg font-semibold text-gray-700">Pending Pickups</p>
                        <p className="text-2xl font-bold text-yellow-500">2</p>
                    </div>

                    {/* Completed Deliveries */}
                    <div className="bg-gray-50 shadow-sm rounded-xl p-6 flex flex-col items-center text-center border hover:shadow-md transition">
                        <FaCheckCircle className="text-3xl text-green-800 mb-2" />
                        <p className="text-lg font-semibold text-gray-700">Completed Deliveries</p>
                        <p className="text-2xl font-bold text-green-800">12</p>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="flex flex-col md:flex-row gap-4 ">
                    <a
                        href="/delivery/request"
                        className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-xl transition"
                    >
                        <FaClipboardList />
                        View Delivery Requests
                    </a>
                    <a
                        href="/delivery/map"
                        className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-6 rounded-xl transition"
                    >
                        <FaMapMarkedAlt />
                        Track Assigned Routes
                    </a>
                </div>

                {/* Highlight Component */}
                <div className="w-full max-w-4xl bg-green-50 border border-green-200 rounded-xl px-6 py-4 flex items-center gap-4">
                    <FaMapMarkerAlt className="text-3xl text-green-600" />
                    <div className="text-green-800">
                        <p className="font-semibold">Next Stop:</p>
                        <p className="text-sm">Narayani Medical Center, Sector 12 – ETA: 10 mins</p>
                    </div>
                </div>
                {/* Optional Motivation / Tip */}
                <div className="max-w-xl text-center bg-green-50 p-4 rounded-xl border border-green-200 text-green-700">
                    <p className="text-sm italic">
                        “Your service helps communities get essential medicines on time. Stay safe and thank you for your dedication.”
                    </p>
                </div>
            </div>
        </>
    );
}
