export default function Footer() {
  return (
    <footer className="bg-green-50 border-t border-gray-200 py-12 text-sm text-gray-600">
      <div className="max-w-6xl mx-auto flex justify-between">
        {/* Brand Description */}
        <div className="w-4/12">
          <h4 className="text-xl font-bold text-gray-800 mb-2">AushadhiKendra</h4>
          <p>
            Connecting medicine donors with those in need to reduce waste and increase access to essential medications.
          </p>
        </div>

        {/* Platform Links */}
        <div>
          <h5 className="font-semibold text-gray-800 mb-3">Platform</h5>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-green-600 transition-colors">Become a Donor</a>
            </li>
            <li>
              <a href="#" className="hover:text-green-600 transition-colors">Register as Receiver</a>
            </li>
            <li>
              <a href="#" className="hover:text-green-600 transition-colors">Search Medicines</a>
            </li>
            <li>
              <a href="#" className="hover:text-green-600 transition-colors">How It Works</a>
            </li>
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h5 className="font-semibold text-gray-800 mb-3">Company</h5>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-green-600 transition-colors">About Us</a>
            </li>
            <li>
              <a href="#" className="hover:text-green-600 transition-colors">Contact</a>
            </li>
            <li>
              <a href="#" className="hover:text-green-600 transition-colors">Partners</a>
            </li>
            <li>
              <a href="#" className="hover:text-green-600 transition-colors">Careers</a>
            </li>
          </ul>
        </div>

         <div>
          <h5 className="font-semibold text-gray-800 mb-3">Legal</h5>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-green-600 transition-colors">Privacy Policy</a>
            </li>
            <li>
              <a href="#" className="hover:text-green-600 transition-colors">Terms and Condition</a>
            </li>
          </ul>
        </div>
      </div>

      

      {/* Bottom Section */}
      <div className="mt-10 text-center border-t border-gray-200 pt-6">
        <p>© 2025 <span className="font-semibold text-gray-800">AushadhiKendra</span>. All rights reserved.</p>
      </div>
    </footer>
  );
}
