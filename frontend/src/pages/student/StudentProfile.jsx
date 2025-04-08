import { useEffect, useState } from "react";
import axios from "axios";

const StudentProfile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios.get("/api/student/profile").then((res) => setProfile(res.data));
  }, []);

  if (!profile) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">My Profile</h2>
      <div className="bg-white p-4 rounded shadow">
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Roll Number:</strong> {profile.roll_number}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Emergency Contact:</strong> {profile.emergency_contact}</p>
        <p><strong>Room Number:</strong> {profile.room_number}</p>
      </div>
    </div>
  );
};

export default StudentProfile;
