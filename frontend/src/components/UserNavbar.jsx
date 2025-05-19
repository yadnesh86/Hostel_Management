import { Link } from "react-router-dom";

const UserNavbar = () => {
  return (
    <nav className="min-h-screen w-64 bg-blue-700 text-white flex flex-col px-6 py-8 shadow-lg"
    style={{
      fontFamily: "'Poppins', sans-serif",
    }}
    >
      <h1 className="text-2xl font-semibold mb-10 text-center">Student Portal</h1>
      <ul className="flex flex-col space-y-6 text-base font-medium">
        <li>
          <Link to="/student/dashboard" className="hover:bg-blue-600 rounded px-3 py-2 block">Dashboard</Link>
        </li>
        <li>
          <Link to="/student/RoomList" className="hover:bg-blue-600 rounded px-3 py-2 block">Rooms</Link>
        </li>
        <li>
          <Link to="/student/AllotmentStatus" className="hover:bg-blue-600 rounded px-3 py-2 block">Allotment Status</Link>
        </li>
        <li>
          <Link to="/student/fees" className="hover:bg-blue-600 rounded px-3 py-2 block">Fees</Link>
        </li>
        <li>
          <Link to="/student/maintenance" className="hover:bg-blue-600 rounded px-3 py-2 block">Complaint</Link>
        </li>
        <li>
          <Link to="/student/profile" className="hover:bg-blue-600 rounded px-3 py-2 block">Profile</Link>
        </li>
        <li className="mt-auto">
          <Link to="/login" className="hover:bg-red-600 text-red-200 rounded px-3 py-2 block">Logout</Link>
        </li>
      </ul>
    </nav>
  );
};

export default UserNavbar;
