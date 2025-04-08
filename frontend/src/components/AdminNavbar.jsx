import { Link } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <nav className="bg-red-600 text-white px-6 py-4 flex justify-between items-center shadow">
      <h1 className="text-xl font-bold">Admin Panel</h1>
      <ul className="flex space-x-6 text-sm font-medium">
        <li>
          <Link to="/admin/dashboard" className="hover:underline">Dashboard</Link>
        </li>
        <li>
          <Link to="/admin/students" className="hover:underline">Students</Link>
        </li>
        <li>
          <Link to="/admin/rooms" className="hover:underline">Rooms</Link>
        </li>
        <li>
          <Link to="/admin/fees" className="hover:underline">Fees</Link>
        </li>
        <li>
          <Link to="/admin/maintenance" className="hover:underline">Maintenance</Link>
        </li>
        <li>
          <Link to="/admin/profile" className="hover:underline">Profile</Link>
        </li>
        <li>
          <Link to="/login" className="hover:underline text-yellow-200">Logout</Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
