import {useState} from "react";
import {Button, Container} from "react-bootstrap";

export default function Register({setUser}) {

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        passwordRepeat: ""
    });

    return (
        <Container className="register_wrapper">
            <form onSubmit={event => {
                event.preventDefault();
                setUser(formData.username)
            }}>
                <Container>
                    <label htmlFor="register-username">Username:</label>
                    <input type="text"
                           value={formData.username}
                           onChange={event => setFormData({...formData, username: event.target.value})}
                           name="register-username"
                           id="register-username"
                    />
                </Container>
                <Container>
                    <label htmlFor="register-password">Password:</label>
                    <input type="password"
                           value={formData.password}
                           onChange={event => setFormData({...formData, password: event.target.value})}
                           name="register-password"
                           id="register-password"/>
                </Container>
                <Container>
                    <label htmlFor="register-password-repeat">Repeat password:</label>
                    <input type="password"
                           value={formData.passwordRepeat}
                           onChange={event => setFormData({...formData, passwordRepeat: event.target.value})}
                           disabled={formData.username.length === 0 || formData.password.length === 0 || formData.passwordRepeat !== formData.passwordRepeat}
                           name="register-password-repeat"
                           id="register-password-repeat"/>
                </Container>
                <Container>
                    <Button as="input" type="submit" value="Register"/>
                </Container>
            </form>
        </Container>
    );
}