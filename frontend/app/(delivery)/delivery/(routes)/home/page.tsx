'use client';
import { Card } from '@/components/ui/Card';

export default function DeliveryPartnerHome() {
    return (
        <>
            <div className="min-h-screen bg-white px-4 py-10 flex flex-col gap-6 items-center">
                <h1 className="text-3xl font-bold text-green-700">Welcome, Delivery Partner</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
                    <Card className="p-6 text-center">
                        <p className="text-lg font-semibold text-gray-700">Today's Deliveries</p>
                        <p className="text-2xl font-bold text-green-600">4</p>
                    </Card>
                    <Card className="p-6 text-center">
                        <p className="text-lg font-semibold text-gray-700">Pending Pickups</p>
                        <p className="text-2xl font-bold text-yellow-500">2</p>
                    </Card>
                    <Card className="p-6 text-center">
                        <p className="text-lg font-semibold text-gray-700">Completed Deliveries</p>
                        <p className="text-2xl font-bold text-green-800">12</p>
                    </Card>
                </div>
            </div>
        </>
    );
}
