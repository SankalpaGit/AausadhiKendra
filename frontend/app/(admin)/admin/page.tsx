'use client';

import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface Credentials {
    username: string;
    password: string;
}

export default function Page() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        setLoading(true);
        const creds: Credentials = { username, password };

        // Simulate API delay
        setTimeout(() => {
            console.log('Logging in with:', creds);
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
                <div className="mb-6 flex items-center gap-x-4 w-fit m-auto">
                    {/* Larger Logo */}
                    <img src="/Favicon.png" alt="Logo" className="h-20 w-20" />
                    <div>
                        <h1 className="text-2xl font-bold text-gray-700">Admin Sign In</h1>
                        <p className='text-sm text-gray-500'>Login and manage your dashboard</p>
                    </div>
                </div>


                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="mb-1 block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
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

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-md bg-green-600 px-4 py-2 text-white font-semibold transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 disabled:opacity-50"
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>

                <p className="mt-6 text-center text-xs text-gray-400">
                    &copy; {new Date().getFullYear()} Aausadhikendra. All rights reserved.
                </p>
            </div>
        </div>
    );
}
