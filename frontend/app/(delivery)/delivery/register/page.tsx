'use client';
import { useState } from 'react';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';

const vehicleOptions = ['Bike', 'Scooter'];

export default function DeliveryPartnerRegister() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [vehicleNumber, setVehicleNumber] = useState('');
    const [licenseNumber, setLicenseNumber] = useState('');
    const [password, setPassword] = useState('');
    const [vehicleType, setVehicleType] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        const [firstName, ...rest] = fullName.trim().split(' ');
        const lastName = rest.join(' ');

        try {
            const response = await axios.post('http://localhost:5134/api/delivery-partner/register', {
                firstName,
                lastName,
                email,
                password,
                address,
                licenseNumber,
                phoneNumber: phone,
                vehicleType, // even if backend doesn't need it now, you can add this
                vehicleNumber
            });

            setSuccess(response.data.message);
            // Clear form
            setFullName('');
            setEmail('');
            setPhone('');
            setAddress('');
            setVehicleNumber('');
            setLicenseNumber('');
            setPassword('');
            setVehicleType('');

            setTimeout(() => {
                router.push('/delivery/login'); // Redirect to login after successful registration
            }, 3000); // Clear success message after 3 seconds
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-white flex flex-col md:flex-row items-center justify-center px-4 py-10">
                <div className="hidden md:flex md:w-1/2 justify-center">
                    <img
                        src="/image.png"
                        alt="Delivery Partner"
                        className="w-[500px] max-w-full h-auto object-contain"
                    />
                </div>

                <div className="w-full md:w-1/2 max-w-4xl bg-white p-10 rounded-2xl shadow-lg border border-gray-200">
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-800 mb-1">Full Name</label>
                            <input
                                type="text"
                                required
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-800 mb-1">Email</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-800 mb-1">Phone Number</label>
                            <input
                                type="tel"
                                required
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-800 mb-1">Address</label>
                            <input
                                type="text"
                                required
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-800 mb-1">Vehicle Number</label>
                            <input
                                type="text"
                                required
                                value={vehicleNumber}
                                onChange={(e) => setVehicleNumber(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-800 mb-1">Driving License Number</label>
                            <input
                                type="text"
                                required
                                value={licenseNumber}
                                onChange={(e) => setLicenseNumber(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-800 mb-1">Vehicle Type</label>
                            <select
                                required
                                value={vehicleType}
                                onChange={(e) => setVehicleType(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-green-500 focus:outline-none transition"
                            >
                                <option value="">Select Vehicle Type</option>
                                {vehicleOptions.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-800 mb-1">Password</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                            >
                                {loading ? 'Registering...' : 'Register Now'}
                            </button>
                        </div>

                        {error && (
                            <div className="md:col-span-2 text-red-600 font-medium">{error}</div>
                        )}
                        {success && (
                            <div className="md:col-span-2 text-green-600 font-medium">{success}</div>
                        )}
                    </form>
                </div>
            </div>
        </>
    );
}
