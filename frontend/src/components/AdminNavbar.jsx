import { Link } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <nav
      className="min-h-screen w-64 bg-red-700 text-white flex flex-col px-6 py-8 shadow-lg"
      style={{
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <h1 className="text-2xl font-semibold mb-10 text-center">Admin Panel</h1>
      <ul className="flex flex-col space-y-6 text-base font-medium">
        <li>
          <Link to="/admin/admindashboard" className="hover:bg-red-600 rounded px-3 py-2 block">Dashboard</Link>
        </li>
        <li>
          <Link to="/admin/adminstudents" className="hover:bg-red-600 rounded px-3 py-2 block">Students</Link>
        </li>
        <li>
          <Link to="/admin/adminhostel" className="hover:bg-red-600 rounded px-3 py-2 block">Hostel</Link>
        </li>
        <li>
          <Link to="/admin/adminrooms" className="hover:bg-red-600 rounded px-3 py-2 block">Rooms</Link>
        </li>
        <li>
          <Link to="/admin/adminfees" className="hover:bg-red-600 rounded px-3 py-2 block">Fees</Link>
        </li>
        <li>
          <Link to="/admin/adminmaintenance" className="hover:bg-red-600 rounded px-3 py-2 block">Maintenance</Link>
        </li>
        <li className="mt-auto">
          <Link to="/login" className="hover:bg-red-800 text-yellow-200 rounded px-3 py-2 block">Logout</Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
