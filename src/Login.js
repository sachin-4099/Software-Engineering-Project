import React from 'react';
import "./style.css"
const Login = () => {
	return (
		<>
			<div class="wrapper">
			  <div class="container">
			    <h1>Welcome</h1>
			    
			    <form class="form">
			      <input type="text" placeholder="Username" />
			      <input type="password" placeholder="Password" />
			      <button type="submit" id="login-button">Login</button>
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

export default Login;