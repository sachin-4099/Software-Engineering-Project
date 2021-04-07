import React from 'react';
import Common from './Common';
import Navbar from './Navbar';
import Cookies from 'js-cookie';
import LoginNavbar from './LoginNavbar';
import web from "../src/images/gullak.png";


const Home = () => {
	
	var navChoice;

	if (Cookies.get("user")) { 
		navChoice = <LoginNavbar />;
	}
	else {
		navChoice = <Navbar />;
	}	

	return (
		<>
		    {navChoice}
			<Common  
				name='Grow your money with' 
				imgsrc={web} 
				visit='/register' 
				btname='Get Started'
				desc='To help you save money with every transaction without any hassle'
			/>
		</>
	);
};

export default Home;