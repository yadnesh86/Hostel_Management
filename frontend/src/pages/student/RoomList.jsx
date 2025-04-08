// RoomList.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const RoomList = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios.get("/api/rooms").then(res => setRooms(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Hostel Room List</h2>
      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr>
            <th className="p-2">Room Number</th>
            <th className="p-2">Capacity</th>
            <th className="p-2">Occupants</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.id} className="border-t">
              <td className="p-2">{room.room_number}</td>
              <td className="p-2">{room.capacity}</td>
              <td className="p-2">{room.current_occupants}</td>
              <td className={`p-2 capitalize ${room.status === 'available' ? 'text-green-600' : 'text-red-600'}`}>
                {room.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoomList;
