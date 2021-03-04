import { useState } from "react";
import "./UserDashboard.css";
import Main from "./dashboardcomponents/main/Main";
import Navbar from "./dashboardcomponents/navbar/Navbar";
import Sidebar from "./dashboardcomponents/sidebar/Sidebar";

const UserDashboard = () => {
  const [sidebarOpen, setsidebarOpen] = useState(false);
  const openSidebar = () => {
    setsidebarOpen(true);
  };
  const closeSidebar = () => {
    setsidebarOpen(false);
  };
  return (
    <div className="container_dashboard">
      <Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
      <Main />
      <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
    </div>
  );
};

export default UserDashboard;