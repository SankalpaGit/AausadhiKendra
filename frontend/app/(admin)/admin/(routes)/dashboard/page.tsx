"use client";

import React, { useEffect, useRef } from "react";
import {
  FiPackage,
  FiShoppingCart,
  FiClock,
  FiTruck,
} from "react-icons/fi";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

type Medicine = {
  id: number;
  name: string;
  unitPrice: number;
  quantity: number;
  expiryDate: string;
  label: 'Sale' | 'Donation';
};

export default function DashboardPage() {
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const actionsRef = useRef<HTMLDivElement>(null);


  return (
    <div className="px-4 md:px-8 py-6 min-h-screen w-full">
      <h2 className="text-2xl sm:text-3xl font-bold text-teal-900 mb-6">
        Welcome, Admin! 👋
      </h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            label: "Donation Medicine",
            count: 345,
            icon: <FiPackage className="text-teal-600 w-10 h-10" />,
            bg: "bg-teal-50",
            text: "text-teal-800",
          },
          {
            label: "Medicine on Sell",
            count: 87,
            icon: <FiShoppingCart className="text-amber-500 w-10 h-10" />,
            bg: "bg-amber-50",
            text: "text-amber-800",
          },
          {
            label: "Pending Delivery",
            count: 132,
            icon: <FiTruck className="text-blue-500 w-10 h-10" />,
            bg: "bg-blue-50",
            text: "text-blue-800",
          },
          {
            label: "Users Approval",
            count: 24,
            icon: <FiClock className="text-green-400 w-10 h-10" />,
            bg: "bg-green-50",
            text: "text-green-800",
          },
        ].map((item, i) => (
          <div
            key={i}
            ref={(el) => {
              cardsRef.current[i] = el!;
            }}
          >
            <Card
              className={`rounded-2xl p-5 flex items-center justify-between shadow-md ${item.bg}`}
            >
              <div className="space-y-1 max-w-[60%] sm:max-w-full">
                <p className={`text-sm font-semibold ${item.text}`}>
                  {item.label}
                </p>
                <h3 className="text-2xl font-bold text-black">{item.count}</h3>
                <p className={`text-xs ${item.text}`}>Last 30 days</p>
              </div>
              {item.icon}
            </Card>
          </div>
        ))}
      </div>

      {/* Table and Quick Actions Side by Side */}
      <div className="flex flex-col lg:flex-row gap-6">


        {/* Quick Actions */}
        <div
          ref={actionsRef}
          className="w-full lg:w-1/3 bg-white p-5 rounded-xl shadow min-w-0 flex flex-col justify-start"
        >
          <h3 className="text-lg sm:text-xl font-semibold text-teal-900 mb-6">
            Quick Actions
          </h3>
          <div className="space-y-4">
            <Button
              className="w-full flex items-center justify-center gap-2 text-sm sm:text-base"
              variant="primary"
            >
              Review Medicines
            </Button>
            <Button
              className="w-full flex items-center justify-center gap-2 text-sm sm:text-base"
              variant="danger"
            >
              View Delivery Status <FiTruck />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
