import { useState } from "react";
import "./UserDashboard.css";
import ExpenditureData from "./dashboardcomponents/main/ExpenditureData";
import Navbar from "./dashboardcomponents/navbar/Navbar";
import Sidebar from "./dashboardcomponents/sidebar/Sidebar";

const Expenditure = () => {
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
      <ExpenditureData />
      <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
    </div>
  );
};

export default Expenditure;