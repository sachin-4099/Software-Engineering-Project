import React from 'react';
import Common from './Common';
import Navbar from './Navbar';
import LoginNavbar from './LoginNavbar';
import invest from "../src/images/invest.png";

const Invest = () => {
	
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
				name='Invest using ' 
				imgsrc={invest} 
				visit='/register' 
				btname='Get Started'
				desc="Our mission is to look after the financial best interests of the up-and-coming, beginning with the empowering step of micro-investing"
			/>
		</>

	);
};

export default Invest;