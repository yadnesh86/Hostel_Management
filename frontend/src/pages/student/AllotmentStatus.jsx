// AllotmentStatus.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const AllotmentStatus = () => {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    axios.get("/api/student/room-status").then((res) => setStatus(res.data));
  }, []);

  if (!status) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Room Allotment Status</h2>
      {status.room_number ? (
        <div className="bg-white p-4 rounded shadow">
          <p><strong>Room Number:</strong> {status.room_number}</p>
          <p><strong>Status:</strong> ✅ Allotted</p>
        </div>
      ) : (
        <p className="text-yellow-600">❗ Room not yet allotted</p>
      )}
    </div>
  );
};

export default AllotmentStatus;
