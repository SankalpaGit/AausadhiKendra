"use client";
import { useRouter, usePathname } from 'next/navigation';
import { useState } from "react";
import {
    FaBars,
    FaTimes,
    FaUser,
    FaBell,
    FaSignOutAlt,
    FaUserCircle,
    FaClipboardList,
    FaMap,
    FaMoneyBill
} from "react-icons/fa";
import Dropdown from "@/components/ui/Dropdown";

export default function PartnerNavbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const navLinks = [
        { name: "Order", href: "/delivery/request", icon: <FaClipboardList /> },
        { name: "Earning", href: "/delivery/withdraw", icon: <FaMoneyBill /> },
        { name: "Maps", href: "/delivery/map", icon: <FaMap /> },
        { name: "Profile", href: "/profile", icon: <FaUser className="text-green-600" /> },
        { name: "Logout", href: "/logout", icon: <FaSignOutAlt className="text-red-500" />, isLogout: true },
    ];

    const isActive = (href: string) => pathname === href;

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between relative">
                {/* Left Side */}
                <div className="flex items-center gap-4 md:gap-10">
                    <a href="/delivery/home">
                        <div className="text-xl font-bold text-green-600">AushadhiKendra</div>
                    </a>

                    <ul className="hidden md:flex gap-6 text-gray-700 font-medium">
                        {/* slice the number as much new added */}
                        {navLinks.slice(0, 3).map((link) => (
                            <li key={link.name}>
                                <a
                                    href={link.href}
                                    className={`hover:text-green-600 transition-colors flex items-center gap-2 border-b-2 ${isActive(link.href)
                                        ? "border-green-600 text-green-600 font-semibold"
                                        : "border-transparent"
                                        }`}
                                >
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right Side */}
                <div className="flex items-center md:gap-10 gap-4">
                    <button className="text-gray-700 hover:text-green-600 transition text-2xl md:text-3xl">
                        <FaBell />
                    </button>

                    {/* Desktop Profile Dropdown */}
                    <div className="hidden md:block">
                        <Dropdown
                            content={
                                <div className="text-sm">
                                    <a
                                        href="/profile"
                                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded text-green-600"
                                    >
                                        <FaUser className="text-green-600" />
                                        Profile
                                    </a>
                                    <button
                                        onClick={() => router.push('/logout')}
                                        className="w-full text-left flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded text-red-500"
                                    >
                                        <FaSignOutAlt className="text-red-500" />
                                        Logout
                                    </button>
                                </div>
                            }
                        >
                            <button className="text-gray-700 hover:text-green-600 transition text-3xl">
                                <FaUserCircle />
                            </button>
                        </Dropdown>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden z-[100]">
                        {!menuOpen && (
                            <button onClick={() => setMenuOpen(true)}>
                                <FaBars className="text-2xl" />
                            </button>
                        )}
                    </div>
                </div>
            </nav>

            {/* Mobile Overlay Menu - Right side */}
            {menuOpen && (
                <div
                    className="md:hidden fixed top-0 right-0 h-full bg-white z-50 p-6 shadow-xl"
                    style={{ width: '70%', maxWidth: '300px' }}
                >
                    <div className="mb-2 items-end flex justify-end">
                        <button onClick={() => setMenuOpen(false)}>
                            <FaTimes className="text-2xl" />
                        </button>
                    </div>

                    <ul className="flex flex-col gap-4 text-gray-700 font-medium">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <a
                                    href={link.href}
                                    className={`flex items-center gap-3 hover:text-green-600 transition-colors border-b-2 ${isActive(link.href)
                                        ? "border-green-600 p-0.5 font-semibold text-green-600"
                                        : "border-transparent"
                                        }`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setMenuOpen(false);
                                        router.push(link.href);
                                    }}
                                >
                                    {link.icon}
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </header>
    );
}
