import React from 'react';
import Common from './Common';
import Navbar from './Navbar';
import LoginNavbar from './LoginNavbar';
import Cookies from 'js-cookie';
import vision from "../src/images/vision.jpeg";

const About = () => {

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
				name='Our Vision @ ' 
				imgsrc={vision} 
				visit='/register' 
				btname='Get Started'
				desc='To provide financial security and promote financial literacy by emphasizing on the importance of saving money'
			/>
		</>
	);
};

export default About;