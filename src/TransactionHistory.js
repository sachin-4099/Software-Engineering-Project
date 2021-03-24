import { useState } from "react";
import "./UserDashboard.css";
import TransactionHistoryData from "./dashboardcomponents/main/TransactionHistoryData";
import Navbar from "./dashboardcomponents/navbar/Navbar";
import Sidebar from "./dashboardcomponents/sidebar/Sidebar";

const TransactionHistory = () => {
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
      <TransactionHistoryData />
      <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
    </div>
  );
};

export default TransactionHistory;