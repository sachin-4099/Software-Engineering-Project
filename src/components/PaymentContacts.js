import React, { useState } from 'react';
import PhoneInput from "react-phone-number-input/input";
import 'react-phone-number-input/style.css';
import Select from 'react-select';
import Navbar from '../Navbar';

const PaymentContacts = () => {

    const [data, setData] = useState({
    	phonenum:'',
    	amount:'',
    	category:'',
    	percentage:'',
    });

    const categoptions = [
      {label: "Entertainment", value: "entertainment"},
      {label: "Food", value: "food"},
      {label: "Travel", value: "travel"},  
    ]

    const InputEventAmount = (event) => {
      
      const { name, value } = event.target;

      data.amount = value;

      setData((preVal) => {
          return {
          	  ...preVal,
          	  [name]: value,
          };

      });

      console.log(data)

    };

    const InputEventCategory = (event) => {
      
      const { label, value } = event;
      
      data.category = value;
      data.percentage = 15 + '%';
      
      setData((preVal) => {
          return {
          	  ...preVal,
          	  ["category"]: value,
          };
      }); 

      console.log(data)

    };

    const InputEventPhone = (event) => {
      
      data.phonenum = event;
      console.log(data)

    };



    const formSubmit = (e) => {

	  e.preventDefault();
	  // rzp1.open();
      

};

	return (
		<>
		    <Navbar />
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
						          return option.value === data.category;
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