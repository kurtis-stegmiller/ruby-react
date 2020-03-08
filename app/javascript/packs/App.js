import React, { Fragment} from "react";

import { BrowserRouter as Router, } from "react-router-dom";

import Routes from "../components/Routes";

// import "./App.scss";

function App() {
  return (
    <Router>
      <Fragment>
        <div className="container">
          <Routes />
        </div>
        <div className="footer">
          <div className="container">
            <div className="footer-copyright">
              © {new Date().getFullYear()} Box. All rights reserved. Handmade in Switzerland
            </div>
            <a className="btn link">Contact</a>
          </div>
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
