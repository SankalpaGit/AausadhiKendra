export default function Footer(){
    return(
         <footer className="bg-white border-t py-10 text-sm text-gray-600 text-center">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between">
          <div>
            <h4 className="font-bold text-gray-800">AushadhiKendra</h4>
            <p>Connecting medicine donors with those in need to reduce waste and increase access.</p>
          </div>
          <div className="grid grid-cols-2 gap-6 mt-6 md:mt-0">
            <div>
              <h5 className="font-semibold text-gray-800">Platform</h5>
              <ul>
                <li>Become a Donor</li>
                <li>Register as Receiver</li>
                <li>Search Medicines</li>
                <li>How It Works</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-gray-800">Company</h5>
              <ul>
                <li>About Us</li>
                <li>Contact</li>
                <li>Partners</li>
                <li>Careers</li>
              </ul>
            </div>
          </div>
        </div>
        <p className="mt-6">© 2025 AushadhiKendra. All rights reserved.</p>
      </footer>
    )
}