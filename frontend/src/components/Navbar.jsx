import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-700 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between"
      style={{
        fontFamily: "'Poppins', sans-serif",
      }}
      >
        <h1 className="text-2xl font-normal flex items-center gap-3">
           <span>Hostel Management System</span>
        </h1>
        <div className="space-x-6 text-base">
          <Link to="/" className="hover:text-yellow-300 transition-colors duration-200">
            Home
          </Link>
          <Link to="/hostel" className="hover:text-yellow-300 transition-colors duration-200">
            Hostel
          </Link>
          <Link to="/student/dashboard" className="hover:text-yellow-300 transition-colors duration-200">
            User Dashboard
          </Link>
          <Link to="/admin/dashboard" className="hover:text-yellow-300 transition-colors duration-200">
            Admin Dashboard
          </Link>
          <Link to="/login" className="hover:text-yellow-300 transition-colors duration-200">
            Login
          </Link>
          <Link to="/signup" className="hover:text-yellow-300 transition-colors duration-200">
            Signup
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
