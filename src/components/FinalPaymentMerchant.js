import React from 'react';
import { useHistory, useLocation } from "react-router-dom";
import img from "../images/piggybank.jpg";
import Navbar from '../Navbar';
import Cookies from "js-cookie";
import LoginNavbar from '../LoginNavbar';

const FinalPaymentMerchant = () => {

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
				description: "Transaction to Merchant",    
				image: img,    
				order_id: state[0].order_id,
			    handler: async (response) => {
			      try {
			       console.log(response)	
			       const paymentId = response.razorpay_payment_id;
			       const orderId = response.razorpay_order_id;
			       const signature = response.razorpay_signature;
			       alert(`Payment Successful`);
	       		  
	       		   const res = fetch("/successful_payment", {
					   method: 'POST',
					   headers: {
							 'Content-Type': 'application/json'
					   },
					   body: JSON.stringify({
							  razorpay_payment_id: paymentId,
							  razorpay_order_id: orderId,
							  razorpay_signature: signature,
							  success: true
					   })
				   });

				   console.log(res)

   		  		   let path = "/successpayment"; 
				   history.push(path);
			      }   catch (err) {
			      	console.log(response);
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

	      {/*rzp1.on('payment.failed', function (response){
		    alert(response.error.code);
		    alert(response.error.description);
		    alert(response.error.source);
		    alert(response.error.step);
		    alert(response.error.reason);
		    alert(response.error.metadata.order_id);
		    alert(response.error.metadata.payment_id);
		});*/}


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
						      <h4> Merchant Name: {state[0].name} </h4><br></br>
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