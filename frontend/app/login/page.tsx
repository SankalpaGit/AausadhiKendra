'use client';

import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface LoginFormData {
  email: string;
  password: string;
}

export default function Page() {
  const router = useRouter();

  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:5134/api/donor/login', formData);
      const { token, user } = response.data;

      // Save token only on the client side after render
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', token);
      }

      setSuccess('Login successful!');
      router.push('/donor/home'); // Navigate after login
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  // Optional: clear success/error message after some delay
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess('');
        setError('');
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left side: Illustration and Info (desktop only) */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-green-100 p-10">
        <h1 className="text-5xl font-extrabold text-green-700 mb-4 text-center tracking-wide font-serif">
          <span className="text-gray-800">Aushadhi</span><span className="text-green-600">Kendra</span>
        </h1>


        <h2 className="text-2xl font-semibold text-gray-600 text-center mb-4">
          Donate Medicines, Deliver <span className="bg-green-600 px-2 rounded text-white">Hope</span>
        </h2>

        <p className="text-lg text-green-900 text-center max-w-md">
          Turn your <span className="bg-yellow-100 px-1.5 rounded font-medium">unused medicines</span> into a
          <span className="px-1.5 rounded font-medium ml-1">lifeline</span> for those in need.
          Make healthcare <span className=" px-1.5 rounded font-medium">accessible</span>
        </p>
      </div>


      {/* Right side: Login Form */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-8">
        <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-md">
          <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-4">Welcome Back</h2>
          <p className="text-center text-gray-500 mb-6">Login to continue donating medicines</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {error && <p className="text-red-600 text-sm text-center">{error}</p>}
            {success && <p className="text-green-600 text-sm text-center">{success}</p>}

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md shadow-sm transition duration-150"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
