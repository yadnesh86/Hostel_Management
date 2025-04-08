import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Hostel from "./pages/Hostel";

// Student Pages
import UserDashboard from "./pages/student/UserDashboard";
import RoomList from "./pages/student/RoomList";
import AllotmentStatus from "./pages/student/AllotmentStatus";
import StudentProfile from "./pages/student/StudentProfile";
import StudentFees from "./pages/student/StudentFees";
import StudentMaintenance from "./pages/student/StudentMaintenance";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import StudentManagement from "./pages/admin/StudentManagement";
import RoomManagement from "./pages/admin/RoomManagement";
import FeeManagement from "./pages/admin/FeeManagement";
import AdminMaintenance from "./pages/admin/AdminMaintenance";
import AdminProfile from "./pages/admin/AdminProfile";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import UserNavbar from "./components/UserNavbar";
import AdminNavbar from "./components/AdminNavbar"; // ✅ Create this component

const AppWrapper = () => {
  const location = useLocation();
  const path = location.pathname;

  // Define groups of routes
  const publicRoutes = ["/", "/login", "/signup", "/hostel"];
  const studentRoutes = [
    "/student/dashboard",
    "/student/RoomList",
    "/student/AllotmentStatus",
    "/student/profile",
    "/student/fees",
    "/student/maintenance",
  ];
  const adminRoutes = [
    "/admin/dashboard",
    "/admin/students",
    "/admin/rooms",
    "/admin/fees",
    "/admin/maintenance",
    "/admin/profile",
  ];

  // Conditionally show navbars/footers
  const showDefaultNavbar = publicRoutes.includes(path);
  const showUserNavbar = studentRoutes.includes(path);
  const showAdminNavbar = adminRoutes.includes(path);
  const showFooter = publicRoutes.includes(path); // Optional: customize if needed

  return (
    <div className="min-h-screen bg-gray-50">
      {showDefaultNavbar && <Navbar />}
      {showUserNavbar && <UserNavbar />}
      {showAdminNavbar && <AdminNavbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/hostel" element={<Hostel />} />

        {/* Student Dashboard Routes */}
        <Route path="/student/dashboard" element={<UserDashboard />} />
        <Route path="/student/RoomList" element={<RoomList />} />
        <Route path="/student/AllotmentStatus" element={<AllotmentStatus />} />
        <Route path="/student/profile" element={<StudentProfile />} />
        <Route path="/student/fees" element={<StudentFees />} />
        <Route path="/student/maintenance" element={<StudentMaintenance />} />

        {/* Admin Dashboard Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/students" element={<StudentManagement />} />
        <Route path="/admin/rooms" element={<RoomManagement />} />
        <Route path="/admin/fees" element={<FeeManagement />} />
        <Route path="/admin/maintenance" element={<AdminMaintenance />} />
        <Route path="/admin/profile" element={<AdminProfile />} />
      </Routes>

      {showFooter && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
