'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Navbar from '@/components/Navbar';

export default function DeliveryPartnerLogin() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:5134/api/delivery-partner/login', {
                email,
                password,
            });

            // Assuming the API returns a token or user info
            const data = response.data;

            // Example: Save token to localStorage (optional)
            localStorage.setItem('token', data.token);

            // Redirect on success
            router.push('/delivery/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-white flex items-center justify-center px-4">
                <div className="flex w-full max-w-6xl">
                    {/* Left: Illustration */}
                    <div className="hidden md:flex md:w-3/5 justify-center items-center p-10">
                        <img
                            src="/image.png"
                            alt="Delivery Partner"
                            className="max-w-full w-auto h-auto object-contain"
                        />
                    </div>

                    {/* Right: Login Form */}
                    <div className="w-full md:w-2/5 p-10 bg-white rounded-lg shadow-lg border border-gray-200 flex flex-col justify-center h-fit">
                        <h2 className="text-3xl font-bold text-green-700 mb-8 text-center">Delivery Partner Login</h2>

                        <form onSubmit={handleLogin} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-800 mb-2">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-800 mb-2">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition"
                                />
                            </div>

                            {error && (
                                <div className="text-red-600 text-sm">{error}</div>
                            )}

                            <div className="flex justify-between text-sm">
                                <a href="#" className="text-green-600 hover:underline">Forgot Password?</a>
                                <a href="/delivery/register" className="text-gray-600 hover:underline">New here? Register</a>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-60"
                            >
                                {loading ? 'Logging in...' : 'Login'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
