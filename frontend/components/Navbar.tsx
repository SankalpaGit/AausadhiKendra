"use client";
import { useRouter } from 'next/navigation'
import { useState } from "react";
import { FaBars, FaTimes, FaUserPlus, FaUser } from "react-icons/fa";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState({ login: false, register: false });
  const router = useRouter()
  const navLinks = [
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between relative">
        {/* Left Side */}
        <div className="flex items-center gap-10">
          <a href="/">
            <div className="text-xl font-bold text-green-600">AushadhiKendra</div>
          </a>

          <ul className="hidden md:flex gap-6 text-gray-700 font-medium">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} className="hover:text-green-600 transition-colors">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-4 relative">
          {/* Login Dropdown */}
          <div className="relative">
            <button
              onClick={() => router.push('/login')}
              className="px-4 py-2 border rounded hover:bg-gray-100 transition"
            >
              Login
            </button>

          </div>

          {/* Register Dropdown */}
          <div className="relative">
            <button
              onClick={() =>
                setDropdownOpen((prev) => ({
                  login: false,
                  register: !prev.register,
                }))
              }
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Register As
            </button>
            {dropdownOpen.register && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-40 text-left">
                <a href="/donor/register/" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50">
                  <FaUserPlus className="text-green-600" />
                  Donor
                </a>
                <a href="/receiver/register/" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50">
                  <FaUserPlus className="text-green-600" />
                  Receiver
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden z-[100]">
          {!menuOpen && (
            <button onClick={() => setMenuOpen(true)}>
              <FaBars className="text-2xl" />
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Overlay Menu */}
      {menuOpen && (
        <div className="md:hidden fixed top-0 left-0 w-full h-full bg-white z-50 p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="text-xl font-bold text-green-600">AushadhiKendra</div>
            <button onClick={() => setMenuOpen(false)}>
              <FaTimes className="text-2xl" />
            </button>
          </div>

          <ul className="flex flex-col gap-4 text-gray-700 font-medium">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="block hover:text-green-600 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          <hr className="my-6" />

          <div className="flex flex-col gap-4">
            <div>
              <p className="font-semibold text-gray-800 mb-1">Login As</p>
              <a
                href="/login/donor"
                className="block px-4 py-2 border rounded mb-1 hover:bg-gray-100"
              >
                <FaUser className="inline-block mr-2" />
                Donor
              </a>
              <a
                href="/login/receiver"
                className="block px-4 py-2 border rounded hover:bg-gray-100"
              >
                <FaUser className="inline-block mr-2" />
                Receiver
              </a>
            </div>

            <div>
              <p className="font-semibold text-gray-800 mb-1">Register As</p>
              <a
                href="/register/donor"
                className="block px-4 py-2 bg-green-600 text-white rounded mb-1 hover:bg-green-700"
              >
                <FaUserPlus className="inline-block mr-2" />
                Donor
              </a>
              <a
                href="/register/receiver"
                className="block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                <FaUserPlus className="inline-block mr-2" />
                Receiver
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
