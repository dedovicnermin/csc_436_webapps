import {useContext, useEffect, useState} from "react";
import {Button, Container, Form} from "react-bootstrap";
import {USER_EVENTS} from "../AppReducer";
import {useResource} from "react-request-hook";
import {StateContext} from "../context";

export default function Login() {
    const [username, setUserName] = useState(null);
    const [loginFailed, setLoginFailed] = useState(false);
    const [password, setPassword] = useState(null);

    const {state, dispatch: dispatchUser} = useContext(StateContext);

    const [user, login] = useResource((username, password) => ({
        url: "/auth/login",
        method: "post",
        data: { email: username, password },
    }));

    useEffect(() => {
        if (user && user.isLoading === false && (user.data || user.error)) {
            if (user.error) {
                setLoginFailed(true);
            } else {
                setLoginFailed(false);
                dispatchUser(
                    {
                        type: USER_EVENTS.LOGIN,
                        payload: {
                            email: username,
                            access_token: user.data?.access_token,
                            id: user.data?.id
                        }
                    }
                );
            }
        }
    }, [user]);

    const handleUserName = event => setUserName(event.target.value);
    const handlePassword = event => setPassword(event.target.value);
    const isDisabled = !username || !password

    const handleSubmit = event => {
        event.preventDefault();
        login(username, password)
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
            {loginFailed && (
                <span style={{ color: "red" }}>Invalid username or password</span>
            )}
        </Container>
    );
}