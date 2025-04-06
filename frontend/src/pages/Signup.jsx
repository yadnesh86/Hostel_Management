import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Only if you're using React Router

export default function Signup() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'student',
  });

  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false); // Track successful signup

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/signup', formData);
      setMessage(res.data.message);
      setFormData({ fullName: '', email: '', password: '', role: 'student' }); // Reset form
      setSuccess(true); // Trigger success message and link
    } catch (err) {
      setMessage(err.response?.data?.message || 'Signup failed');
      setSuccess(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-blue-100 to-purple-200"
    style={{
      fontFamily: "'Poppins', sans-serif",
    }}
    >
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-semibold mb-6 text-center text-blue-700">SignUp</h2>
        
        {message && (
          <div className={`mb-4 text-center text-sm ${success ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="fullName" className="block mb-1 font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1 font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
            Sign Up
          </button>
        </form>

        
          <div className="mt-4 text-center">
            {/* You can change the path to your actual login or dashboard route */}
            <Link to="/login" className="text-blue-600 hover:underline">
              Already have an account? Login here
            </Link>
          </div>
        
      </div>
    </div>
  );
}
