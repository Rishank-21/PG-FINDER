import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8">
          
          {/* Brand Info */}
          <div className="w-full md:w-1/3">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 flex items-center justify-center rounded-lg bg-gray-800">
                <img src="/Images/GetUrStay.png" alt="GetUrStay" className="w-12 h-12 object-contain" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">GetUrStay</h3>
                <p className="text-sm text-gray-300">
                  Find hotels, PGs for students (boys & girls), and rooms on rent — fast and reliable.
                </p>
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-400">
              <p>
                Need help? Visit our{' '}
                <a href="/help" className="text-indigo-400 hover:underline">Help Center</a> or{' '}
                <a href="/contact" className="text-indigo-400 hover:underline">Contact Us</a>.
              </p>
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
            <p className="mt-3 text-sm text-gray-300">
              Have questions or want listings for your property? Reach out to us.
            </p>

            <div className="mt-4 text-sm text-gray-300 space-y-2">
              <div>📧 <a href="mailto:info@geturstay.com" className="text-indigo-400 hover:underline">info@geturstay.com</a></div>
              <div>📞 <a href="tel:+911234567890" className="text-indigo-400 hover:underline">+91 12345 67890</a></div>
            </div>

            <form className="mt-4 flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="footer-email" className="sr-only">Email address</label>
              <input
                id="footer-email"
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 rounded-md bg-gray-800 placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700"
              >
                Subscribe
              </button>
            </form>

            <div className="mt-5 flex items-center gap-3 flex-wrap">
              <a href="/facebook" aria-label="facebook" className="p-2 rounded-md bg-gray-800 hover:bg-gray-700">
                {/* Facebook SVG */}
              </a>
              <a href="/instagram" aria-label="instagram" className="p-2 rounded-md bg-gray-800 hover:bg-gray-700">
                {/* Instagram SVG */}
              </a>
              <a href="/twitter" aria-label="twitter" className="p-2 rounded-md bg-gray-800 hover:bg-gray-700">
                {/* Twitter SVG */}
              </a>
            </div>
          </div>
        </div>

        <hr className="my-8 border-gray-800" />

        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 text-sm text-gray-400">
          <div>© {new Date().getFullYear()} GetUrStay — All rights reserved.</div>
          <div className="flex flex-wrap items-center gap-4">
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
