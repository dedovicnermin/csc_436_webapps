import {useState} from "react";
import {Container} from "react-bootstrap";

export default function Login({setUser}) {
    const [username, setUserName] = useState("");

    function handleUserName(event) {
        setUserName(event.target.value);
    }

    return (
        <Container className="login_wrapper">
            <form onSubmit={e => {
                e.preventDefault();
                setUser(username)
            }}>
                <Container>
                    <label htmlFor="login-username">Username:</label>
                    <input type="text" value={username} onChange={handleUserName} name="login-username"
                       id="login-username"/>
                </Container>
                <Container>
                    <label htmlFor="login-password">Password:</label>
                    <input type="password" name="login-password" id="login-password"/>
                </Container>
                <Container>
                    <input type="submit" value="Login" disabled={username.length === 0}/>
                </Container>

            </form>
        </Container>
    );
}