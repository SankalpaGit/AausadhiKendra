'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    FiBell,
    FiMenu,
    FiUser,
    FiUpload,
    FiHeart,
    FiPackage,
    FiClipboard,
    FiDatabase,
    FiLogOut,
} from 'react-icons/fi';
import Dropdown from '@/components/ui/Dropdown';

export default function UserNavbar() {
    const pathname = usePathname();
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const navLinks = [
        { name: 'Uploads', href: '/donor/uploads', icon: <FiUpload className="w-5 h-5" /> },
        { name: 'Medicine', href: '/donor/medicine', icon: <FiHeart className="w-5 h-5" /> },
        { name: 'Request', href: '/donor/requests', icon: <FiClipboard className="w-5 h-5" /> },
        { name: 'Order', href: '/donor/order', icon: <FiPackage className="w-5 h-5" /> },
        { name: 'Inventory', href: '/donor/inventory', icon: <FiDatabase className="w-5 h-5" /> },
    ];

    const isActive = (href: string) => pathname === href;

    return (
        <nav className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between relative">
            {/* Logo - Left */}
            <div className="flex-1 flex justify-start lg:ml-5">
                <Link
                    href="/donor/home"
                    className="text-xl font-bold text-green-700 tracking-wide ml-2"
                    onClick={() => setIsMobileOpen(false)} // close menu if logo clicked on mobile
                >
                    Aaushadhikenra
                </Link>
            </div>

            {/* Desktop Nav Links - Center */}
            <div className="hidden md:flex flex-1 justify-center space-x-6">
                {navLinks.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={`text-base font-medium px-2 py-1 border-b-2 transition-colors
                            ${isActive(link.href)
                                ? 'border-green-600 text-green-700'
                                : 'border-transparent text-gray-700 hover:border-green-600 hover:text-green-700'
                            }`}
                    >
                        {link.name}
                    </Link>
                ))}
            </div>

            {/* Right Side Icons */}
            <div className="flex-1 flex justify-end items-center space-x-4 mr-2">
                {/* Notification */}
                <button
                    className="relative text-gray-700 hover:text-green-700 p-2 rounded-md hover:bg-green-50 transition"
                    aria-label="Notifications"
                >
                    <FiBell className="w-6 h-6" />
                    {/* Optional badge */}
                </button>

                {/* Profile Dropdown - desktop only */}
                <div className="hidden md:block">
                    <Dropdown
                        content={
                            <div className="flex flex-col space-y-2 text-sm text-gray-800 min-w-[160px]">
                                <Link href="/profile" className="hover:text-green-700 flex items-center gap-2">
                                    <FiUser className="w-4 h-4" /> Profile
                                </Link>
                                <Link
                                    href="/logout"
                                    className="hover:text-green-700 flex items-center gap-2"
                                >
                                    <FiLogOut className="w-4 h-4" /> Logout
                                </Link>
                            </div>
                        }
                    >
                        <button
                            className="text-gray-700 hover:text-green-700 p-2 rounded-md hover:bg-green-50 transition"
                            aria-label="User menu"
                        >
                            <FiUser className="w-6 h-6" />
                        </button>
                    </Dropdown>
                </div>

                {/* Hamburger (Mobile) */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsMobileOpen((prev) => !prev)}
                        className="p-2 rounded-md text-green-700 hover:bg-green-100 transition"
                        aria-label="Toggle menu"
                    >
                        <FiMenu className="w-7 h-7" />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileOpen && (
                <div className="absolute top-full left-0 w-full bg-white shadow-lg border-t z-50 md:hidden">
                    <div className="flex flex-col px-6 py-5 space-y-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`flex items-center gap-3 text-base font-medium px-3 py-2 rounded-md transition-colors
                                    ${isActive(link.href)
                                        ? 'border-l-4 border-green-600 bg-green-50 text-green-700'
                                        : 'text-gray-800 hover:bg-green-50 hover:text-green-700'
                                    }`}
                                onClick={() => setIsMobileOpen(false)}
                            >
                                {link.icon}
                                {link.name}
                            </Link>
                        ))}

                        {/* Profile */}
                        <Link
                            href="/profile"
                            className="flex items-center gap-3 text-base font-medium px-3 py-2 rounded-md text-gray-800 hover:bg-green-50 hover:text-green-700"
                            onClick={() => setIsMobileOpen(false)}
                        >
                            <FiUser className="w-5 h-5" />
                            Profile
                        </Link>

                        {/* Logout */}
                        <Link
                            href="/logout"
                            className="flex items-center gap-3 text-base font-medium px-3 py-2 rounded-md text-gray-800 hover:bg-green-50 hover:text-green-700"
                            onClick={() => setIsMobileOpen(false)}
                        >
                            <FiLogOut className="w-5 h-5" />
                            Logout
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
