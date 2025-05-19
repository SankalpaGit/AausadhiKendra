import { FaGift, FaSearch, FaCheckCircle, FaLink } from 'react-icons/fa';

export default function Hero() {

    const features = [
        { label: "Donate", sub: "Unused medicines", icon: <FaGift className="text-green-600 text-2xl" /> },
        { label: "Find", sub: "Required medicines", icon: <FaSearch className="text-green-600 text-2xl" /> },
        { label: "Verify", sub: "QR-based delivery", icon: <FaCheckCircle className="text-green-600 text-2xl" /> },
        { label: "Connect", sub: "Donors & receivers", icon: <FaLink className="text-green-600 text-2xl" /> },
    ];


    return (
        <section className="flex flex-col lg:flex-row items-center justify-between px-8 py-16 max-w-7xl mx-auto">
            <div className="max-w-xl">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    Medicine Donation & Sale Platform
                </span>
                <h1 className="text-4xl md:text-4xl font-bold mt-4">
                    Connecting <span className='text-green-700'>Medicine Donors</span>  <br />with Those in Need
                </h1>
                <p className="mt-4 text-lg text-gray-600">
                    AushadhiKendra helps reduce medicine waste and increase access to essential medications through our secure donation and sale platform.
                </p>
                <div className="mt-6 flex gap-4">
                    <button className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700">
                        Get Started
                    </button>
                    
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-10 lg:mt-0 p-6 bg-white shadow-2xl border border-gray-200 rounded-lg">
                {features.map((item, i) => (
                    <div key={i} className="p-4 border border-green-600 bg-green-50 rounded-lg text-center">
                        <div className='flex items-center justify-center'>{item.icon}</div>
                        <h3 className="font-semibold mt-2">{item.label}</h3>
                        <p className="text-sm text-gray-500">{item.sub}</p>
                    </div>
                ))}

            </div>
        </section>
    );
}