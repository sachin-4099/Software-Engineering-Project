import { useState } from "react";
import "./UserDashboard.css";
import QueryData from "./dashboardcomponents/main/QueryData";
import Navbar from "./dashboardcomponents/navbar/Navbar";
import Sidebar from "./dashboardcomponents/sidebar/Sidebar";

const Query = () => {
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
      <QueryData />
      <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
    </div>
  );
};

export default Query;