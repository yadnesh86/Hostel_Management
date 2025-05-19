import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function RoomList() {
  const [hostels, setHostels] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selectedHostel, setSelectedHostel] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [applicationStatus, setApplicationStatus] = useState('');
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
  name: '',
  email: '',
  mobile: '',
  gender: '',
  dob: '',
  address: '',
  college_name: '',
  university: '',
  course: '',
  year: '',
  tenth_percent: '',
  twelfth_percent: '',
  other_qualification: '',
});


  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/hostels', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setHostels(res.data);
      } catch (err) {
        console.error(err);
        setMessage('Failed to fetch hostels.');
      }
    };

    fetchHostels();
  }, []);

  const fetchRooms = async (hostelId) => {
    try {
      const res = await axios.get(`http://localhost:3001/api/rooms/${hostelId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setRooms(res.data);
    } catch (err) {
      console.error(err);
      setMessage('Failed to fetch rooms.');
    }
  };

  const handleHostelChange = (e) => {
    const id = e.target.value;
    setSelectedHostel(id);
    setSelectedRoom('');
    setRooms([]);
    fetchRooms(id);
  };

  const handleRoomChange = (e) => {
    setSelectedRoom(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleApply = async () => {
    if (!selectedHostel || !selectedRoom) {
      setMessage('Please select a hostel and room.');
      return;
    }

    try {
      const res = await axios.post(
        'http://localhost:3001/api/apply',
        {
          hostel_id: selectedHostel,
          room_id: selectedRoom,
          ...formData
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      setApplicationStatus('success');
      setMessage(res.data.message || 'Application submitted successfully.');
    } catch (err) {
      setApplicationStatus('error');
      setMessage(err.response?.data?.message || 'Failed to submit application.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Apply for Hostel Room</h2>

      {message && (
        <p
          className={`text-center p-3 mb-6 rounded ${
            applicationStatus === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {message}
        </p>
      )}

      {/* Hostel Selection */}
      <div className="mb-6">
        <label className="block mb-2 font-medium text-gray-700">Select Hostel</label>
        <select
          value={selectedHostel}
          onChange={handleHostelChange}
          className="w-full p-3 border border-gray-300 rounded-lg"
        >
          <option value="">-- Choose Hostel --</option>
          {hostels.map((hostel) => (
            <option key={hostel.id} value={hostel.id}>
              {hostel.name}
            </option>
          ))}
        </select>
      </div>

      {/* Room Selection */}
      {rooms.length > 0 && (
        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-700">Select Room</label>
          <select
            value={selectedRoom}
            onChange={handleRoomChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
          >
            <option value="">-- Choose Room --</option>
            {rooms.map((room) => (
              <option key={room.id} value={room.id}>
                Room {room.room_number} ({room.beds_available} beds left)
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Application Form */}
      {selectedHostel && selectedRoom && (
        <div className="grid grid-cols-1 gap-4 mb-6">
          {[
            { label: 'Name', name: 'name' },
            { label: 'Email', name: 'email' },
            { label: 'Mobile', name: 'mobile' },
            { label: 'Gender', name: 'gender', type: 'select', options: ['male', 'female', 'other'] },
            { label: 'Date of Birth', name: 'dob', type: 'date' },
            { label: 'Address', name: 'address', type: 'textarea' },
            { label: 'College Name', name: 'college_name' },
            { label: 'University', name: 'university' },
            { label: 'Course', name: 'course' },
            { label: 'Year', name: 'year' },
            { label: '10th Percent', name: 'tenth_percent' },
            { label: '12th Percent', name: 'twelfth_percent' },
            { label: 'Other Qualification', name: 'other_qualification' }
          ].map((field) => (
            <div key={field.name}>
              <label className="block mb-1 text-sm font-medium text-gray-700">{field.label}</label>
              {field.type === 'textarea' ? (
                <textarea
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              ) : field.type === 'select' ? (
                <select
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">-- Select Gender --</option>
                  {field.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type || 'text'}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Submit */}
      {selectedHostel && selectedRoom && (
        <div className="text-center">
          <button
            onClick={handleApply}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg transition duration-200"
          >
            Submit Application
          </button>
        </div>
      )}
    </div>
  );
}
