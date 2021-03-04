import React from 'react';
import Common from './Common';
import Navbar from './Navbar';
import vision from "../src/images/vision.jpeg";

const About = () => {
	return (
		<>
		    <Navbar />
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