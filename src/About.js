import React from 'react';
import Common from './Common';
import web from "../src/images/gullak.jpg";

const About = () => {
	return (
		<>
			<Common  name='Welcome to About Page' imgsrc={web} visit='/contact' btname='Contact Us'/>
		</>
	);
};

export default About;