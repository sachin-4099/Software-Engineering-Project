import React, { useState } from 'react';
import Navbar from './Navbar';

const Contact = () => {

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
		    <Navbar />
			<div className="my-5">
				<h1 className="text-center"> Contact Us </h1>
			</div>
			<div className="container contact_div">
				<div className="row">
					<div className="col-md-6 col-10 mx-auto">
						<form onSubmit={formSubmit}>
						  <div className="mb-3">
						    <label for="exampleFormControlInput1" className="form-label"> Full Name </label>
						    <input 
							    type="text" 
							    className="form-control" 
							    id="exampleFormControlInput1"
							    name="fname"
							    value={data.fname}
							    onChange={InputEvent} 
							    placeholder="Enter your name" 
						    />
						  </div>						
						  <div className="mb-3">
						    <label for="exampleFormControlInput1" className="form-label"> Email Address </label>
						    <input 
							    type="email" 
							    className="form-control" 
							    id="exampleFormControlInput1"
							    name="email"
							    value={data.email}
							    onChange={InputEvent}  
							    placeholder="Email Address" 
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
							  <button className="btn btn-outline-primary" type="submit">Submit form</button>
						  </div>						  
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default Contact;