import React from 'react';

const Register = () => {
	return (
		<>
			<div class="wrapper">
			  <div class="container">
			    <h1 className="whitetext">Welcome</h1>
			    
			    <form class="loginform">
			      <input type="text" placeholder="First Name" />
			      <input type="text" placeholder="Last Name" />
			      <input type="email" placeholder="Email Address" />
			      <input type="password" placeholder="Password" />
			      <button type="submit" id="login-button">Get Started</button>
			    </form>
			  </div>
			  
			  <ul class="bg-bubbles">
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

export default Register;