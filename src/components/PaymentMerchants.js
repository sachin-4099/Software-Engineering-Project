import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import Navbar from '../Navbar';
import LoginNavbar from '../LoginNavbar';

const PaymentMerchants = () => {

	var navChoice;

	if (Cookies.get("user")) { 
		navChoice = <LoginNavbar />;
	}
	else {
		navChoice = <Navbar />;
	}	

    const user_id = Cookies.get("user");	

    const [data, setData] = useState({
    	merchant:'',
    	merchant_id:'',
    	amount:'',
    	category:'',
    	category_id:'',
    	percentage:'',
    	coupon:'',
    	coupon_id:'',
    	code:'',
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

    const [merchdata, setMerchdata] = useState({});

    const merchoptions = [];

    async function get_merchants() {
	    const res = fetch("/list/merchant", {
				  method: 'GET',
				  headers: {
						'Content-Type': 'application/json'
				  },
			  });

	    res.then(response => response.json()).then(data => setMerchdata(data));

    }

    const [coupondata, setCoupondata] = useState({});
    const [couponoptions, setCouponoptions] = useState([{}]);
    const [couponmap, setCouponmap] = useState(new Map());

    async function get_coupons(merchantid) {
	    const res = await fetch(`/list/coupon?merchant_id=${merchantid}`, {
				  method: 'GET',
				  headers: {
						'Content-Type': 'application/json'
				  },
			  });

	    return await res.json();

	    // res.then(response => await response.json()).then(data => setCoupondata(data));
	    // .then(coupondata => {
		   //  const couponoptions_temp = [];
		   //  for(var itr = 0; itr < coupondata.length; ++itr)
		   //  couponoptions_temp.push({label: coupondata[itr].coupon_desc, value: coupondata[itr].coupon_code});

		   //  setCouponoptions(couponoptions_temp);
	    // })


    }

    useEffect(() => {

	  get_category();
	  get_merchants();

	}, []);
    
    for(var itr = 0; itr < categdata.length; ++itr)
    { 
       categoptions.push({label: categdata[itr].category_name, value: categdata[itr].percentage});
       categmap.set(categdata[itr].category_name, categdata[itr].category_id);
    }

    for(var itr = 0; itr < merchdata.length; ++itr)
    merchoptions.push({label: merchdata[itr].merchant_name, value: merchdata[itr].merchant_id}); 	

    // const couponoptions = [
    //   {label: "Pepsi 20% off", value: "PEPSI20"},
    //   {label: "Flat 50% off", value: "FLAT50"},  
    // ]

    const InputEventAmount = (event) => {
      
      const { name, value } = event.target;

      setData((preVal) => {
          return {
          	  ...preVal,
          	  [name]: value,
          };

      });

    };

    const InputEventMerchant = async (event) => {
      
      const { label, value } = event;
      
      setData((preVal) => {
          return {
          	  ...preVal,
          	  ["merchant"]: label,
          	  ["merchant_id"]: value,
          };
      });

  	  const couponoptions_temp = [];
	  const couponmap_temp = new Map();

  	  setCouponoptions(couponoptions_temp);
	  setCouponmap(couponmap_temp);
	  
      setData((preVal) => {
          return {
          	  ...preVal,
          	  ["code"]: '',
          };
      });

	  const coupondata_temp = await get_coupons(value);
	  setCoupondata(coupondata_temp);

      for(var itr = 0; itr < coupondata_temp.length; ++itr)
	  {
	  	couponoptions_temp.push({label: coupondata_temp[itr].coupon_desc, value: coupondata_temp[itr].coupon_code});
	  	couponmap_temp.set(coupondata_temp[itr].coupon_code, coupondata_temp[itr].coupon_id);
	  }

	  setCouponoptions(couponoptions_temp);
	  setCouponmap(couponmap_temp); 
      
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

    const InputEventCoupons = (event) => {
      
      const { label, value } = event;

      setData((preVal) => {
          return {
          	  ...preVal,
          	  ["coupon"]: label,
          	  ["coupon_id"]: couponmap.get(value),
          	  ["code"]: value,
          };
      });


    };    
    

    const formSubmit = (e) => {

	  e.preventDefault();

	  const valid_coupon = fetch(`/validate/coupon?coupon_id=${data.coupon_id}`, {
				  method: 'GET',
				  headers: {
						'Content-Type': 'application/json'
				  },
			  });

	  valid_coupon.then(function(value) { 
                
			  	if(value.ok)
		  		{ 
		  			  const percentage = data.percentage.slice(0, -1)  
					  const res = fetch("/confirm/payment/merchant", {
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
								 merchant_id: data.merchant_id,
								 coupon_id: data.coupon_id
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
									  pathname: '/FinalPaymentMerchant',
									  state: [{name: data.merchant,
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
		  		  alert(`Invalid Coupon`);	
		  		}

	      });

};

	return (
		<>
		    {navChoice}
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
						          return option.label === data.merchant;
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
						  <div className="mb-3">	
	  						  <label className="form-label"> Coupon Name </label>
							    <Select 
							     options={couponoptions} 
							     onChange={InputEventCoupons}
 							     value={couponoptions.filter(function(option) {
						          return option.label === data.coupon;
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