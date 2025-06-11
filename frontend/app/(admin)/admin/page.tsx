'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface Credentials {
    email: string;
    password: string;
}

export default function Page() {
    // state  name
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(''); // New state for success message

    // handle submit function for form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault(); // Prevent default form submission behavior
        setLoading(true);
        setError('');
        setSuccess(''); // Reset success message

        // Validate credentials
        const creds: Credentials = {
            email: username,
            password,
        };

        try {
            //api url
            const res = await axios.post('http://localhost:5134/api/Admin/login', creds);

            // Check if response contains token
            const token = res.data?.token;
            if (!token) {
                throw new Error('Token not received from API');
            }

            // Save token to localStorage
            localStorage.setItem('token', token);

            // Set success message
            setSuccess('Login successful! Redirecting to dashboard...');

            // timeout and redirect to dashboard
            setTimeout(() => {
                window.location.href = '/admin/dashboard';
            }, 1500);

        } catch (err: any) {
            console.error('Login error:', err);
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
                <div className="mb-6 flex items-center gap-x-4 w-fit m-auto">
                    <img src="/Favicon.png" alt="Logo" className="h-20 w-20" />
                    <div>
                        <h1 className="text-2xl font-bold text-gray-700">Admin Sign In</h1>
                        <p className="text-sm text-gray-500">Login and manage your dashboard</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="mb-1 block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            id="username"
                            type="email"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 shadow-sm transition focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                        />
                    </div>

                    <div className="relative">
                        <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 pr-10 text-sm text-gray-800 shadow-sm transition focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-9 text-gray-500 hover:text-gray-700 focus:outline-none"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                        </button>
                    </div>

                    {/* Display success or error messages */}
                    {success && (
                        <p className="text-green-500 text-sm text-center">{success}</p>
                    )}
                    {error && (
                        <p className="text-red-500 text-sm text-center">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-md bg-green-600 px-4 py-2 text-white font-semibold transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 disabled:opacity-50"
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>

                <p className="mt-6 text-center text-xs text-gray-400">
                    © {new Date().getFullYear()} Aausadhikendra. All rights reserved.
                </p>
            </div>
        </div>
    );
}