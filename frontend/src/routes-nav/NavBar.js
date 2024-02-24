import React, { useContext } from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem, Button } from "reactstrap";
import UserContext from "../auth/UserContext";


// Displays navigation links. Shows different links based on user authentication status.
function NavBar({ logout }) {
  const { currentUser } = useContext(UserContext);

  console.log("NavBar currentUser:", currentUser);

  return (
    <div>
    <Navbar expand="md">
       
    <NavLink exact to="/" className="navbar-brand" style={{ color: '#f0f2f5' }}>
  Jobly Fun
</NavLink>
       


        <Nav className="ml-auto" navbar>
          <NavItem>
            {currentUser ? (
              // Links to show when user is logged in
              <>
                <NavLink exact to="/" style={{ marginRight: '10px' }}>Home</NavLink>
                <NavLink to="/companies" style={{ marginRight: '10px' }}>Companies</NavLink>
                <NavLink to="/jobs" style={{ marginRight: '10px' }}>Jobs</NavLink>
                <NavLink to="/profile" style={{ marginRight: '10px' }}>Profile</NavLink>
                <Button onClick={logout} color="danger" style={{ marginRight: '10px' }}>Logout</Button>
              </>

            ) : (
            
              <>
              <NavLink to="/login" style={{ marginRight: '10px' }}>Login</NavLink>
              <NavLink to="/signup" style={{ marginRight: '10px' }}>Sign Up</NavLink>
            </>
            
            )}

          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavBar;
