import "./Navbar.css";
import { NavLink } from 'react-router-dom';
import avatar from "../../assets/avatar.svg";

const Navbar = ({ sidebarOpen, openSidebar }) => {
  return (
    <nav className="navbar_dashboard">
      <div className="nav_icon" onClick={() => openSidebar()}>
        <i className="fa fa-bars" aria-hidden="true"></i>
      </div>
      <div className="navbar__left">
        <NavLink 
          activeClassName="active_link" 
          to="/userdashboard"
        >
          User
        </NavLink>        
        <NavLink 
          activeClassName="active_link" 
          to="/expenditure"
        >
          Expenditures
        </NavLink>
        <NavLink 
          activeClassName="active_link" 
          to="/saving"
        >
          Savings
        </NavLink>
        <NavLink 
          activeClassName="active_link" 
          to="/query"
        >
          Queries
        </NavLink>
        <NavLink 
          activeClassName="active_link" 
          to="/transactionhistory"
        >
          Transaction History
        </NavLink> 
        <NavLink 
          activeClassName="active_link" 
          to="/setting"
        >
          Settings
        </NavLink>        
      </div>
      <div className="navbar__right">
        {/*<a href="#">
          <i className="fa fa-search" aria-hidden="true"></i>
        </a>
        <a href="#">
          <i className="fa fa-clock-o" aria-hidden="true"></i>
        </a>*/}
        <a href="#!">
          <img width="30" src={avatar} alt="avatar" />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;