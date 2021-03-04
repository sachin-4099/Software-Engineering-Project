import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import Home from './Home';
import About from './About';
import Partners from './Partners';
import Contact from './Contact';
import Login from './Login';
import Register from './Register';
import Invest from './Invest';
import Navbar from './Navbar';
import Blog from './Blog';
import UserDashboard from './UserDashboard';
import { Switch, Route, Redirect } from 'react-router-dom';

const App = () => {
	return (
		<>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/about" component={About} />
				<Route exact path="/partners" component={Partners} />
				<Route exact path="/contact" component={Contact} />
				<Route exact path="/invest" component={Invest} />
				<Route exact path="/blog" component={Blog} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/register" component={Register} />
				<Route exact path="/userdashboard" component={UserDashboard} />
				<Redirect to="/" />
			</Switch>
		</>
	);
};

export default App;