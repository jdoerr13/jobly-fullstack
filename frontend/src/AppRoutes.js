import React from "react";
import { Redirect, Switch, Route } from "react-router-dom";
// import { HomePage, CompaniesList, CompanyDetails, JobsList, LoginForm, SignupForm, ProfileForm } from "."; // Adjust the import path as necessary
import HomePage from "./HomePage";
import CompanyList from "./CompanyList";
import CompanyDetail from "./CompanyDetail";
import JobsList from "./JobsList";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ProfileForm from "./ProfileForm";
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