import { useEffect, useState } from "react";
import axios from "axios";

const UserDashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      const res = await axios.get("/api/student/dashboard");
      setData(res.data);
    };
    fetchDashboard();
  }, []);

  if (!data) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Welcome, {data.name} 👋</h2>
      <div className="border p-4 rounded bg-white shadow">
        <p><strong>Roll Number:</strong> {data.roll_number}</p>
        <p><strong>Room:</strong> {data.room_number}</p>
      </div>
    </div>
  );
};

export default UserDashboard;
