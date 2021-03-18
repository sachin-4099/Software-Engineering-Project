import React from 'react';
import '../css/errorpage.css';

const ErrorPage = () => {
	return (
		<>
			<head>
			  <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@600;900&display=swap" rel="stylesheet"></link>
			</head>
			<div class="backcolor">
			  <div class="mainbox">
			    <div class="err">4</div>
			    <div class="err1">0</div>
			    <div class="err2">4</div>
			    <div class="msg">Maybe this page moved? Got deleted? Is hiding out in quarantine? Never existed in the first place?<p>Let's go <a href="/">home</a> and try from there.</p></div>
		      </div>
		    </div>

		</>
	);
};

export default ErrorPage;