import React from 'react';
import Common from './Common';
import invest from "../src/images/invest.png";

const Invest = () => {
	return (
		<>  
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