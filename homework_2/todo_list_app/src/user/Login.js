import {useState} from "react";
import {Button, Container, Form} from "react-bootstrap";

export default function Login({setUser}) {
    const [username, setUserName] = useState("");

    function handleUserName(event) {
        setUserName(event.target.value);
    }

    return (
        <Container className="login_wrapper">
            <h2>Login</h2>
            <Form onSubmit={ e => {e.preventDefault(); setUser(username)}}>
                <Form.Group className="mb-3" controlId="login-username">
                    <Form.Label>Username: </Form.Label>
                    <Form.Control placeholder="Enter username" value={username} onChange={handleUserName}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="login-password">
                    <Form.Label>Password: </Form.Label>
                    <Form.Control type="password" placeholder="Enter password"/>
                </Form.Group>
                <Button variant="primary" type="submit" disabled={!username}>
                    Login
                </Button>
            </Form>
        </Container>
    );
}