import React, { useState, useEffect } from "react";
import JoblyApi  from "./api";
import {useParams} from 'react-router-dom'
import JobCard from "./JobCard";
import { Container, Row, Col } from "reactstrap";

//Displays detailed information about a company, including a list of jobs at that company.

function CompanyDetail() {
  const { handle } = useParams();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    async function getCompany() {
      const resp = await JoblyApi.getCompanyInfo(handle);
      console.log(resp);
      setCompany(resp);
    }
    getCompany();
  }, [handle]);

  if (!company) return <div>Loading...</div>;

    return (
      <Container>
        <Row className="justify-content-center">
          <Col md={8} className="text-center">
            <h2>{company.name}</h2>
            <p>{company.description}</p>
            <p>Number of Employees: {company.numEmployees}</p>
            <img src={company.logoUrl} alt={`${company.name} Logo`} style={{ maxWidth: "100%", height: "auto" }} />
          </Col>
        </Row>
        {company.jobs && company.jobs.map(job => (
        <JobCard key={job.id} job={job} />
        ))}
      </Container>
    );
  }


export default CompanyDetail;
