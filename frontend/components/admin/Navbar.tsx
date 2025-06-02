// components/admin/Navbar.tsx
'use client';
import React from 'react';
import {
    FiMenu,
    FiX,
    FiBell,
    FiChevronDown,
    FiLogOut,
    FiUser,
} from 'react-icons/fi';
import Link from 'next/link';
import Dropdown from '@/components/ui/Dropdown';

interface NavbarProps {
    sidebarOpen: boolean;
    toggleSidebar: () => void;
}

export default function Navbar({ sidebarOpen, toggleSidebar }: NavbarProps) {
    return (
        <header className="bg-white shadow h-16 flex items-center justify-between px-4 md:px-6">
            <div className="flex items-center gap-4">
                <button onClick={toggleSidebar} className="md:hidden">
                    {sidebarOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
                </button>
                <h1 className="text-lg font-semibold hidden md:block text-teal-900">
                    Admin Portal
                </h1>
            </div>

            <div className="flex items-center gap-12 relative">
                <button className="relative">
                    <FiBell className="h-6 w-6 text-gray-600" />
                    <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500" />
                </button>

                {/* Profile Dropdown */}
                <Dropdown
                    content={
                        <div className="text-sm w-36"> {/* Set wider width */}
                            <Link
                                href="/admin/profile"
                                className="flex items-center gap-2 px-4 py-4 hover:bg-gray-100 text-gray-800 font-semibold"
                            >
                                <FiUser className="w-5 h-5" /> {/* icon */}
                                Profile
                            </Link>
                            <Link
                                href="/logout"
                                className="flex items-center gap-2 px-4 py-4 hover:bg-gray-100 text-red-600 font-semibold"
                            >
                                <FiLogOut className="w-5 h-5" /> {/* icon */}
                                Logout
                            </Link>
                        </div>
                    }
                >
                    <div className="cursor-pointer">
                        <FiUser className="h-6 w-6 text-gray-600" />
                    </div>
                </Dropdown>
            </div>
        </header>
    );
}
