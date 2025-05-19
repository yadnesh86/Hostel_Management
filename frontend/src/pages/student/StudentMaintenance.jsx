import { useState } from "react";

const StudentMaintenance = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      title: "Leaking tap",
      description: "The bathroom tap is constantly leaking.",
      status: "pending",
    },
    {
      id: 2,
      title: "Broken fan",
      description: "The ceiling fan in Room 204 isn't working.",
      status: "resolved",
    },
  ]);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRequest = {
      id: Date.now(),
      title,
      description: desc,
      status: "pending",
    };
    setRequests([newRequest, ...requests]);
    setTitle("");
    setDesc("");
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto space-y-8">
        <h2 className="text-3xl font-bold text-blue-700">Maintenance Requests</h2>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow space-y-4 border"
        >
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              placeholder="Short title for your request"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              placeholder="Explain the issue in detail"
              className="w-full p-3 border border-gray-300 rounded-lg resize-none h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold"
          >
            Submit Request
          </button>
        </form>

        {/* Request List */}
        <div className="space-y-4">
          {requests.map((r) => (
            <div
              key={r.id}
              className="bg-white p-5 border-l-4 rounded-lg shadow-sm border-blue-500"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-gray-800">{r.title}</h3>
                <span
                  className={`text-xs font-bold uppercase px-3 py-1 rounded-full ${
                    r.status === "resolved"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {r.status}
                </span>
              </div>
              <p className="text-gray-600">{r.description}</p>
            </div>
          ))}
          {requests.length === 0 && (
            <p className="text-center text-gray-500">No maintenance requests yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentMaintenance;
