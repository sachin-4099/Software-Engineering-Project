import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import Navbar from '../Navbar';

const PaymentMerchants = () => {

    const [data, setData] = useState({
    	mname:'',
    	amount:'',
    	category:'',
    	percentage:'',
    	cname:'',
    	code:'',
    });

    const merchoptions = [
      {label: "Swiggy", value: "swiggy"},
      {label: "Zomato", value: "zomato"},
      {label: "Uber", value: "uber"},  
    ]

    const [categdata, setCategdata] = useState({});

    const categoptions = []; 

    async function get_category() {
	    const res = fetch("/list/category?userid=0", {
				  method: 'GET',
				  headers: {
						'Content-Type': 'application/json'
				  },
			  });

	    res.then(response => response.json()).then(data => setCategdata(data))

    }
    
    useEffect(() => {

	  get_category();

	}, []);
    
    for(var itr = 0; itr < categdata.length; ++itr)
    categoptions.push({label: categdata[itr].category_name, value: categdata[itr].percentage});


    const couponoptions = [
      {label: "Pepsi 20% off", value: "PEPSI20"},
      {label: "Flat 50% off", value: "FLAT50"},  
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

    const InputEventMerchant = (event) => {
      
      const { label, value } = event;
      
      data.mname = value;
      
      setData((preVal) => {
          return {
          	  ...preVal,
          	  ["mname"]: value,
          };
      }); 

      console.log(data)

    };

    const InputEventCategory = (event) => {
      
      const { label, value } = event;
      
      data.category = label;
      data.percentage = value + '%';
      
      setData((preVal) => {
          return {
          	  ...preVal,
          	  ["category"]: value,
          };
      }); 

      console.log(data)

    };

    const InputEventCoupons = (event) => {
      
      const { label, value } = event;
      
      data.cname = label;
      data.code = value;
      
      setData((preVal) => {
          return {
          	  ...preVal,
          	  ["cname"]: value,
          };
      }); 

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
				<h1 className="text-center"> Payment to Merchants </h1>
			</div>
			<div className="container contact_div">
				<div className="row">
					<div className="col-md-6 col-10 mx-auto">
						<form onSubmit={formSubmit}>
						  <div className="mb-3">	
	  						  <label className="form-label"> Merchant Name </label>
							    <Select 
							     options={merchoptions} 
							     onChange={InputEventMerchant}
 							     value={merchoptions.filter(function(option) {
						          return option.value === data.mname;
						         })} 
							     placeholder="Name of Merchant"
							     label="Single select"
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
						  <div className="mb-3">	
	  						  <label className="form-label"> Coupon Name </label>
							    <Select 
							     options={couponoptions} 
							     onChange={InputEventCoupons}
 							     value={couponoptions.filter(function(option) {
						          return option.value === data.cname;
						         })} 
							     placeholder="Name of Coupon"
							     label="Single select"
							    />
						  </div>
  						  <div className="mb-3">	
	  						  <label for="exampleFormControlInput1" className="form-label"> Coupon Code </label>
							  <input 
							     type="text" 
							     className="form-control" 
							     id="exampleFormControlInput1"
							     value={data.code}
							     placeholder="Code"
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

export default PaymentMerchants;