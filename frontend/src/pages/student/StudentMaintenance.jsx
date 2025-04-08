import { useEffect, useState } from "react";
import axios from "axios";

const StudentMaintenance = () => {
  const [requests, setRequests] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    axios.get("/api/student/maintenance").then((res) => setRequests(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/student/maintenance", { title, description: desc });
    setTitle("");
    setDesc("");
    const updated = await axios.get("/api/student/maintenance");
    setRequests(updated.data);
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Maintenance Requests</h2>

      <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded space-y-2">
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          className="w-full p-2 border rounded"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Submit Request
        </button>
      </form>

      <div className="space-y-4">
        {requests.map((r) => (
          <div key={r.id} className="p-4 border rounded bg-white shadow">
            <p className="font-semibold">{r.title}</p>
            <p className="text-sm text-gray-600">{r.description}</p>
            <p className={`text-sm mt-1 ${r.status === 'resolved' ? 'text-green-600' : 'text-yellow-600'}`}>
              Status: {r.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentMaintenance;
