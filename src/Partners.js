import React from 'react';
import Card from './Card';
import Navbar from './Navbar';
import LoginNavbar from './LoginNavbar';
import Cookies from 'js-cookie';
import Sdata from './Sdata';

const Partners = () => {

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
			<div className="my-5">
				<h1 className="text-center"> Our Partners </h1>
			</div>
            <div className="container-fluid mb-5">
				<div className='row'>
				    <div className="col-10 mx-auto">
 					    <div className="row gy-4">
	                        {
	                        	Sdata.map((val, ind) => {
	                        		return <Card key={ind}
		                        		imgsrc={val.imgsrc}
		                        		title={val.title}
                                    />
	                        	})
	                        }    
					    </div>
				    </div>
                </div>
            </div>
		</>
	);
};

export default Partners;