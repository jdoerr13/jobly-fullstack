import React, { useContext } from "react";
import { Card, CardBody, CardTitle, Button, Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import UserContext from "./auth/UserContext";

function HomePage() {
  const { currentUser } = useContext(UserContext);

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={8}>
          <Card className="shadow">
            <CardBody className="text-center">
              <CardTitle>
                <h1 className="font-weight-bold">Jobly</h1>
                <p className="lead">All the jobs in one, convenient place!</p>
                {currentUser ? (
                  <h2>Welcome back, {currentUser.firstName}!</h2>
                ) : (
                  <div>
                    <Link to="/login" className="mr-2">
                      <Button color="primary">Login</Button>
                    </Link>
                    <Link to="/signup">
                      <Button color="secondary">Sign Up</Button>
                    </Link>
                  </div>
                )}
              </CardTitle>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;

  