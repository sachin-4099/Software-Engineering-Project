import React from 'react';
import Common from './Common';
import Navbar from './Navbar';
import web from "../src/images/gullak.png";

const Home = () => {
	return (
		<>
		    <Navbar />
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