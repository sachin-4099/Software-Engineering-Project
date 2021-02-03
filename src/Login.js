import React from 'react';

const Login = () => {
	return (
		<>
			<div className="wrapper">
			  <div className="container">
			    <h1 className="whitetext">Login to Gullak</h1>
			    
			    <form className="loginform">
			      <input type="text" placeholder="Username" />
			      <input type="password" placeholder="Password" />
			      <button type="submit" id="login-button">Login</button>
			    </form>
			  </div>
			  
			  <ul className="bg-bubbles">
			    <li></li>
			    <li></li>
			    <li></li>
			    <li></li>
			    <li></li>
			    <li></li>
			    <li></li>
			    <li></li>
			    <li></li>
			    <li></li>
			  </ul>
			</div>
		</>

	);
};

export default Login;