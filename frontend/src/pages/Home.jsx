// App.js
import React from 'react';

function App() {
  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/Hostel_img.jpg')",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Centered content */}
      <div className="relative z-10 flex items-center justify-center h-screen">
        <div className="text-center px-6">
          <h1 className="text-white text-5xl md:text-5xl font-normal mb-6 drop-shadow-lg tracking-wide">
            Welcome to the Hostel Management System
          </h1>
          <p className="text-gray-100 text-xl md:text-1xl mb-10 max-w-2xl mx-auto drop-shadow-sm">
            Your one‑stop solution for managing rooms, students, bookings, and complaints with ease.
          </p>
          <div className="flex justify-center space-x-6">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-xl text-lg font-medium hover:bg-blue-700 transition duration-300 shadow-lg">
              Get Started
            </button>
            <button className="border border-white text-white px-6 py-3 rounded-xl text-lg font-medium hover:bg-white hover:text-gray-900 transition duration-300 shadow-lg">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
