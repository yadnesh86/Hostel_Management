// Footer.js (or inside App.js if you're not using separate components)
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-5 mt-auto">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Hostel Management System. All rights reserved.</p>
        <div className="flex space-x-4 mt-2 md:mt-0">
          {/* <a href="#" className="hover:underline hover:text-blue-400 transition">Privacy Policy</a>
          <a href="#" className="hover:underline hover:text-blue-400 transition">Terms</a>
          <a href="#" className="hover:underline hover:text-blue-400 transition">Contact</a> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
