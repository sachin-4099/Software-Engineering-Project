import "./Sidebar.css";
import { NavLink } from 'react-router-dom';
import logo from "../../assets/logo.png";

const Sidebar = ({ sidebarOpen, closeSidebar }) => {
  return (
    <div className={sidebarOpen ? "sidebar_responsive" : ""} id="sidebar">
      <div className="sidebar__title">
        <div className="sidebar__img">
          <img src={logo} alt="logo"/>

        </div>
        <i
          onClick={() => closeSidebar()}
          className="fa fa-times"
          id="sidebarIcon"
          aria-hidden="true"
        ></i>
      </div>

      <div className="sidebar__menu">
        <div className="sidebar__link">
          <i className="fa fa-home">
          <NavLink 
            activeClassName="sidebar__link active_menu_link" 
            className="sidebar__link" 
            to="/userdashboard"
          >
            Dashboard 
          </NavLink>
          </i>
        </div>


        {/*<div className="sidebar__link">
          <i className="fa fa-user-secret" aria-hidden="true"></i>
          <a href="#">Admin Management</a>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-building-o"></i>
          <a href="#">Company Management</a>
        </div>*/}
        <div className="sidebar__link">
          <i className="fa fa-money">
          <NavLink 
            activeClassName="sidebar__link active_menu_link" 
            className="sidebar__link" 
            to="/expenditure"
          >
            Expenditures 
          </NavLink>
          </i>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-briefcase">
          <NavLink 
            activeClassName="sidebar__link active_menu_link" 
            className="sidebar__link" 
            to="/saving"
          >
            Savings
          </NavLink>
          </i>
        </div>
        {/*<div className="sidebar__link">
          <i className="fa fa-archive">
          <NavLink 
            activeClassName="sidebar__link active_menu_link" 
            className="sidebar__link" 
            to="#"
          >
            Investments
          </NavLink>
          </i>
        </div>*/}
        <div className="sidebar__link">
          <i className="fa fa-question">
          <NavLink 
            activeClassName="sidebar__link active_menu_link" 
            className="sidebar__link" 
            to="/query"
          >
            Queries
          </NavLink>
          </i>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-history">
          <NavLink 
            activeClassName="sidebar__link active_menu_link" 
            className="sidebar__link" 
            to="/transactionhistory"
          >
            Transaction History
          </NavLink>
          </i>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-wrench">
          <NavLink 
            activeClassName="sidebar__link active_menu_link" 
            className="sidebar__link" 
            to="/setting"
          >
            Settings
          </NavLink>
          </i>
        </div>
        {/*<h2>LEAVE</h2>
        <div className="sidebar__link">
          <i className="fa fa-question"></i>
          <a href="#">Requests</a>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-sign-out"></i>
          <a href="#">Leave Policy</a>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-calendar-check-o"></i>
          <a href="#">Special Days</a>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-files-o"></i>
          <a href="#">Apply for leave</a>
        </div>
        <h2>PAYROLL</h2>
        <div className="sidebar__link">
          <i className="fa fa-money"></i>
          <a href="#">Payroll</a>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-briefcase"></i>
          <a href="#">Paygrade</a>
        </div>*/}
        <div className="sidebar__logout">
          <i className="fa fa-power-off"></i>
          <a href="/">Log out</a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;