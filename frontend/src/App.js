import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import User_Dashboard from "./pages/User_Dashboard";
import Rooms from "./pages/Rooms";
import Hostel from "./pages/Hostel";
import Navbar from "./components/Navbar";
import Footer from './components/Footer';
// import Chatbot from "./components/Chatbot";


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        {/* <Chatbot /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/hostel" element={<Hostel />} />
          <Route path="/user_dashboard" element={<User_Dashboard />} />
          <Route path="/rooms" element={<Rooms />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}



export default App;
