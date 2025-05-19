import { useState, useEffect } from "react";

const AllotmentStatus = () => {
  // Fake data: change this object to simulate different scenarios.
  // For a successful allotment, provide a room number. For pending allotment, leave the object empty.
  const fakeData = { room_number: "A101" };
  // const fakeData = {}; // Uncomment this line to simulate a pending allotment.

  const [status, setStatus] = useState(null);

  useEffect(() => {
    // Simulate fetching fake data asynchronously with a delay
    const timer = setTimeout(() => {
      setStatus(fakeData);
    }, 1000); // 1 second delay

    return () => clearTimeout(timer);
  }, []);

  if (!status) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Room Allotment Status</h2>
      {status.room_number ? (
        <div className="bg-white p-4 rounded shadow">
          <p>
            <strong>Room Number:</strong> {status.room_number}
          </p>
          <p>
            <strong>Status:</strong> ✅ Allotted
          </p>
        </div>
      ) : (
        <p className="text-yellow-600">❗ Room not yet allotted</p>
      )}
    </div>
  );
};

export default AllotmentStatus;
