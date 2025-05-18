export default function Hero(){
    return(
      <section className="flex flex-col lg:flex-row items-center justify-between px-8 py-16 max-w-7xl mx-auto">
        <div className="max-w-xl">
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
            Medicine Donation & Sale Platform
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mt-4">
            Connecting Medicine Donors <br /> with Those in Need
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            AushadhiKendra helps reduce medicine waste and increase access to essential medications through our secure donation and sale platform.
          </p>
          <div className="mt-6 flex gap-4">
            <button className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700">
              Register as Donor
            </button>
            <button className="border px-5 py-2 rounded hover:bg-gray-100">
              Search Medicines
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-10 lg:mt-0 p-6 bg-white shadow-lg rounded-lg">
          {[
            { label: "Donate", sub: "Unused medicines", icon: "🎁" },
            { label: "Find", sub: "Required medicines", icon: "🔍" },
            { label: "Verify", sub: "QR-based delivery", icon: "✅" },
            { label: "Connect", sub: "Donors & receivers", icon: "🔗" },
          ].map((item, i) => (
            <div key={i} className="p-4 border rounded-lg text-center">
              <div className="text-2xl">{item.icon}</div>
              <h3 className="font-semibold mt-2">{item.label}</h3>
              <p className="text-sm text-gray-500">{item.sub}</p>
            </div>
          ))}
        </div>
      </section>
    );
}