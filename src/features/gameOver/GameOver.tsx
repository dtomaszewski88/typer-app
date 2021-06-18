import React from 'react'
import {
    Container,
    Spinner,
    Form,
    Button,
    Card,
    Row,
    Col,
    InputGroup,
    Alert,
} from 'react-bootstrap'
import _ from 'lodash'
import ScoreBoard from '../score/container'
interface Props {}

const GameOver = ({}: Props) => {
    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <ScoreBoard isOver />
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col md="auto">
                        <Card>
                            <Card.Header>GAME OVER</Card.Header>
                            <Card.Body>
                                <Card.Title>
                                    <Alert variant="success">You Won!</Alert>
                                    <Alert variant="warning">You Lost!</Alert>
                                </Card.Title>
                                <Form onSubmit={_.noop}>
                                    <Button
                                        variant="primary"
                                        size="lg"
                                        block
                                        type="submit"
                                    >
                                        <span className="spinner-button">
                                            <span>Ready!</span>
                                        </span>
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default GameOver
