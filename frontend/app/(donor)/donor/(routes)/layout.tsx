// app/(donor)/donor/(routes)/layout.tsx

import React from 'react';
import UserNavbar from '@/components/users/UserNavbar';
import UserFooter from '@/components/users/UserFooter';

export default function DonorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <UserNavbar />
            <main className="flex-grow pt-20 px-4 md:px-8 py-6">{children}</main>

            <UserFooter />
        </div>
    );
}
