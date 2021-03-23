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
import Blog from './Blog';
import UserDashboard from './UserDashboard';
import PaymentContacts from './components/PaymentContacts';
import PaymentMerchants from './components/PaymentMerchants';
import FinalPaymentContact from './components/FinalPaymentContact';
import FinalPaymentMerchant from './components/FinalPaymentMerchant';
import SuccessPayment from './components/SuccessPayment';
import ErrorPage from './components/ErrorPage';
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
				<Route exact path="/paymentcontacts" component={PaymentContacts} />
				<Route exact path="/paymentmerchants" component={PaymentMerchants} />
				<Route exact path="/finalpaymentcontact" component={FinalPaymentContact} />
				<Route exact path="/finalpaymentmerchant" component={FinalPaymentMerchant} />
				<Route exact path="/successpayment" component={SuccessPayment} />
				<Route exact path="/error" component={ErrorPage} />
				<Redirect to="/" />
			</Switch>
		</>
	);
};

export default App;