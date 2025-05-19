"use client";
import { useEffect, useState } from "react";

export default function Page() {
  const [hasMounted, setHasMounted] = useState(false);
  const [userType, setUserType] = useState<"individual" | "organization">("individual");
  const [organizationType, setOrganizationType] = useState<"pharmacy" | "hospital" | "">("");

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-green-700 mb-8 text-center">
          Reciever Registration
        </h1>

        {/* Tabs */}
        <div className="grid grid-cols-2 mb-8 border border-green-600 rounded-sm overflow-hidden">
          {["individual", "organization"].map((type) => (
            <button
              key={type}
              onClick={() => setUserType(type as "individual" | "organization")}
              className={`w-full py-2 font-medium transition ${
                userType === type
                  ? "bg-green-600 text-white"
                  : "bg-white text-green-600"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        <form className="space-y-6">
          {/* Organization Fields */}
          {userType === "organization" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Organization Type
                </label>
                <select
                  value={organizationType}
                  onChange={(e) =>
                    setOrganizationType(e.target.value as "pharmacy" | "hospital")
                  }
                  className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-green-400 focus:outline-none"
                >
                  <option value="">Select Type</option>
                  <option value="pharmacy">Pharmacy</option>
                  <option value="hospital">Hospital</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Organization Name
                </label>
                <input
                  type="text"
                  placeholder="Enter organization name"
                  className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-green-400 focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Logo / Document
                </label>
                <input
                  type="file"
                  className="w-full border border-gray-300 px-3 py-2 rounded file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-green-600 file:text-white hover:file:bg-green-700"
                />
              </div>
            </div>
          )}

          {/* Individual-Only Field */}
          {userType === "individual" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-green-400 focus:outline-none"
              />
            </div>
          )}

          {/* Common Fields */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter a secure password"
              className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
          </div>

          <div className="text-center pt-4">
            <button
              type="submit"
              className="bg-green-600 w-full hover:bg-green-700 text-white font-semibold px-8 py-3 transition"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
