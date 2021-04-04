import React from 'react';
import Common from './Common';
import Navbar from './Navbar';
import LoginNavbar from './LoginNavbar';
import Cookies from 'js-cookie';
import blog from "../src/images/blog.jpg";

const Blog = () => {

	var navChoice;

	if (Cookies.get("user")) { 
		navChoice = <LoginNavbar />;
	}
	else {
		navChoice = <Navbar />;
	}		

	return (
		<>
		    {navChoice}
			<Common
				name='Blog @ ' 
				imgsrc={blog} 
				visit='/register' 
				btname='Get Started'
				desc="Best in class articles to promote financial freedom"
			/>
		</>

	);
};

export default Blog;