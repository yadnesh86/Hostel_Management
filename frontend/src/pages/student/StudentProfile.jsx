import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function StudentProfile() {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    roll_number: '',
    emergency_contact: '',
    address: ''
  });
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/student/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setProfile({
          name: res.data.name,
          email: res.data.email,
          roll_number: res.data.roll_number || '',
          emergency_contact: res.data.emergency_contact || '',
          address: res.data.address || ''
        });
      } catch (err) {
        setMessage(err.response?.data?.message || 'Error fetching profile.');
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const res = await axios.post(
        'http://localhost:3001/api/student/profile',
        {
          roll_number: profile.roll_number,
          emergency_contact: profile.emergency_contact,
          address: profile.address
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      setMessage(res.data.message);
      setIsEditing(false);

      // ✅ Reload page after short delay (optional)
    setTimeout(() => {
      window.location.reload();
    }, 500); // 500ms delay to show message before reloa
    } catch (err) {
      setMessage(err.response?.data?.message || 'Update failed.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">My Profile</h2>
      {message && (
        <p className="mb-6 text-center text-sm text-red-600 bg-red-100 border border-red-300 p-2 rounded">
          {message}
        </p>
      )}

      <div className="mb-6 text-gray-700">
        <p className="mb-2"><span className="font-semibold">Name:</span> {profile.name}</p>
        <p><span className="font-semibold">Email:</span> {profile.email}</p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block mb-2 font-medium text-gray-700">Roll Number</label>
          <input
            type="text"
            name="roll_number"
            value={profile.roll_number}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">Emergency Contact</label>
          <input
            type="text"
            name="emergency_contact"
            value={profile.emergency_contact}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            value={profile.address}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100"
          />
        </div>

        <div className="pt-4 text-center">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-gray-700 text-white font-medium py-2 px-6 rounded-lg hover:bg-gray-800 transition duration-200"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
