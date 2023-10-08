import {useState} from "react";
import {Button, Container, Form} from "react-bootstrap";
import {USER_EVENTS} from "./../AppReducer.js";

export default function Register({dispatch}) {

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        passwordRepeat: ""
    });

    return (
        <Container className="register_wrapper">
            <h2>Register</h2>
            <Form onSubmit={event => {event.preventDefault();dispatch({type: USER_EVENTS.REGISTER, payload: formData.username})}}>
                <Form.Group className="mb-3" controlId="register-username">
                    <Form.Label>Username: </Form.Label>
                    <Form.Control
                        placeholder="Enter username"
                        type="text"
                        value={formData.username}
                        onChange={event => setFormData({...formData, username: event.target.value})}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="register-password">
                    <Form.Label>Password: </Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={event => setFormData({...formData, password: event.target.value})}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="register-password-repeat">
                    <Form.Label>Repeat Password: </Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Repeat password"
                        value={formData.passwordRepeat}
                        onChange={event => setFormData({...formData, passwordRepeat: event.target.value})}
                    />
                </Form.Group>
                <Button
                    variant="primary" type="submit"
                    disabled={formData.password !== formData.passwordRepeat || !formData.password || !formData.username}
                >
                    Register
                </Button>
            </Form>
        </Container>
    );
}