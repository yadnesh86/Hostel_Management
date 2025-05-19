import { Outlet } from "react-router-dom";
import UserNavbar from "./UserNavbar";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen">
      <UserNavbar />
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
