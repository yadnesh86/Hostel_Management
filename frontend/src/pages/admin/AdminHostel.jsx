import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminHostel = () => {
  const initialFormState = {
    name: '',
    type: 'boys',
    total_rooms: 0,
    address: '',
    warden_name: '',
    contact_number: '',
    facilities: '',
  };

  const [formData, setFormData] = useState(initialFormState);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');
  const [hostels, setHostels] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showAll, setShowAll] = useState(false); // state to control "Load More"

  // Fetch hostels from backend
  const fetchHostels = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/adminhostel');
      setHostels(response.data);
    } catch (error) {
      console.error('Failed to fetch hostels:', error);
      setMessageType('error');
      setMessage('Failed to load hostels.');
    }
  };

  useEffect(() => {
    fetchHostels();
  }, []);

  // Handle changes in the form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClear = () => {
    setFormData(initialFormState);
    setEditingId(null);
    setMessage('');
    setMessageType('success');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.type || !formData.address) {
      setMessageType('error');
      setMessage('Name, type, and address are required.');
      return;
    }

    try {
      if (editingId) {
        await axios.put(`http://localhost:3001/api/adminhostel/${editingId}`, formData);
        setMessageType('success');
        setMessage('Hostel info updated successfully!');
      } else {
        await axios.post('http://localhost:3001/api/adminhostel', formData);
        setMessageType('success');
        setMessage('Hostel info added successfully!');
      }
      handleClear();
      fetchHostels();
    } catch (error) {
      console.error('Error submitting data:', error);
      setMessageType('error');
      setMessage('Failed to submit data.');
    }
  };

  const handleEdit = (hostel) => {
    setFormData({ ...hostel });
    setEditingId(hostel.id);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this hostel?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3001/api/adminhostel/${id}`);
      setMessageType('success');
      setMessage('Hostel deleted successfully!');
      fetchHostels();
    } catch (error) {
      console.error('Delete failed:', error);
      setMessageType('error');
      setMessage('Failed to delete hostel.');
    }
  };

  // Limit displayed hostels if not showing all
  const displayedHostels = showAll ? hostels : hostels.slice(0, 9);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Admin Hostel Management
      </h2>

      {/* Form Section */}
      <div className="flex justify-center mb-8">
        <div className="w-full max-w-lg bg-white border border-gray-200 p-6 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Hostel Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="boys">Boys</option>
              <option value="girls">Girls</option>
              <option value="co-ed">Co-ed</option>
            </select>
            <input
              type="number"
              name="total_rooms"
              placeholder="Total Rooms"
              value={formData.total_rooms}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
            />
            <textarea
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="warden_name"
              placeholder="Warden Name"
              value={formData.warden_name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="contact_number"
              placeholder="Contact Number"
              value={formData.contact_number}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              name="facilities"
              placeholder="Facilities (e.g., WiFi, Mess, Laundry)"
              value={formData.facilities}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded py-2 px-4 transition-colors w-full mr-2"
              >
                {editingId ? 'Update Hostel' : 'Add Hostel'}
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded py-2 px-4 transition-colors w-full ml-2"
              >
                Clear
              </button>
            </div>
            {message && (
              <p className={`text-center mt-2 ${messageType === 'error' ? 'text-red-600' : 'text-green-600'}`}>
                {message}
              </p>
            )}
          </form>
        </div>
      </div>

      {/* Grid View Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {displayedHostels.length ? (
          displayedHostels.map((hostel) => (
            <div
              key={hostel.id}
              className="bg-white border border-gray-200 p-6 rounded-lg shadow-md transition transform hover:scale-105 hover:shadow-xl"
            >
              <h4 className="text-xl font-bold mb-2 text-gray-800">{hostel.name}</h4>
              <p className="text-gray-600"><span className="font-semibold">Type:</span> {hostel.type}</p>
              <p className="text-gray-600"><span className="font-semibold">Rooms:</span> {hostel.total_rooms}</p>
              <p className="text-gray-600"><span className="font-semibold">Address:</span> {hostel.address}</p>
              <p className="text-gray-600"><span className="font-semibold">Warden:</span> {hostel.warden_name}</p>
              <p className="text-gray-600"><span className="font-semibold">Contact:</span> {hostel.contact_number}</p>
              <p className="text-gray-600"><span className="font-semibold">Facilities:</span> {hostel.facilities}</p>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => handleEdit(hostel)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(hostel.id)}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No hostels available.</p>
        )}
      </div>

      {/* Load More Button */}
      {hostels.length > 9 && !showAll && (
        <div className="flex justify-center mt-8">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded"
            onClick={() => setShowAll(true)}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminHostel;
