import React from 'react';
import Common from './Common';
import blog from "../src/images/blog.jpg";

const Blog = () => {
	return (
		<>
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