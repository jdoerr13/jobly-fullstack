import React, { useState, useEffect } from "react";
import JoblyApi from "./api";
import JobCard from "./JobCard";
import { Container, Row, Col, Form, FormGroup, Input, Button } from "reactstrap"; // Assuming you're using Reactstrap

// Displays a list of jobs, allowing users to search or filter. Each job is represented by a JobCard.
function JobList() {
  const [jobs, setJobs] = useState([]); // array to store list of jobs fetched from the API
  const [searchTerm, setSearchTerm] = useState(""); // string holding current value entered into input field and used to filter jobs by name.

  useEffect(() => {
    async function getJobs() {
      const filters = searchTerm ? { title: searchTerm } : {}; // use the searchTerm as a filter if it exists, otherwise empty object
      const jobsResp = await JoblyApi.getJobs(filters);
      console.log(jobsResp);
      setJobs(jobsResp); // update state to render updated list of jobs on the page filtered by the user input
    }
    getJobs(); // initiate the fetching of jobs when the component mounts or when searchTerm changes.
  }, [searchTerm]);

  const handleSearchChange = (evt) => {
    console.log(evt.target.value);
    setSearchTerm(evt.target.value); // every time a value is inputted, the component state is updated
  };

  const handleSearchSubmit = (evt) => {
    evt.preventDefault();
    // No need to call getJobs here because the useEffect hook will react to searchTerm changes
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <Form onSubmit={handleSearchSubmit} cinline className="mb-4 justify-content-center">
              <Input
                type="text"
                placeholder="Enter search term..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="mr-2"
              />
            <Button type="submit" color="primary">Search</Button>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          {jobs.length > 0 ? (
            jobs.map((job) => <JobCard key={job.id} job={job} />)
          ) : (
            <p className="text-center">"Sorry, no results were found!"</p>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default JobList;

  