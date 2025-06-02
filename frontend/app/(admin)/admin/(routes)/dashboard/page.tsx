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
import { Table, Column } from "@/components/ui/Table";
import gsap from "gsap";

const data = [
  { month: "Jan", Donations: 40, Sales: 12, Deliveries: 35, Requests: 55 },
  { month: "Feb", Donations: 30, Sales: 20, Deliveries: 40, Requests: 60 },
  { month: "Mar", Donations: 45, Sales: 15, Deliveries: 50, Requests: 70 },
  { month: "Apr", Donations: 50, Sales: 22, Deliveries: 60, Requests: 65 },
  { month: "May", Donations: 48, Sales: 25, Deliveries: 65, Requests: 75 },
  { month: "Jun", Donations: 55, Sales: 30, Deliveries: 70, Requests: 80 },
];

const tableColumns: Column<{
  name: string;
  status: string;
  date: string;
  quantity: number;
}>[] = [
    { label: "Medicine", key: "name" },
    { label: "Expiry Date", key: "date" },
    { label: "Quantity", key: "quantity" },
    {
      label: "Status",
      key: "status",
      render: (value: string) => {
        const baseClass = "px-3 py-1 rounded-full text-xs font-semibold inline-block";
        const statusStyles = {
          Donation: "bg-green-100 text-green-800",
          Sell: "bg-red-100 text-red-800",
        };
        const style = statusStyles[value as "Donation" | "Sell"] || "bg-gray-100 text-gray-700";
        return <span className={`${baseClass} ${style}`}>{value}</span>;
      },
    },
  ];

const tableData = [
  { name: "Paracetamol", date: "2024-12-31", quantity: 100, status: "Sell" },
  { name: "Ibuprofen", date: "2025-01-15", quantity: 50, status: "Donation" },
  { name: "Amoxicillin", date: "2024-11-30", quantity: 200, status: "Donation" },
  { name: "Ciprofloxacin", date: "2025-02-28", quantity: 75, status: "Donation" },

  { name: "Aspirin", date: "2025-03-01", quantity: 120, status: "Sell" },
];

export default function DashboardPage() {
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const chartRef = useRef<HTMLDivElement>(null);
  const chartRef2 = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      gsap.from(card, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: i * 0.15,
        ease: "power3.out",
      });
    });

    if (chartRef.current) {
      gsap.from(chartRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        delay: 0.6,
        ease: "power3.out",
      });
    }

    if (chartRef2.current) {
      gsap.from(chartRef2.current, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        delay: 0.75,
        ease: "power3.out",
      });
    }

    if (actionsRef.current) {
      gsap.from(actionsRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        delay: 0.9,
        ease: "power3.out",
      });
    }
  }, []);

  return (
    <div className="px-4 md:px-8 min-h-full">
      <h2 className="text-2xl sm:text-3xl font-bold text-teal-900 mb-6">
        Welcome, Admin! 👋
      </h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {[
          {
            label: "Donation Medicine",
            count: 345,
            icon: <FiPackage className="text-teal-600 w-12 h-12" />,
            className: "bg-teal-50 text-teal-800",
          },
          {
            label: "Medicine on Sell",
            count: 87,
            icon: <FiShoppingCart className="text-amber-500 w-12 h-12" />,
            className: "bg-amber-50 text-amber-800",
          },
          {
            label: "Pending Delivery",
            count: 132,
            icon: <FiTruck className="text-blue-500 w-12 h-12" />,
            className: "bg-blue-50 text-blue-800",
          },
          {
            label: "Users Approval",
            count: 24,
            icon: <FiClock className="text-green-400 w-12 h-12" />,
            className: "bg-green-50 text-green-800",
          },
        ].map((item, i) => (
          <div key={i} ref={(el) => { cardsRef.current[i] = el! }}>
            <Card className={`${item.className.split(" ")[0]} rounded-2xl p-6 flex items-center justify-between shadow-lg`}>
              <div>
                <p className={`text-sm font-semibold ${item.className}`}>{item.label}</p>
                <h3 className={`text-2xl font-bold text-black mt-1`}>{item.count}</h3>
                <p className={`text-xs mt-1 ${item.className}`}>Last 30 days</p>
              </div>
              {item.icon}
            </Card>
          </div>
        ))}
      </div>

      {/* Charts and Quick Actions */}
      <div className="w-full flex flex-col lg:flex-row gap-8">
        {/* Left: Table */}
        <div className="w-full lg:w-8/12">
          <h3 className="text-lg sm:text-xl font-semibold text-teal-900 mb-4">
            Recent Activities
          </h3>
          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              <Table columns={tableColumns} data={tableData} />
            </div>
          </div>
        </div>

        {/* Right: Quick Actions */}
        <div
          ref={actionsRef}
          className=" w-full lg:w-4/12 bg-white"
        >
          <h3 className="text-lg sm:text-xl font-semibold text-teal-900 mb-6">
            Quick Actions
          </h3>
          <div className="space-y-4">
            <Button className="w-full flex items-center justify-center gap-2 flex-wrap text-sm sm:text-base" variant="primary">
              Review Medicines
            </Button>
            <Button className="w-full flex items-center justify-center gap-2 flex-wrap text-sm sm:text-base" variant="danger">
              View Delivery Status <FiTruck />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
