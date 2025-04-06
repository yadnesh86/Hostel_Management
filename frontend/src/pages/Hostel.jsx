import React from 'react';

const hostels = [
  {
    name: "Block A - Boys Hostel",
    type: "Boys",
    rooms: "120",
    available: "18",
    facilities: ["Wi-Fi", "Mess", "Laundry"],
    image: "/hostel1.jpg",
  },
  {
    name: "Block B - Girls Hostel",
    type: "Girls",
    rooms: "100",
    available: "10",
    facilities: ["Wi-Fi", "AC", "CCTV"],
    image: "/hostel2.jpg",
  },
  {
    name: "Block C - Co-ed",
    type: "Co-ed",
    rooms: "150",
    available: "35",
    facilities: ["Wi-Fi", "Laundry", "Gym"],
    image: "/hostel3.jpg",
  },
];

const HostelPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-normal text-center mb-8">Our Hostels</h2>

      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {hostels.map((hostel, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <img
              src={hostel.image}
              alt={hostel.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h3 className="text-xl font-semibold mb-2">{hostel.name}</h3>
              <p className="text-sm text-gray-600 mb-1">Type: {hostel.type}</p>
              <p className="text-sm text-gray-600 mb-1">
                Rooms: {hostel.rooms} | Available: {hostel.available}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                Facilities: {hostel.facilities.join(', ')}
              </p>
              <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HostelPage;
