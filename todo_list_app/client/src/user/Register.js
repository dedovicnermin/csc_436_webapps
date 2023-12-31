import {useContext, useEffect, useState} from "react";
import {Button, Container, Form} from "react-bootstrap";
import {USER_EVENTS} from "../AppReducer";
import {useResource} from "react-request-hook";

export default function Register({dispatchUser}) {
    const [status, setStatus] = useState("")
    const [user, register] = useResource((username, password) => ({
        url: "/auth/register",
        method: "post",
        data: { email: username, password, passwordConfirmation: password },
    }));

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        passwordRepeat: ""
    });


    useEffect(() => {
        if (user && user.isLoading === false && (user.data || user.error)) {
            if (user.error) {
                setStatus("Registration failed, please try again later.");
            } else {
                setStatus("Registration successful. You may now login.");
            }
        }
    }, [user]);



    function handleSubmit(event, user) {
        event.preventDefault();
        register(formData.username, formData.password)
    }

    const handleUsernameChange = event => setFormData({...formData, username: event.target.value});
    const handlePasswordChange = event => setFormData({...formData, password: event.target.value});
    const handlePasswordRepeatChange = event => setFormData({...formData, passwordRepeat: event.target.value});
    const isDisabled = formData.password !== formData.passwordRepeat || !formData.password || !formData.username;

    return (
        <Container className="register_wrapper">
            <h2>Register</h2>
            <Form onSubmit={event => handleSubmit(event, formData.username)}>
                <Form.Group className="mb-3" controlId="register-username">
                    <Form.Label>Username: </Form.Label>
                    <Form.Control
                        placeholder="Enter username"
                        type="text"
                        value={formData.username}
                        onChange={handleUsernameChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="register-password">
                    <Form.Label>Password: </Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={handlePasswordChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="register-password-repeat">
                    <Form.Label>Repeat Password: </Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Repeat password"
                        value={formData.passwordRepeat}
                        onChange={handlePasswordRepeatChange}
                    />
                </Form.Group>

                <Button
                    variant="primary" type="submit"
                    disabled={isDisabled}
                >
                    Register
                </Button>
            </Form>
            {status && <p>{status}</p>}
        </Container>
    );
}