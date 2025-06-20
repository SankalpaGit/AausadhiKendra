"use client";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [hasMounted, setHasMounted] = useState(false);
  const [userType, setUserType] = useState<"individual" | "organization">("individual");
  const [organizationType, setOrganizationType] = useState<"pharmacy" | "hospital" | "">("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [document, setDocument] = useState<File | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("DonorType", userType === "organization" ? "Organization" : "Individual");
    formData.append("FullName", fullName);
    formData.append("Email", email);
    formData.append("Password", password);

    if (userType === "organization") {
      if (!organizationType) {
        setMessage({ type: "error", text: "Please select an organization type." });
        return;
      }
      if (!document) {
        setMessage({ type: "error", text: "Please upload a document for verification." });
        return;
      }
      formData.append("OrganizationType", organizationType);
      formData.append("Document", document);
    }

    try {
      const res = await axios.post("http://localhost:5134/api/donor/register", formData);
      setMessage({ type: "success", text: "Registration successful! Redirecting..." });

      // Clear form
      setFullName("");
      setEmail("");
      setPassword("");
      setOrganizationType("");
      setDocument(null);
      setUserType("individual");

      setTimeout(() => router.push("/login"), 1500);
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || "Registration failed.";
      setMessage({ type: "error", text: errorMessage });
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen py-10 px-4 flex flex-col md:flex-row gap-6 md:gap-0">
        {/* Image only on md+ */}
        <div className="hidden md:flex md:w-6/12 justify-center items-center">
          <img src="/auth.jpg" alt="Authentication Visual" className="w-full h-auto" />
        </div>

        <div className="md:w-6/12 w-full max-w-xl mx-auto border border-gray-300 px-6 py-8 rounded-md h-fit">
          {/* Tabs */}
          <div className="grid grid-cols-2 mb-6 border border-green-600 rounded overflow-hidden text-sm">
            {["individual", "organization"].map((type) => (
              <button
                key={type}
                onClick={() => setUserType(type as "individual" | "organization")}
                className={`py-2 font-medium transition ${userType === type
                  ? "bg-green-600 text-white"
                  : "bg-white text-green-600"
                  }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

          {/* Feedback Message */}
          {message && (
            <div
              className={`text-sm mb-4 px-4 py-2 rounded ${message.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
                }`}
            >
              {message.text}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            {userType === "organization" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Organization Type
                  </label>
                  <select
                    value={organizationType}
                    onChange={(e) =>
                      setOrganizationType(e.target.value as "pharmacy" | "hospital")
                    }
                    className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-green-400"
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
                    placeholder="Enter name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-green-400"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Upload Logo / Document
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => setDocument(e.target.files?.[0] || null)}
                    className="w-full border border-gray-300 px-3 py-2 rounded file:bg-green-600 file:text-white file:border-0 file:px-4 file:py-2 file:rounded hover:file:bg-green-700"
                  />
                </div>
              </div>
            )}

            {userType === "individual" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-green-400"
                />
              </div>
            )}

            {/* Shared Fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter a secure password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div className="text-center pt-2">
              <button
                type="submit"
                className="bg-green-600 w-full hover:bg-green-700 text-white font-semibold px-8 py-3 rounded transition"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
