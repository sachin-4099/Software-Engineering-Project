import React, { useState } from 'react';
import Navbar from './Navbar';
import Cookies from 'js-cookie';
import Select from 'react-select';
import LoginNavbar from './LoginNavbar';

const Contact = () => {

	var navChoice;

	if (Cookies.get("user")) { 
		navChoice = <LoginNavbar />;
	}
	else {
		navChoice = <Navbar />;
	}	

    const [data, setData] = useState({
    	fname:'',
    	email:'',
    	msg:'',
    });

    const InputEvent = (event) => {
      const { name, value } = event.target;

      setData((preVal) => {
          return {
          	  ...preVal,
          	  [name]: value,
          }

      })

    };

    const formSubmit = () => {


    };

	return (
		<>
		    {navChoice}
			<div className="my-5">
				<h1 className="text-center"> Contact Us </h1>
			</div>
			<div className="container contact_div">
				<div className="row">
					<div className="col-md-6 col-10 mx-auto">
						<form onSubmit={formSubmit}>
			              <div className="mb-3">  
		                    <label className="form-label"> Transaction ID </label>
		                    <Select 
		                     onChange={InputEvent}
		                     placeholder="Transaction ID"
		                     label="Single select"
		                    />
			              </div>   					  
  						  <div className="mb-3">
						    <label for="exampleFormControlTextArea1" className="form-label"> Message </label>
						    <textarea
							    className="form-control" 
							    id="exampleFormControlTextArea1" 
							    rows="3"
							    name="msg"
							    value={data.msg}
							    onChange={InputEvent} 
							    placeholder="Enter your query"
						    ></textarea>
						  </div>
						  <div className="col-12">
							  <button className="btn btn-outline-primary" type="submit">Submit Query</button>
						  </div>						  
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default Contact;