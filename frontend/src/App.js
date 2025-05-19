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
import AdminHostel from "./pages/admin/AdminHostel";

// Layouts
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MainLayout from "./components/MainLayout";
import AdminLayout from "./components/AdminLayout";

const AppWrapper = () => {
  const location = useLocation();
  const path = location.pathname;

  const publicRoutes = ["/", "/login", "/signup", "/hostel"];
  const showDefaultNavbar = publicRoutes.includes(path);
  const showFooter = publicRoutes.includes(path);

  return (
    <div className="min-h-screen bg-gray-50">
      {showDefaultNavbar && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/hostel" element={<Hostel />} />

        {/* Student Routes under MainLayout */}
        <Route path="/student" element={<MainLayout />}>
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="RoomList" element={<RoomList />} />
          <Route path="AllotmentStatus" element={<AllotmentStatus />} />
          <Route path="profile" element={<StudentProfile />} />
          <Route path="fees" element={<StudentFees />} />
          <Route path="maintenance" element={<StudentMaintenance />} />
        </Route>

        {/* Admin Routes under AdminLayout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="admindashboard" element={<AdminDashboard />} />
          <Route path="adminstudents" element={<StudentManagement />} />
          <Route path="adminrooms" element={<RoomManagement />} />
          <Route path="adminfees" element={<FeeManagement />} />
          <Route path="adminmaintenance" element={<AdminMaintenance />} />
          <Route path="adminhostel" element={<AdminHostel />} />
        </Route>
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
