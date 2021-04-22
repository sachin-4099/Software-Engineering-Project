import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import './config';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <>	
	  <BrowserRouter>
	    <App />
	  </BrowserRouter>
  </>,
  document.getElementById('root')
);

if (process.env.NODE_ENV === "production"{
      app.use(express.static("build"));
      app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname,  "build", "index.html"));
      });
    }

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
