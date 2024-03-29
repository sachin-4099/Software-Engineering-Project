import React from 'react';
import web from "../src/images/piggybank.jpg";
import { NavLink } from 'react-router-dom';

const LoginNavbar = () => {
	return (
		<>
		    <div className="container-fluid nav_bg">
			    <div className='row'>
				    <div className="col-10 mx-auto">
							<nav className="navbar navbar-expand-lg navbar-light">
							    <div className="container-fluid">
								  <NavLink className="navbar-brand" to="/">
									  <img src={web} className="img-fluid animated" alt="Common img" width="40px" height="40px" />
								  </NavLink>
								  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
								    <span className="navbar-toggler-icon"></span>
								  </button>
								  <div className="collapse navbar-collapse" id="navbarSupportedContent">
								    <ul className="navbar-nav mr-auto mb-2 mb-lg-0">
								      <li className="nav-item">
								        <NavLink 
									        activeClassName="menu_active" 
									        exact 
									        className="nav-link" 
									        to="/"
								        >
									        Home 
								        </NavLink>
								      </li>
								      <li className="nav-item">
								        <NavLink 
									        activeClassName="menu_active" 
									        className="nav-link" 
									        to="/partners"
								        >
									        Partners
								        </NavLink>
								      </li>
		  						      <li className="nav-item">
								        <NavLink 
									        activeClassName="menu_active" 
									        className="nav-link" 
									        to="/invest"
								        >
									        Invest
								        </NavLink>
								      </li>								      
		  						      <li className="nav-item">
								        <NavLink 
									        activeClassName="menu_active" 
									        className="nav-link" 
									        to="/about"
								        >
									        About Us
								        </NavLink>
								      </li>
		  						      <li className="nav-item">
								        <NavLink 
									        activeClassName="menu_active" 
									        className="nav-link" 
									        to="/blog"
								        >
									        Blog
								        </NavLink>
								      </li>								      
		  						      <li className="nav-item">
								        <NavLink 
									        activeClassName="menu_active" 
									        className="nav-link" 
									        to="/contact"
								        >
									        Contact Us
								        </NavLink>
								      </li>
  		  						      <li className="nav-item">
								        <NavLink 
									        activeClassName="menu_active" 
									        className="nav-link" 
									        to="/paymentcontacts"
								        >
									        Payment Contacts
								        </NavLink>
								      </li>
		  						      <li className="nav-item">
								        <NavLink 
									        activeClassName="menu_active" 
									        className="nav-link" 
									        to="/paymentmerchants"
								        >
									        Payment Merchants
								        </NavLink>
								      </li>
								    </ul>
								    <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
								      <li className="nav-item">
								        <NavLink 
									        activeClassName="menu_active" 
									        exact 
									        className="nav-link" 
									        to="/userdashboard"
								        >
									        User Dashboard 
								        </NavLink>
								      </li>
							        </ul>
								  </div>
						    </div>
						</nav>
				    </div>
				</div>
			</div>
		</>
	);
};

export default LoginNavbar;
