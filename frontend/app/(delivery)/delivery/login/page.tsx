'use client';
import Navbar from '@/components/Navbar';

export default function DeliveryPartnerLogin() {
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-white flex items-center justify-center px-4">
                <div className="flex w-full max-w-6xl">

                    {/* Left: Illustration (60% width container) */}
                    <div className="hidden md:flex md:w-3/5 justify-center items-center p-10">
                        <img
                            src="/image.png"
                            alt="Delivery Partner"
                            className="max-w-full w-auto h-auto object-contain"
                        />
                    </div>

                    {/* Right: Login Form (40% width container) */}
                    <div className="w-full md:w-2/5 p-10 bg-white rounded-lg shadow-lg border border-gray-200 flex flex-col justify-center h-fit">
                        <h2 className="text-3xl font-bold text-green-700 mb-8 text-center">Delivery Partner Login</h2>
                        <form className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-800 mb-2">Email</label>
                                <input
                                    type="email"
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-800 mb-2">Password</label>
                                <input
                                    type="password"
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition"
                                />
                            </div>

                            <div className="flex justify-between text-sm">
                                <a href="#" className="text-green-600 hover:underline">Forgot Password?</a>
                                <a href="/delivery/register" className="text-gray-600 hover:underline">New here? Register</a>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                            >
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
