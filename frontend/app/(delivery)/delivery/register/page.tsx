'use client';
import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import Navbar from '@/components/Navbar';

const vehicleOptions = ["Bike", "Scooter"];

export default function DeliveryPartnerRegister() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState("");
    const optionsRef = useRef<HTMLLIElement[]>([]);

    useEffect(() => {
        if (dropdownOpen) {
            gsap.fromTo(
                optionsRef.current,
                { opacity: 0, y: -10 },
                {
                    opacity: 1,
                    y: 0,
                    stagger: 0.05,
                    duration: 0.3,
                    ease: 'power2.out',
                }
            );
        }
    }, [dropdownOpen]);

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-white flex flex-col md:flex-row items-center justify-center px-4 py-10">
                {/* Left: Illustration */}
                <div className="hidden md:flex md:w-1/2 justify-center">
                    <img
                        src="/image.png"
                        alt="Delivery Partner"
                        className="w-[500px] max-w-full h-auto object-contain"
                    />
                </div>

                {/* Right: Form */}
                <div className="w-full md:w-1/2 max-w-4xl bg-white p-10 rounded-2xl shadow-lg border border-gray-200">
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { label: "Full Name", type: "text" },
                            { label: "Email", type: "email" },
                            { label: "Phone Number", type: "tel" },
                            { label: "Address", type: "text" },
                            { label: "Vehicle Number", type: "text" },
                            { label: "Driving License Number", type: "text" },
                            { label: "Password", type: "password" },
                        ].map((field, i) => (
                            <div key={i}>
                                <label className="block text-sm font-medium text-gray-800 mb-1">
                                    {field.label}
                                </label>
                                <input
                                    type={field.type}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition"
                                />
                            </div>
                        ))}

                        {/* Vehicle Type Dropdown with GSAP */}
                        <div className="relative col-span-1">
                            <label className="block text-sm font-medium text-gray-800 mb-1">Vehicle Type</label>
                            <div
                                onClick={() => setDropdownOpen(prev => !prev)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg cursor-pointer bg-white relative"
                            >
                                {selectedVehicle || "Select Vehicle Type"}
                            </div>
                            {dropdownOpen && (
                                <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow">
                                    {vehicleOptions.map((option, i) => (
                                        <li
                                            key={option}
                                            ref={el => { optionsRef.current[i] = el!; }}
                                            onClick={() => {
                                                setSelectedVehicle(option);
                                                setDropdownOpen(false);
                                            }}
                                            className="px-4 py-2 hover:bg-green-100 cursor-pointer transition"
                                        >
                                            {option}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Empty for grid symmetry */}
                        <div></div>

                        <div className="md:col-span-2">
                            <button
                                type="submit"
                                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                            >
                                Register Now
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
