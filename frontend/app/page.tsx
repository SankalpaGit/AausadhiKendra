import Hero from "./__pages/landing/Hero";

// app/page.tsx (for Next.js App Router setup)
export default function Home() {
  return (
    <main className="bg-gradient-to-br from-green-50 to-white text-gray-800">
      <Hero/>

      {/* Partners */}
      <section className="py-16 text-center bg-white">
        <h2 className="text-3xl font-bold mb-2">Our Partners</h2>
        <p className="text-gray-600 mb-8">
          Trusted organizations that work with us to make medicine accessible
        </p>
        <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-700">
          {["City Hospital", "HealthCare NGO", "MediPharm", "LifeSavers"].map((name, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="text-2xl">🏥</div>
              {name}
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-green-50 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Join Our Mission Today</h2>
        <p className="text-gray-700 max-w-2xl mx-auto mb-6">
          Whether you're donating unused medicines or seeking affordable medication, AushadhiKendra is here to help.
        </p>
        <div className="flex justify-center gap-4 mb-10">
          <button className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700">
            Get Started
          </button>
          <button className="border px-5 py-2 rounded hover:bg-gray-100">
            Contact Us
          </button>
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left">
          <div className="bg-white p-6 rounded shadow">
            <h3 className="font-semibold text-lg mb-2">For Donors</h3>
            <p className="text-sm text-gray-600">
              Donate unused medicines or sell at discounted rates. Track your impact.
            </p>
            <a href="#" className="text-green-600 text-sm mt-2 inline-block">
              Register as Donor →
            </a>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h3 className="font-semibold text-lg mb-2">For Receivers</h3>
            <p className="text-sm text-gray-600">
              Find donated or discounted medicines. Verify authenticity with QR codes.
            </p>
            <a href="#" className="text-green-600 text-sm mt-2 inline-block">
              Register as Receiver →
            </a>
          </div>
        </div>
      </section>
     
    </main>
  );
}
