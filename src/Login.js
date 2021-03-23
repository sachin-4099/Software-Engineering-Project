import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import "./css/index.css";
import Navbar from './Navbar';

const Login = () => {
    
    const [data, setData] = useState({
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
          };

      });

    };

    const formSubmit = (e) => {

    	  e.preventDefault();
          
		  const res = fetch("/auth", {
			  method: 'POST',
			  headers: {
					'Content-Type': 'application/json'
			  },
			  body: JSON.stringify({
					 uname: data.uname,
					 password: data.password
			  })
		  });
  

		  res.then(function(value) { 
                
			  	if(value.ok)
		  		{ 
		  		  global.config.i18n.state.login = 1; 
  		  		  let path = "/";
				  history.push(path);
		  		}
		  		else
		  		{
		  		  alert(`Invalid Credentials`);	
		  		}

	      });

    };

	return (
		<>
		    <Navbar />
			<div className="my-5">
				<h1 className="text-center"> Login to Gullak </h1>
			</div>
			<div className="container contact_div">
				<div className="row">
					<div className="col-md-6 col-10 mx-auto">
						<form onSubmit={formSubmit}>
						  <div className="mb-3">
						    <label for="exampleFormControlInput1" className="form-label"> Username </label>
						    <input 
							    type="email" 
							    className="form-control" 
							    id="exampleFormControlInput1"
							    name="uname"
							    value={data.uname}
							    onChange={InputEvent}  
							    placeholder="Username" 
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
						  <div className="col-12">
							  <button className="btn btn-outline-primary" type="submit"> Login </button>
						  </div>						  
						</form>
					</div>
				</div>
			</div>			
		</>

	);
};

export default Login;