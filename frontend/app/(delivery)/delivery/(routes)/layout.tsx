// app/delivery/routes/layout.tsx
'use client';
import Navbar from '@/components/Navbar';
import { ReactNode } from 'react';

export default function DeliveryRoutesLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-white">{children}</main>
        </>
    );
}
