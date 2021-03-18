import React from 'react';
import { useLocation } from "react-router-dom";
import Navbar from '../Navbar';

const FinalPaymentMerchant = () => {



    const formSubmit = (e) => {

    	  e.preventDefault();

    };

    const location = useLocation();

    const state = location.state;

		return (
		<>
		    <Navbar />
			<div className="my-5">
				<h1 className="text-center"> Confirm Payment </h1>
			</div>
			<div className="container contact_div">
				<div className="row">
					<div className="col-md-6 col-10 mx-auto">
						<form onSubmit={formSubmit}>						
						  <div className="mb-3">
						      <h4> Merchant Name: {state[0].mname} </h4><br></br>
						      <h4> Category: {state[0].category} </h4><br></br>
						      <h4> Savings: {state[0].saving} </h4><br></br>
                              <h4> Final Amount: {state[0].amount} </h4><br></br>
                          </div>
						  <div className="col-12">
							  <button className="btn btn-outline-primary" type="submit"> Pay Now </button>
						  </div>						  
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default FinalPaymentMerchant;