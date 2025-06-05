// app/delivery/routes/layout.tsx
'use client';
import Navbar from '@/components/Navbar';
import PartnerNavbar from '@/components/users/PartnerNavbar';
import { ReactNode } from 'react';

export default function DeliveryRoutesLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <PartnerNavbar />
            <main className="min-h-screen bg-white">{children}</main>
        </>
    );
}
