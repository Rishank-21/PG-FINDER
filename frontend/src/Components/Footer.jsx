import React from 'react';



const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8">
        
          <div className="w-full md:w-1/3">
            <div className="flex items-center gap-3">
              <div className="w-20  flex items-center justify-center rounded-lg text-white font-bold"><img src="/Images/GetUrStay.png" alt="" /></div>
              <div>
                <h3 className="text-lg font-semibold">GetUrStay</h3>
                <p className="text-sm text-gray-300">Find hotels, PGs for students (boys & girls), and rooms on rent — fast and reliable.</p>
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-400">
              <p>Need help? Visit our <a href="/help" className="text-indigo-400 hover:underline">Help Center</a> or <a href="/contact" className="text-indigo-400 hover:underline">Contact Us</a>.</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="w-full md:w-1/3 grid grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-100">Explore</h4>
              <ul className="mt-3 text-sm text-gray-300 space-y-2">
                <li><a href="/hotels" className="hover:text-white">Hotels</a></li>
                <li><a href="/pg" className="hover:text-white">PG for Boys</a></li>
                <li><a href="/pg-girls" className="hover:text-white">PG for Girls</a></li>
                <li><a href="/rent-rooms" className="hover:text-white">Rooms on Rent</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-gray-100">Company</h4>
              <ul className="mt-3 text-sm text-gray-300 space-y-2">
                <li><a href="/about" className="hover:text-white">About Us</a></li>
                <li><a href="/careers" className="hover:text-white">Careers</a></li>
                <li><a href="/blog" className="hover:text-white">Blog</a></li>
                <li><a href="/terms" className="hover:text-white">Terms & Privacy</a></li>
              </ul>
            </div>
          </div>

          {/* Contact / Newsletter */}
          <div className="w-full md:w-1/3">
            <h4 className="font-medium text-gray-100">Get in touch</h4>
            <p className="mt-3 text-sm text-gray-300">Have questions or want listings for your property? Reach out to us.</p>

            <div className="mt-4 text-sm text-gray-300 space-y-2">
              <div>📧 <a href="mailto:info@geturstay.com" className="text-indigo-400 hover:underline">info@geturstay.com</a></div>
              <div>📞 <a href="tel:+911234567890" className="text-indigo-400 hover:underline">+91 12345 67890</a></div>
            </div>

            <form className="mt-4 flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="footer-email" className="sr-only">Email address</label>
              <input id="footer-email" type="email" placeholder="Your email" className="flex-1 px-3 py-2 rounded-md bg-gray-800 placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              <button type="submit" className="px-4 py-2 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700">Subscribe</button>
            </form>

            <div className="mt-5 flex items-center gap-3">
              <a href="/facebook" aria-label="facebook" className="p-2 rounded-md bg-gray-800 hover:bg-gray-700"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 10-11.5 9.9v-7h-2v-3h2V9.4c0-2 1.2-3.1 3-3.1.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2V12h2.2l-.4 3h-1.8v7A10 10 0 0022 12z"/></svg></a>
              <a href="/instagram" aria-label="instagram" className="p-2 rounded-md bg-gray-800 hover:bg-gray-700"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 6.5A4.5 4.5 0 1016.5 13 4.5 4.5 0 0012 8.5zm6.8-2.6a1.2 1.2 0 11-1.2-1.2 1.2 1.2 0 011.2 1.2z"/></svg></a>
              <a href="/twitter" aria-label="twitter" className="p-2 rounded-md bg-gray-800 hover:bg-gray-700"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M22 5.92a8.19 8.19 0 01-2.36.65 4.11 4.11 0 001.8-2.27 8.22 8.22 0 01-2.6.98 4.1 4.1 0 00-7 3.74A11.64 11.64 0 013 4.64a4.1 4.1 0 001.27 5.47 4.07 4.07 0 01-1.86-.51v.05a4.1 4.1 0 003.29 4.02 4.1 4.1 0 01-1.85.07 4.1 4.1 0 003.83 2.85A8.23 8.23 0 012 19.54a11.6 11.6 0 006.29 1.84c7.55 0 11.68-6.26 11.68-11.68 0-.18 0-.36-.01-.54A8.36 8.36 0 0022 5.92z"/></svg></a>
            </div>
          </div>
        </div>

        <hr className="my-8 border-gray-800" />

        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 text-sm text-gray-400">
          <div>© {new Date().getFullYear()} GetUrStay — All rights reserved.</div>
          <div className="flex items-center gap-4">
            <a href="/safety" className="hover:text-white">Safety</a>
            <a href="/faq" className="hover:text-white">FAQ</a>
            <a href="/list-your-place" className="px-3 py-1 rounded-md bg-indigo-700 text-white text-sm hover:bg-indigo-600">List your place</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
