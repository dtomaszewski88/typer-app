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

interface Props {
    playerReadyInit: () => void
    isWaiting: boolean
}

const Start = (props: Props) => {
    const { playerReadyInit, isWaiting } = props
    const handleSubmit = (event) => {
        event.preventDefault()
        playerReadyInit()
    }

    return (
        <>
            <Container>
                <Row className="justify-content-md-center">
                    <Col md="auto">
                        <Card>
                            <Card.Header>Quick Game</Card.Header>
                            <Card.Body>
                                <Card.Title>
                                    {!isWaiting && (
                                        <Alert variant="success">
                                            Game Found! Ready?
                                        </Alert>
                                    )}
                                    {isWaiting && (
                                        <Alert variant="warning">
                                            Waiting for other players...
                                        </Alert>
                                    )}
                                </Card.Title>
                                <Form onSubmit={handleSubmit}>
                                    <Button
                                        variant="primary"
                                        size="lg"
                                        block
                                        type="submit"
                                        disabled={isWaiting}
                                    >
                                        <span className="spinner-button">
                                            <span>Ready!</span>
                                            {isWaiting && (
                                                <Spinner
                                                    as="span"
                                                    animation="border"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                />
                                            )}
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

export default Start
