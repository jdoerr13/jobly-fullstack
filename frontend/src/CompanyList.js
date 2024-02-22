import React, { useState, useEffect } from "react";
import JoblyApi  from "./api";
import CompanyCard from "./CompanyCard";
import { Container, Row, Col, Form, Input, Button } from "reactstrap";

//Displays a list of companies. Each company is represented by a CompanyCard.
//used api.js with getCompanies to 

function CompanyList() {
    const [companies, setCompanies] = useState([]); //array to store list of companies fetched from the API
    const [searchTerm, setSearchTerm] = useState(""); //string holding current value entered into input field and used to filter companies by name.

    useEffect(() => {
      async function getCompanies(){//new function defined
        const filters = searchTerm ? {name: searchTerm} : {}; //use the searchTerm as a filter if it exist, otherwise empty object
        const companiesResp = await JoblyApi.getCompanies(filters);
        setCompanies(companiesResp);//update state to render updated list of companies on the page filtered by the user imput
      }
      getCompanies();//innitiate the fetching of companies when the component mounts or when searchTerm changes. 
    }, [searchTerm])

    const handleSearchChange = (evt) => {
      console.log(evt.target.value)
      setSearchTerm(evt.target.value);//every time a value is inputed, the component state is updated
    };
    const handleSearchSubmit = (evt) => {
      evt.preventDefault();
      // No need to call getCompanies here because the useEffect hook will react to searchTerm changes
    };
  
    return (
      <Container>
        <Row className="justify-content-center my-5">
          <Col md={8}>
            <Form onSubmit={handleSearchSubmit} inline className="mb-4 justify-content-center">
                <Input
                  type="text"
                  name="searchTerm"
                  id="searchTerm"
                  placeholder="Enter search term..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="mr-2"
                />
                <Button type="submit" color="primary">Search</Button>
            </Form>
            {companies.length > 0 ? (
              companies.map(company => <CompanyCard key={company.handle} company={company} />)
            ) : (
              <p className="text-center">Sorry, no results were found!</p>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
  
  export default CompanyList;