'use client';

import React from 'react';
import {
  FaUser,
  FaEnvelope,
  FaFileAlt,
  FaBuilding,
  FaCheckCircle,
  FaTimesCircle,
  FaEdit,
  FaShieldAlt,
  FaUserCheck,
  FaCapsules,
} from 'react-icons/fa';

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
  // Toggle this value to show Individual vs Organization
  const isOrganization = true;

  const donorData: DonorModel = isOrganization
    ? {
      id: '1',
      fullName: 'MediSupply Corp.',
      donorType: 'Organization',
      organizationType: 'Hospital',
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
    <div className="min-h-screen ">
      {/* Header */}
      <div >
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center">
                <FaUser className="text-white w-5 h-5" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">Profile</h1>
                <p className="text-sm text-slate-500">Manage your donor information</p>
              </div>
            </div>
            <button className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl">
              <FaEdit className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-2">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-2 ">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden border border-gray-400">
              {/* Profile Header */}
              <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 p-8 text-white ">
                <div className="flex items-center space-x-6">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    {isOrganization ? (
                      <FaBuilding className="w-8 h-8" />
                    ) : (
                      <FaUserCheck className="w-8 h-8" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold mb-2">{donorData.fullName}</h2>
                    <div className="flex items-center space-x-2 text-green-100">
                      <FaUser className="w-4 h-4" />
                      <span className="font-medium">{donorData.donorType}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Details */}
              <div className="p-8 space-y-6">
                <ProfileField
                  icon={<FaEnvelope className="text-green-600 w-5 h-5" />}
                  label="Email Address"
                  value={donorData.email}
                />

                {isOrganization && (
                  <ProfileField
                    icon={
                      donorData.organizationType === 'Hospital' ? (
                        <FaBuilding className="text-emerald-600 w-5 h-5" />
                      ) : (
                        <FaCapsules className="text-green-700 w-5 h-5" />
                      )
                    }
                    label="Organization Type"
                    value={donorData.organizationType || 'N/A'}

                  />
                )}


              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Show verification status only for organizations */}
            {isOrganization && (
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${donorData.isVerified ? 'bg-emerald-100' : 'bg-red-100'
                      }`}
                  >
                    <FaShieldAlt
                      className={`w-5 h-5 ${donorData.isVerified ? 'text-emerald-600' : 'text-red-600'
                        }`}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Verification Status</h3>
                    <p className="text-sm text-slate-500">Account verification</p>
                  </div>
                </div>

                <div
                  className={`flex items-center space-x-2 p-4 rounded-2xl ${donorData.isVerified
                    ? 'bg-emerald-50 border border-emerald-200'
                    : 'bg-red-50 border border-red-200'
                    }`}
                >
                  {donorData.isVerified ? (
                    <FaCheckCircle className="text-emerald-600 w-6 h-6" />
                  ) : (
                    <FaTimesCircle className="text-red-600 w-6 h-6" />
                  )}
                  <div>
                    <p
                      className={`font-semibold ${donorData.isVerified ? 'text-emerald-700' : 'text-red-700'
                        }`}
                    >
                      {donorData.isVerified ? 'Verified' : 'Pending Verification'}
                    </p>
                    <p className="text-xs text-slate-500">
                      {donorData.isVerified
                        ? 'Account is verified'
                        : 'Verification required'}
                    </p>
                  </div>
                </div>

                {!donorData.isVerified && (
                  <button className="w-full mt-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 px-4 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl">
                    Complete Verification
                  </button>
                )}
              </div>
            )}

            {/* Document Section - Only for Organizations */}
            {isOrganization && (
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-6">


                {donorData.documentPath ? (
                  <div className="space-y-4">
                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                          <FaFileAlt className="text-white w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-slate-800">Verification Document</p>
                          <p className="text-sm text-slate-500">PNG • Uploaded</p>
                        </div>
                      </div>
                    </div>
                    <a
                      href={donorData.documentPath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white py-3 px-4 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      View Document
                    </a>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <FaFileAlt className="text-red-500 w-6 h-6" />
                    </div>
                    <p className="text-red-600 font-medium mb-2">No Document Uploaded</p>
                    <p className="text-sm text-slate-500 mb-4">
                      Please upload verification document
                    </p>
                    <button className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white py-2 px-4 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl">
                      Upload Document
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

type ProfileFieldProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
  bgColor?: string;
};

const ProfileField = ({ icon, label, value, bgColor = 'bg-slate-50' }: ProfileFieldProps) => (
  <div className={`${bgColor} rounded-2xl p-4 border border-slate-200/50`}>
    <div className="flex items-center space-x-3">
      <div className="flex-shrink-0">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-600 mb-1">{label}</p>
        <p className="text-base font-semibold text-slate-900 truncate">{value}</p>
      </div>
    </div>
  </div>
);
