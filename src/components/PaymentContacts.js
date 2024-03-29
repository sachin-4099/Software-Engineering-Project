import React, { useState, useEffect } from 'react';
import PhoneInput from "react-phone-number-input/input";
import 'react-phone-number-input/style.css';
import Select from 'react-select';
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import Navbar from '../Navbar';
import LoginNavbar from '../LoginNavbar';

const PaymentContacts = () => {

	var navChoice;

	if (Cookies.get("user")) { 
		navChoice = <LoginNavbar />;
	}
	else {
		navChoice = <Navbar />;
	}	

    const user_id = Cookies.get("user");

    const [data, setData] = useState({
    	phonenum:'',
    	amount:'',
    	category:'',
    	category_id:'',
    	percentage:'',
    });

    const history = useHistory();

    const [categdata, setCategdata] = useState({});

    const categoptions = [];
    let categmap = new Map(); 

    async function get_category() {
	    const res = fetch(`/list/category?userid=${user_id}`, {
				  method: 'GET',
				  headers: {
						'Content-Type': 'application/json'
				  },
			  });

	    res.then(response => response.json()).then(data => setCategdata(data));

    }

    useEffect(() => {

	  get_category();

	}, []);

    for(var itr = 0; itr < categdata.length; ++itr)
    { 
       categoptions.push({label: categdata[itr].category_name, value: categdata[itr].percentage});
       categmap.set(categdata[itr].category_name, categdata[itr].category_id);
    }

    const InputEventAmount = (event) => {
      
      const { name, value } = event.target;

      setData((preVal) => {
          return {
          	  ...preVal,
          	  [name]: value,
          };

      });

    };

    const InputEventCategory = (event) => {
      
      const { label, value } = event;
      
      setData((preVal) => {
          return {
          	  ...preVal,
          	  ["category"]: label,
          	  ["percentage"]: value + '%',
          	  ["category_id"]: categmap.get(label),
          };
      });

    };

    const InputEventPhone = (event) => {

      const value = event;

      setData((preVal) => {
          return {
          	  ...preVal,
          	  ["phonenum"]: value,
          };

      });

    };


    const formSubmit = (e) => {

	  e.preventDefault();

	  if(data.phonenum.length != 13)
	  alert(`Invalid Phone Number`);
      else
      { 
		  const valid_phone = fetch(`/validate/phone_number?phone_no=${data.phonenum}`, {
					  method: 'GET',
					  headers: {
							'Content-Type': 'application/json'
					  },
				  });

		  valid_phone.then(function(value) { 
	                
				  	if(value.ok)
			  		{ 
			  			  const percentage = data.percentage.slice(0, -1)  
						  const res = fetch("/confirm/payment/non_merchant", {
							  method: 'POST',
							  headers: {
									'Content-Type': 'application/json'
							  },
							  body: JSON.stringify({
							  	     userid: user_id,
									 amount: data.amount,
									 currency: "INR",
									 payment_category_id: data.category_id,
									 category_percentage: percentage,
									 phone_number: data.phonenum
							  })
						  });

			  		     res.then(function(value) {

						  	 if(value.ok)
					  		 { 
							    return value.json();  
					  		 }
					  		 else
					  		 {
		  		   		  		  let path = "/error"; 
								  history.push(path);
					  		 }

				      }).then(res_data => {


						        history.push({
									  pathname: '/FinalPaymentContact',
									  state: [{name: res_data.payee_fullname,
									           phone_number: data.phonenum,
									           upi_id: res_data.upi_id,
									           category: data.category,
									           saving: data.percentage,
									           amount: res_data.amount/100,
									           order_id: res_data.order_id,
   									           username: res_data.fullname,
									           email: res_data.email,
									           contact: res_data.contact
									         }]
								})

				      });


		  		} 
                
			  		else
			  		{
			  		  alert(`User Does not Exist`);	
			  		}

		      });  	

      }

	  // rzp1.open();
      
};

	return (
		<>
		    {navChoice}
			<div className="my-5">
				<h1 className="text-center"> Payment to Contacts </h1>
			</div>
			<div className="container contact_div">
				<div className="row">
					<div className="col-md-6 col-10 mx-auto">
						<form onSubmit={formSubmit}>
						  <div className="mb-3">	
	  						  <label for="exampleFormControlInput1" className="form-label"> Payee Phone Number </label>
							  <PhoneInput 
							     className="form-control" 
							     id="exampleFormControlInput1"
							     name="phonenum"
							     country="IN"
							     value={data.phonenum}
							     onChange={InputEventPhone} 
							     placeholder="Phone Number of Payee" 
							  />
						  </div>
  						  <div className="mb-3">	
	  						  <label for="exampleFormControlInput1" className="form-label"> Amount </label>
							  <input 
							     type="number"
							     className="form-control" 
							     id="exampleFormControlInput1"
							     name="amount"
							     value={data.amount}
							     onChange={InputEventAmount} 
							     placeholder="Amount (in INR)" 
							  />
						  </div>
						  <div className="mb-3">	
	  						  <label className="form-label"> Category </label>
							    <Select 
							     options={categoptions} 
							     onChange={InputEventCategory}
 							     value={categoptions.filter(function(option) {
						          return option.label === data.category;
						         })} 
							     placeholder="Category"
							     label="Single select"
							    />
						  </div>
						  <div className="mb-3">	
	  						  <label for="exampleFormControlInput1" className="form-label"> Savings Percentage </label>
							  <input 
							     type="text" 
							     className="form-control" 
							     id="exampleFormControlInput1"
							     value={data.percentage}
							     placeholder="Percentage"
							     readonly="readonly" 
							  />
						  </div>

						  <div className="col-12">
							  <button className="btn btn-outline-primary" type="submit"> Confirm Payment </button>
						  </div>						  
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default PaymentContacts;