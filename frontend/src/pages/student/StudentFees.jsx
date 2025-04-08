import { useEffect, useState } from "react";
import axios from "axios";

const StudentFees = () => {
  const [fees, setFees] = useState([]);

  useEffect(() => {
    axios.get("/api/student/fees").then((res) => setFees(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Fees</h2>
      <table className="min-w-full bg-white shadow rounded overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Amount</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Due Date</th>
            <th className="p-2 text-left">Paid On</th>
          </tr>
        </thead>
        <tbody>
          {fees.map((fee) => (
            <tr key={fee.id} className="border-t">
              <td className="p-2">₹{fee.amount}</td>
              <td className="p-2 capitalize">{fee.status}</td>
              <td className="p-2">{fee.due_date}</td>
              <td className="p-2">{fee.paid_on || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentFees;
