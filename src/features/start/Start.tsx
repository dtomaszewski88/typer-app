import React from 'react'
import './start.scss'
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
    updateUserName: (arg0: string) => void
    gameSearchInit: () => void
    userName: string
    isSearching: boolean
}
const Start = (props: Props) => {
    const { userName, updateUserName, gameSearchInit, isSearching } = props
    const handleChange = (event) => {
        updateUserName(event.currentTarget.value)
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        gameSearchInit()
    }
    const isUserNameValid = Boolean(userName && userName.length)
    const isButtonDisabled = !isUserNameValid || isSearching
    return (
        <>
            <Container>
                <Row className="justify-content-md-center">
                    <Col md="auto">
                        <Card>
                            <Card.Header>Quick Game</Card.Header>
                            <Card.Body>
                                <Card.Title>
                                    {!isSearching && (
                                        <Alert variant="primary">
                                            Enter your username and look for a
                                            game
                                        </Alert>
                                    )}
                                    {isSearching && (
                                        <Alert variant="warning">
                                            Looking for a game...
                                        </Alert>
                                    )}
                                </Card.Title>
                                <Form onSubmit={handleSubmit}>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text id="basic-addon1">
                                                Username
                                            </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control
                                            placeholder="Username"
                                            aria-label="Username"
                                            aria-describedby="basic-addon1"
                                            onChange={handleChange}
                                            value={userName}
                                            disabled={isSearching}
                                        />
                                    </InputGroup>
                                    <Button
                                        variant="primary"
                                        size="lg"
                                        block
                                        type="submit"
                                        disabled={isButtonDisabled}
                                    >
                                        <span className="spinner-button">
                                            <span>Find Game!</span>
                                            {isSearching && (
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
