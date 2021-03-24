import { useState } from "react";
import "./UserDashboard.css";
import SettingData from "./dashboardcomponents/main/SettingData";
import Navbar from "./dashboardcomponents/navbar/Navbar";
import Sidebar from "./dashboardcomponents/sidebar/Sidebar";

const Setting = () => {
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
      <SettingData />
      <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
    </div>
  );
};

export default Setting;