import React from 'react';
import {Container, Row, Col} from 'react-bootstrap'
import Typer from './features/typer/container';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
    <Container>
    <Row>
      <Col>
          <Typer />
      </Col>
    </Row>
  </Container>
  );
}