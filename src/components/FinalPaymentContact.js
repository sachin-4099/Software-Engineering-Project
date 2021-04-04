import React from 'react';
import { useHistory, useLocation } from "react-router-dom";
import img from "../images/piggybank.jpg";
import Navbar from '../Navbar';
import Cookies from "js-cookie";
import LoginNavbar from '../LoginNavbar';

const FinalPaymentContact = () => {

	var navChoice;

	if (Cookies.get("user")) { 
		navChoice = <LoginNavbar />;
	}
	else {
		navChoice = <Navbar />;
	}	

    const location = useLocation();
    const history = useHistory();

    const state = location.state;

    const formSubmit = (e) => {

    	  e.preventDefault();

		  const options = {    
				key: 'rzp_test_5kt38WvQ1V05jk',     
				name: state[0].name,    
				description: "Transaction to Contact",    
				image: img,    
				order_id: state[0].order_id,
			    handler: async (response) => {
			      try {
			       const paymentId = response.razorpay_payment_id;
			       const orderId = response.razorpay_order_id;
			       const signature = response.razorpay_signarure;
			       alert(`Payment Successful`);
   		  		   let path = "/successpayment"; 
				   history.push(path);
			      }   catch (err) {
			        console.log(err);
			      }
			    },
				prefill: {        
					name: state[0].username,       
					email: state[0].email,        
					contact: state[0].contact   
				},     
				theme: {        
					color: "#3399cc"    
				}
	      };

	      const rzp1 = new window.Razorpay(options);

	      rzp1.open();

    };

		return (
		<>
		    {navChoice}
			<div className="my-5">
				<h1 className="text-center"> Confirm Payment </h1>
			</div>
			<div className="container contact_div">
				<div className="row">
					<div className="col-md-6 col-10 mx-auto">
						<form onSubmit={formSubmit}>						
						  <div className="mb-3">
						      <h4> Payee Name: {state[0].name} </h4><br></br>
						      <h4> Payee UPI ID: {state[0].upi_id} </h4><br></br>
						      <h4> Payee Phone Number: {state[0].phone_number} </h4><br></br>
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

export default FinalPaymentContact;