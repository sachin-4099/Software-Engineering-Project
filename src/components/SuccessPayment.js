import React from 'react';
import Navbar from '../Navbar';
import LoginNavbar from '../LoginNavbar';

const SuccessPayment = () => {

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
			<div className="my-5">
				<h1 className="text-center"> Payment Successful </h1>
			</div>
		</>
	);
};

export default SuccessPayment;