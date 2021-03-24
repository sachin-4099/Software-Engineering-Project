import React from 'react';
import Common from './Common';
import Navbar from './Navbar';
import LoginNavbar from './LoginNavbar';
import vision from "../src/images/vision.jpeg";

const About = () => {

	var navChoice;

	if (global.config.i18n.state.login === 1) { 
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