import React from 'react';
import { Container, Spinner as BootstrapSpinner } from 'react-bootstrap';

const Spinner = () => {
  return (
    <Container className="mt-5 d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
      <div className="text-center">
        <BootstrapSpinner animation="border" variant="light" style={{ width: "4rem", height: "4rem" }} />
        <h4 className="text-white mt-3">Loading...</h4>
      </div>
    </Container>
  )
}

export default Spinner;