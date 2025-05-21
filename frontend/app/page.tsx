import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import { FaHospitalAlt, FaHandsHelping, FaCapsules, FaHeartbeat } from 'react-icons/fa';

// app/page.tsx (for Next.js App Router setup)
export default function Home() {

  const partners = [
    {
      name: "City Hospital",
      icon: (
        <div className="p-4 rounded-full border-4 border-green-200 bg-green-50">
          <FaHospitalAlt className="text-green-600 text-3xl" />
        </div>
      ),
    },
    {
      name: "HealthCare NGO",
      icon: (
        <div className="p-4 rounded-full border-4 border-blue-200 bg-blue-50">
          <FaHandsHelping className="text-blue-600 text-3xl" />
        </div>
      ),
    },
    {
      name: "MediPharm",
      icon: (
        <div className="p-4 rounded-full border-4 border-purple-200 bg-purple-50">
          <FaCapsules className="text-purple-600 text-3xl" />
        </div>
      ),
    },
    {
      name: "LifeSavers",
      icon: (
        <div className="p-4 rounded-full border-4 border-red-200 bg-red-50">
          <FaHeartbeat className="text-red-600 text-3xl" />
        </div>
      ),
    },
  ];

  return (
    <main className="bg-gradient-to-br from-green-50 to-white text-gray-800">
      <Navbar />
      <Hero />

      {/* Partners */}
      <section className="py-20 text-center bg-white">
        <h2 className="text-4xl font-bold mb-4">Our Partners</h2>
        <p className="text-gray-600 mb-12 max-w-xl mx-auto">
          Trusted organizations that work with us to make medicine accessible
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4 sm:px-6 md:px-8 max-w-4xl mx-auto">
          {partners.map((partner, i) => (
            <div
              key={i}
              className="transition-all duration-300 rounded-xl p-6 flex flex-col items-center hover:scale-105 bg-white"
            >
              {partner.icon}
              <p className="mt-3 font-medium text-gray-800">{partner.name}</p>
            </div>
          ))}
        </div>
      </section>


      <Footer />

    </main>
  );
}
