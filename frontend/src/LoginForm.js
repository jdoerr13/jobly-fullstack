import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory if you plan to redirect after login

function LoginForm({ login }) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(data => ({ ...data, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Indicate loading
    setError(null); // Reset errors
    try {
      await login(formData); // Await the login function
      setIsLoading(false); // Reset loading state
      // Redirect or update UI upon successful login
      history.push('/'); // Optional based on your implementation
    } catch (error) {
      setIsLoading(false); // Reset loading state
      setError(error.message || 'Login failed');
    }
  };

  return (
    <div className="LoginForm">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h2 className="mb-3">Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Username</label>
                <input
                  name="username"
                  className="form-control"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary float-right"
                disabled={isLoading}
              >
                {isLoading ? 'Logging In...' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
