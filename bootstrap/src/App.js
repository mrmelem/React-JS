import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import Select from "./components/select";

function App() {
  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            <Select />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
