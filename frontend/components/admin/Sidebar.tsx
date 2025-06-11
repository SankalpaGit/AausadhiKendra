'use client';
import React from 'react';
import Link from 'next/link';
import {
  FiHome,
  FiUsers,
  FiPackage,
  FiMessageSquare,
  FiClipboard,
  FiChevronDown,
  FiClock,
  FiCheckCircle,
} from 'react-icons/fi';
import { AiOutlineMedicineBox } from "react-icons/ai";
import {
  MdLocalHospital,
  MdVolunteerActivism,
  MdDeliveryDining,
} from 'react-icons/md';

interface SidebarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ sidebarOpen, toggleSidebar }: SidebarProps) {
  // Example state for dropdowns
  const [openReg, setOpenReg] = React.useState(false);
  const [openOrders, setOpenOrders] = React.useState(false);

  // Optional: close sidebar on link click (for mobile)
  const handleLinkClick = () => {
    if (sidebarOpen) toggleSidebar();
  };

  return (
    <aside
      className={`
    fixed inset-y-0 left-0 w-64 transform transition-transform duration-300 ease-in-out
    bg-teal-900 text-white p-4 z-40
    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
    md:static md:translate-x-0 md:block
  `}
    >
      <h2 className="text-2xl font-bold mb-6 text-white">AausadhiKendra</h2>

      <nav className="space-y-2">
        <Link
          href="/admin/dashboard"
          onClick={handleLinkClick}
          className="flex items-center gap-2 px-4 py-2 rounded hover:bg-teal-800"
        >
          <FiHome />
          <span>Dashboard</span>
        </Link>

        {/* Registration Requests */}
        <div>
          <button
            onClick={() => setOpenReg(!openReg)}
            className="w-full flex items-center justify-between px-4 py-2 hover:bg-teal-800 rounded"
          >
            <span className="flex items-center gap-2">
              <FiUsers />
              Registration
            </span>
            <FiChevronDown
              className={`transform transition-transform ${openReg ? 'rotate-180' : ''
                }`}
            />
          </button>
          {openReg && (
            <div className="ml-6 mt-1 space-y-1">
              <Link
                href="/admin/requests/donor"
                onClick={handleLinkClick}
                className="flex items-center gap-2 px-4 py-2 rounded hover:bg-teal-800"
              >
                <MdVolunteerActivism />
                Donor
              </Link>
              
              <Link
                href="/admin/requests/delivery"
                onClick={handleLinkClick}
                className="flex items-center gap-2 px-4 py-2 rounded hover:bg-teal-800"
              >
                <MdDeliveryDining />
                Delivery Partner
              </Link>
            </div>
          )}
        </div>

        <Link
          href="/admin/medicine"
          onClick={handleLinkClick}
          className="flex items-center gap-2 px-4 py-2 rounded hover:bg-teal-800"
        >
          <AiOutlineMedicineBox />
          Medicine
        </Link>

        {/* Orders */}
        <div>
          <button
            onClick={() => setOpenOrders(!openOrders)}
            className="w-full flex items-center justify-between px-4 py-2 hover:bg-teal-800 rounded"
          >
            <span className="flex items-center gap-2">
              <FiPackage />
              Orders
            </span>
            <FiChevronDown
              className={`transform transition-transform ${openOrders ? 'rotate-180' : ''
                }`}
            />
          </button>
          {openOrders && (
            <div className="ml-6 mt-1 space-y-1">
              <Link
                href="/admin/orders/pending"
                onClick={handleLinkClick}
                className="flex items-center gap-2 px-4 py-2 rounded hover:bg-teal-800"
              >
                <FiClock />
                Pending
              </Link>
              <Link
                href="/admin/orders/completed"
                onClick={handleLinkClick}
                className="flex items-center gap-2 px-4 py-2 rounded hover:bg-teal-800"
              >
                <FiCheckCircle />
                Completed
              </Link>
            </div>
          )}
        </div>

        <Link
          href="/admin/reports"
          onClick={handleLinkClick}
          className="flex items-center gap-2 px-4 py-2 rounded hover:bg-teal-800"
        >
          <FiClipboard />
          Reports
        </Link>
        <Link
          href="/admin/support"
          onClick={handleLinkClick}
          className="flex items-center gap-2 px-4 py-2 rounded hover:bg-teal-800"
        >
          <FiMessageSquare />
          Customer Support
        </Link>
      </nav>
    </aside>
  );
}
