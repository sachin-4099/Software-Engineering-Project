import React from 'react';
import Navbar from '../Navbar';

const PaymentButton = () => {

    var rzp1 = new Razorpay(options);

    var options = {    
		"key": 'rzp_test_5kt38WvQ1V05jk', // Enter the Key ID generated from the Dashboard    
		"amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise    
		"currency": "INR",    
		"name": "Acme Corp",    
		"description": "Test Transaction",    
		"image": "https://example.com/your_logo",    
		"order_id": "order_GiX6roKJdSEW5a", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1    
		"callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",    
		"prefill": {        
			"name": "Gaurav Kumar",       
			"email": "gaurav.kumar@example.com",        
			"contact": "9999999999"   
		},    
		"notes": {        
			"address": "Razorpay Corporate Office"    
		},    
		"theme": {        
			"color": "#3399cc"    
		}
	};

    const formSubmit = (e) => {

	  e.preventDefault();
	  rzp1.open();
      

};

	return (
		<>
		    <Navbar />
			<div className="container contact_div">
				<div className="row">
					<div className="col-md-6 col-10 mx-auto">
						<form onSubmit={formSubmit}>						
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

export default PaymentButton;