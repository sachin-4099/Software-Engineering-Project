import React from 'react';
import Common from './Common';
import { useState, useEffect } from 'react';
import web from "../src/images/gullak.png";

const Home = () => {
	const [testVar, setTestVar] = useState("ping");
	useEffect(() => {
		fetch('/ping').then(res => res.json()).then(data => {
		  setTestVar(data.reply);
		});
	  }, []);
	return (
		<>
			<Common  name='Grow your money with' imgsrc={web} visit='/services' btname='Get Started'/>
			<h>
				Test API {testVar}
			</h>
		</>
	);
};

export default Home;