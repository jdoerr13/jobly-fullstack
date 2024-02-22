import React, { useContext, useState, useEffect } from "react";
import UserContext from "./UserContext";
import { Container, Row, Col } from "reactstrap"; // Import Container, Row, and Col components from Reactstrap if you're using it

// Shows information about a single job. Can be reused in both the JobList and CompanyDetail components.
function JobCard({ job }) {
  const { hasAppliedToJob, applyToJob } = useContext(UserContext);
  const [applied, setApplied] = useState();

  useEffect(() => {
    const updateAppliedStatus = () => {
      console.debug("JobCard useEffect updateAppliedStatus", "id=", job.id);
      setApplied(hasAppliedToJob(job.id));
    };

    updateAppliedStatus();
  }, [job.id, hasAppliedToJob]);

  const handleApply = (e) => {
    if (hasAppliedToJob(job.id)) return;
    applyToJob(job.id);
    setApplied(true);
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <div className="card my-3">
            <div className="card-body text-center">
              <h5 className="card-title">{job.title}</h5>
              <h6 className="card-subtitle mb-2 text-muted">Company: {job.companyName}</h6>
              <p className="card-text">Salary: ${job.salary}</p>
              <p className="card-text">Equity: {job.equity}</p>
              <div className="d-flex justify-content-center">
                <button
                  className="btn btn-danger font-weight-bold text-uppercase"
                  onClick={handleApply}
                  disabled={applied}
                >
                  {applied ? "Applied" : "Apply"}
                </button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default JobCard;

  