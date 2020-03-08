import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";

// Pages
import Home from "../pages/home/Home";
import Dashboard from "../pages/dashboard/Dashboard";

import { withRouter } from "react-router-dom";

const PrivateRoute = ({ redirect, ...props }) => {
  if (localStorage.getItem("currentUser")) return <Route {...props} />;
  return <Redirect to="/" />;
};

const Routes = ({ history }) => {
  const path = history.location.pathname;
  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      history.push("/dashboard");
    } else {
      history.push("/");
    }
  }, [history, path]);

  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/dashboard" component={Dashboard} />
    </Switch>
  );
};

// Modal.propTypes = {
//   open: PropTypes.bool,
//   close: PropTypes.func,
//   children: PropTypes.node
// };

export default withRouter(Routes);
