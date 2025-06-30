'use client';

import React from 'react';
import {
  FaUser,
  FaEnvelope,
  FaFileAlt,
  FaBuilding,
  FaCheckCircle,
  FaTimesCircle,
} from 'react-icons/fa';
import { BsFillPersonBadgeFill } from 'react-icons/bs';

type DonorModel = {
  id: string;
  fullName: string;
  donorType: 'Individual' | 'Organization';
  organizationType?: 'Hospital' | 'Pharmacy';
  email: string;
  documentPath?: string;
  isVerified: boolean;
};

export default function DonorProfilePage() {
  const isOrganization = false; // Toggle for demo

  const donorData: DonorModel = isOrganization
    ? {
        id: '1',
        fullName: 'MediSupply Corp.',
        donorType: 'Organization',
        organizationType: 'Pharmacy',
        email: 'contact@medisupply.com',
        documentPath: '/documents/medisupply-verification.pdf',
        isVerified: true,
      }
    : {
        id: '2',
        fullName: 'John Doe',
        donorType: 'Individual',
        email: 'johndoe@example.com',
        isVerified: false,
      };

  return (
    <div className="min-h-screen px-10 py-10 ">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-semibold mb-8 text-gray-800">Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left Section */}
          <div className="space-y-6">
            <ProfileField icon={<FaUser />} label="Full Name" value={donorData.fullName} />
            <ProfileField icon={<BsFillPersonBadgeFill />} label="Donor Type" value={donorData.donorType} />
            <ProfileField icon={<FaEnvelope />} label="Email" value={donorData.email} />

            {isOrganization && (
              <ProfileField
                icon={<FaBuilding />}
                label="Organization Type"
                value={donorData.organizationType || 'N/A'}
              />
            )}
          </div>

          {/* Right Section */}
          {isOrganization && (
            <div className="space-y-8">
              <div>
                <div className="flex items-center text-gray-700 font-medium mb-2">
                  <FaFileAlt className="mr-2 text-lg" />
                  Organization Document
                </div>
                {donorData.documentPath ? (
                  <a
                    href={donorData.documentPath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-blue-600 hover:underline"
                  >
                    <img
                      src="/document-placeholder.png"
                      alt="Document"
                      className="w-20 h-20 object-cover rounded border"
                    />
                    View Document
                  </a>
                ) : (
                  <p className="text-red-500 text-sm">No document uploaded</p>
                )}
              </div>

              <div>
                <div className="flex items-center text-gray-700 font-medium mb-1">
                  {donorData.isVerified ? (
                    <FaCheckCircle className="text-green-600 mr-2 text-lg" />
                  ) : (
                    <FaTimesCircle className="text-red-600 mr-2 text-lg" />
                  )}
                  Verification Status
                </div>
                <p className={`font-semibold ${donorData.isVerified ? 'text-green-700' : 'text-red-600'}`}>
                  {donorData.isVerified ? 'Verified' : 'Not Verified'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

type ProfileFieldProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

const ProfileField = ({ icon, label, value }: ProfileFieldProps) => (
  <div className="flex items-start">
    <div className="text-gray-600 mr-3 mt-1">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-base font-medium text-gray-900">{value}</p>
    </div>
  </div>
);
