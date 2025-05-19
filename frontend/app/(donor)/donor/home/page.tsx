'use client';

import Navbar from '@/components/Navbar';
import {
  FaPills,
  FaDollarSign,
  FaHandHoldingHeart,
  FaUpload,
  FaBoxOpen,
} from 'react-icons/fa';

export default function Page() {
  return (
    <>
    <Navbar/>
    <div className="p-7 space-y-6 bg-gray-50 min-h-screen">

      <div className="grid grid-cols-2 sm:w-11/12 m-auto sm:grid-cols-3 lg:grid-cols-5 gap-4 ">
        <StatCard
          icon={<FaUpload className="text-blue-500 text-2xl" />}
          label="Total Uploads"
          value="124"
          bgColor="bg-blue-50"
          borderColor="border border-blue-200"
        />
        <StatCard
          icon={<FaDollarSign className="text-green-500 text-2xl" />}
          label="Marked Sales"
          value="56"
          bgColor="bg-green-50"
          borderColor="border border-green-200"
        />
        <StatCard
          icon={<FaHandHoldingHeart className="text-pink-500 text-2xl" />}
          label="Marked Donations"
          value="68"
          bgColor="bg-pink-50"
          borderColor="border border-pink-200"
        />
        <StatCard
          icon={<FaPills className="text-purple-500 text-2xl" />}
          label="Total Medicine"
          value="230"
          bgColor="bg-purple-50"
          borderColor="border border-purple-200"
        />
        <StatCard
          icon={<FaBoxOpen className="text-yellow-500 text-2xl" />}
          label="Pending Dispatch"
          value="15"
          bgColor="bg-yellow-50"
          borderColor="border border-yellow-200"
        />
      </div>
    </div>
    </>
  );
}

type StatCardProps = {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  bgColor: string;
  borderColor: string;
};

function StatCard({ icon, label, value, bgColor, borderColor }: StatCardProps) {
  return (
    <div
      className={`rounded-lg shadow-md w-full aspect-[4/3] p-4 relative hover:shadow-lg transition-shadow ${bgColor} ${borderColor}`}
    >
      <div className="absolute top-3 left-3">
        {icon}
      </div>
      <div className="h-full pt-6 flex flex-col justify-center">
        <p className="text-6xl text-center font-bold text-gray-800">{value}</p>
        <p className="text-md font-semibold text-center text-gray-600 mt-2">{label}</p>
      </div>
    </div>
  );
}
