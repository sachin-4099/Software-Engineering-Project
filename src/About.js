import React from 'react';
import Common from './Common';
import vision from "../src/images/vision.jpeg";

const About = () => {
	return (
		<>
			<Common
				name='Our Vision @ ' 
				imgsrc={vision} 
				visit='/contact' 
				btname='Contact Us'
				desc='To provide financial security and promote financial literacy by emphasizing on the importance of saving money'
			/>
		</>
	);
};

export default About;