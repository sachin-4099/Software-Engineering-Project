import React, { useState } from 'react';
import Navbar from './Navbar';
import { useHistory } from "react-router-dom";

const Register = () => {
    
    const [data, setData] = useState({
    	fname:'',
    	lname:'',
    	uname:'',
    	password:'',
    });

    const history = useHistory();

    const InputEvent = (event) => {
      const { name, value } = event.target;

      setData((preVal) => {
          return {
          	  ...preVal,
          	  [name]: value,
          }

      })

    };

    const formSubmit = (e) => {
    	  
    	  e.preventDefault();
          
		  const res = fetch("/addUser", {
			  method: 'POST',
			  headers: {
					'Content-Type': 'application/json'
			  },
			  body: JSON.stringify({
					 fname: data.fname,
					 lname: data.lname,
					 uname: data.uname,
					 password: data.password
			  })
		  });
  
		  res.then(function(value) { 
			  	
			  	if(value.ok)
		  		{ 
		  		  let path = "/login"; 
				  history.push(path);
		  		}
		  		else
		  		{
		  		  alert(`Please Fill the details Correctly`);	
		  		}

	      });
    };

	return (
		<>
		    <Navbar />
			<div className="my-5">
				<h1 className="text-center"> Welcome to Gullak </h1>
			</div>
			<div className="container contact_div">
				<div className="row">
					<div className="col-md-6 col-10 mx-auto">
						<form onSubmit={formSubmit}>
						  <div className="mb-3">
						    <label for="exampleFormControlInput1" className="form-label"> First Name </label>
						    <input 
							    type="text" 
							    className="form-control" 
							    id="exampleFormControlInput1"
							    name="fname"
							    value={data.fname}
							    onChange={InputEvent}   
							    placeholder="First Name" 
						    />
						  </div>						
						  <div className="mb-3">
						    <label for="exampleFormControlInput1" className="form-label"> Last Name </label>
						    <input 
							    type="text" 
							    className="form-control" 
							    id="exampleFormControlInput1"
							    name="lname"
							    value={data.lname}
							    onChange={InputEvent}   
							    placeholder="Last Name" 
						    />
						  <div className="mb-3">
						    <label for="exampleFormControlInput1" className="form-label"> Email Address </label>
						    <input 
							    type="email" 
							    className="form-control" 
							    id="exampleFormControlInput1"
							    name="uname"
							    value={data.uname}
							    onChange={InputEvent}   
							    placeholder="Email Address" 
						    />
						  </div>						
						  <div className="mb-3">
						    <label for="exampleFormControlInput1" className="form-label"> Password </label>
						    <input 
							    type="password" 
							    className="form-control" 
							    id="exampleFormControlInput1"
							    name="password"
							    value={data.password}
							    onChange={InputEvent}   
							    placeholder="Password" 
						    />
						  </div>						    
						  </div>
						  <div className="col-12">
							  <button className="btn btn-outline-primary" type="submit"> Get Started </button>
						  </div>						  
						</form>
					</div>
				</div>
			</div>
		</>

	);
};

export default Register;