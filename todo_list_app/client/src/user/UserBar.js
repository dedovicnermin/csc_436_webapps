import Logout from './Logout';
import {Container, Navbar} from "react-bootstrap";
import {useContext} from "react";
import {StateContext} from "../context";

export default function UserBar() {
    const {state, dispatch: dispatchUser} = useContext(StateContext);
    const { user } = state;

    if (user && user.email) {
        return (
            <Navbar className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand>TODO App</Navbar.Brand>
                    <Navbar.Toggle/>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>Signed in as: {<b>{user.email}</b>}</Navbar.Text>
                    </Navbar.Collapse>
                    <Logout />
                </Container>

            </Navbar>
        );
    } else {
        return (
            <>
                <Navbar expand="lg" className="bg-body-tertiary">
                    <Container>
                        <Navbar.Brand>TODO App</Navbar.Brand>
                        <Navbar.Toggle/>
                    </Container>
                </Navbar>
            </>
        );
    }


}