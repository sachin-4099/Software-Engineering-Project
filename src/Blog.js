import React from 'react';
import Common from './Common';
import Navbar from './Navbar';
import blog from "../src/images/blog.jpg";

const Blog = () => {
	return (
		<>
		    <Navbar />
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