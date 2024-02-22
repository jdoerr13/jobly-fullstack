import React, { useState, useContext, useEffect } from "react";
import { useHistory } from 'react-router-dom'; 
import JoblyApi from './api'; 
import UserContext from "./UserContext";
import { Alert, Form, FormGroup, Label, Input, Button, Container, Row, Col } from "reactstrap";

//Allows users to view and edit their profile.
function ProfileForm() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const history = useHistory();

  useEffect(() => {
      // Check if currentUser is loaded
      if (currentUser) {
          setFormData({
              firstName: currentUser.firstName || "",
              lastName: currentUser.lastName || "",
              email: currentUser.email || "",
              username: currentUser.username || "",
              password: "",
          });
          setIsLoading(false); // Set isLoading to false as currentUser is loaded
      }
  }, [currentUser]);

  if (isLoading) {
      return <div>Loading...</div>; // Display loading message if currentUser data is being loaded
  }

  async function handleSubmit(evt) {
      evt.preventDefault();
      let profileData = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
      };

      let username = formData.username;
      try {
          let updatedUser = await JoblyApi.updateUser(username, profileData);
          setCurrentUser(updatedUser);
          setFormErrors([]);
          history.push('/');
      } catch (errors) {
          setFormErrors(errors);
      }
      // Clear the password field after submission
      setFormData(f => ({ ...f, password: "" }));
  }

  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(f => ({ ...f, [name]: value }));
  };

    return (
      <Container>
          <Row className="justify-content-center">
              <Col md={6}>
                  <Form onSubmit={handleSubmit} className="mt-5">
                      <h2 className="text-center mb-4">Edit Profile</h2>
                      <FormGroup>
                          <Label htmlFor="username">Username</Label>
                          <Input
                              type="text"
                              name="username"
                              id="username"
                              value={formData.username}
                              disabled
                          />
                      </FormGroup>
                      <FormGroup>
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                              type="text"
                              name="firstName"
                              id="firstName"
                              value={formData.firstName}
                              onChange={handleChange}
                          />
                      </FormGroup>
                      <FormGroup>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                              type="text"
                              name="lastName"
                              id="lastName"
                              value={formData.lastName}
                              onChange={handleChange}
                          />
                      </FormGroup>
                      <FormGroup>
                          <Label htmlFor="email">Email</Label>
                          <Input
                              type="email"
                              name="email"
                              id="email"
                              value={formData.email}
                              onChange={handleChange}
                          />
                      </FormGroup>
                      <FormGroup>
                          <Label htmlFor="password">Confirm password to make changes:</Label>
                          <Input
                              type="password"
                              name="password"
                              id="password"
                              value={formData.password}
                              onChange={handleChange}
                          />
                      </FormGroup>
                      {formErrors.length > 0 && (
                          <Alert color="danger">
                              {formErrors.map(error => (
                                  <div key={error}>{error}</div>
                              ))}
                          </Alert>
                      )}
                      <div className="text-center">
                          <Button type="submit" color="primary">Save Changes</Button>
                      </div>
                  </Form>
              </Col>
          </Row>
      </Container>
  );
  }
  
  export default ProfileForm;
  