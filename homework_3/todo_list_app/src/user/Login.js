import {useState} from "react";
import {Button, Container, Form} from "react-bootstrap";
import {USER_EVENTS} from "../AppReducer";

export default function Login({dispatch}) {
    const [username, setUserName] = useState(null);
    const [password, setPassword] = useState(null);

    const handleUserName = event => setUserName(event.target.value);
    const handlePassword = event => setPassword(event.target.value);
    const isDisabled = !username || !password

    const handleSubmit = event => {
        event.preventDefault();
        dispatch({
            type: USER_EVENTS.LOGIN,
            payload: username
        });
    }



    return (
        <Container className="login_wrapper">
            <h2>Login</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="login-username">
                    <Form.Label>Username: </Form.Label>
                    <Form.Control placeholder="Enter username" value={username} onChange={handleUserName}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="login-password">
                    <Form.Label>Password: </Form.Label>
                    <Form.Control type="password" placeholder="Enter password" value={password} onChange={handlePassword}/>
                </Form.Group>
                <Button variant="primary" type="submit" disabled={isDisabled}>
                    Login
                </Button>
            </Form>
        </Container>
    );
}