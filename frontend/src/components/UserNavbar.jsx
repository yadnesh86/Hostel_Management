import { Link } from "react-router-dom";

const UserNavbar = () => {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow">
      <h1 className="text-xl font-bold">Student Dashboard</h1>
      <ul className="flex space-x-6 text-sm font-medium">
        <li>
          <Link to="/student/dashboard" className="hover:underline">Dashboard</Link>
        </li>
        <li>
          <Link to="/student/RoomList" className="hover:underline">Rooms</Link>
        </li>
        <li>
          <Link to="/student/AllotmentStatus" className="hover:underline">Allotment Status</Link>
        </li>
        <li>
          <Link to="/student/fees" className="hover:underline">Fees</Link>
        </li>
        <li>
          <Link to="/student/maintenance" className="hover:underline">Maintenance</Link>
        </li>
        <li>
          <Link to="/student/profile" className="hover:underline">Profile</Link>
        </li>
        <li>
          <Link to="/login" className="hover:underline text-red-200">Logout</Link>
        </li>
      </ul>
    </nav>
  );
};

export default UserNavbar;
