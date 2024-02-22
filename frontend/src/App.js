import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import UserContext from './UserContext';
import JoblyApi from './api'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './NavBar';
import useLocalStorage from './hooks/useLocalStorage';
import jwt from "jsonwebtoken";


// Key name for storing token in localStorage for "remember me" re-login
export const TOKEN_STORAGE_ID = "jobly-token";//used as the Keyname


//The root component that holds the overall state and routing logic.
//hold the global state that includes user authentication status, user profile information, and possibly a list of companies and jobs if you plan on fetching this data centrally.
function App() {
  const [applicationIds, setApplicationIds] = useState(new Set([]));
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);//manage a piece of state that is synchronized with localStorage under the key 'jobly-token' aka whenever you update this state using the setter function returned by useLocalStorage, the new value will automatically be saved to localStorage under this key.
 

  useEffect(() => {
    const getUser = async () => {
      if (token) {
        try {
          let { username } = jwt.decode(token);
          // put the token on the Api class so it can use it to call the API.
          JoblyApi.token = token;
          let currentUser = await JoblyApi.getCurrentUser(username);
            setCurrentUser(currentUser);
            setApplicationIds(new Set(currentUser.applications));
        } catch (err) {
          console.log(err);
          setCurrentUser(null);
        }
      }
    };
    getUser();
  }, [token]);


  const logout = () => {
    setToken(null); // Clear the token state
    setCurrentUser(null); // Clear the current user state
  };


  const login = async (loginData) => {
    try {
      // Authenticate the user and get the token
      let token = await JoblyApi.login(loginData);
      // Set the token for future requests in JoblyApi
      setToken(token);
      // Store the token in local storage
      return { success: true };
    } catch (err) {
      console.error("Login failed", err);
      return { success: false } // You can handle this error in your LoginForm component to display a message to the user
    }
  };


  const signup = async (signupData) => {
    try {
      let token = await JoblyApi.register(signupData); 
      setToken(token); // Update token state to trigger useEffect
      return { success: true };
    } catch (err) {
      console.error("Signup failed", err);
      return { success: false };
    }
  };
  
  /** Checks if a job has been applied for. */
  function hasAppliedToJob(id) {
    return applicationIds.has(id);
  }

    /** Apply to a job: make API call and update set of application IDs. */
  const applyToJob= (id) => {
    if (hasAppliedToJob(id)) return;
    JoblyApi.applyToJob(currentUser.username, id);
    setApplicationIds(new Set([...applicationIds, id]));
  }

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ currentUser, setCurrentUser, hasAppliedToJob, applyToJob }}>
        <div className="App">
          <NavBar logout={logout} />
          <AppRoutes login={login} signup={signup} />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}


export default App;


//SELECT a.username, j.id AS job_id, j.title AS job_title, c.name AS company_name
// FROM applications a
// JOIN jobs j ON a.job_id = j.id
// JOIN companies c ON j.company_handle = c.handle; 
