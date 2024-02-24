import React from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import HomePage from "../HomePage";
import CompanyList from "../companies/CompanyList";
import CompanyDetail from "../companies/CompanyDetail";
import JobsList from "../jobs/JobsList";
import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";
import ProfileForm from "../ProfileForm";
import ProtectedRoute from "./ProtectedRoute";

//Manages the routing of the application. Renders different components based on the current URL.
function AppRoutes({ login, signup }) {
  return (
    <div className="pt-5">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" render={(props) => <LoginForm {...props} login={login} />} />
        <Route exact path="/signup" render={(props) => <SignupForm {...props} signup={signup} />} />
      
        <ProtectedRoute exact path="/companies" component={CompanyList} />
        <ProtectedRoute exact path="/jobs" component={JobsList} />
        <ProtectedRoute exact path="/companies/:handle" component={CompanyDetail} />
        <ProtectedRoute path="/profile" component={ProfileForm} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default AppRoutes;