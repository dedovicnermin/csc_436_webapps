import Logout from './Logout';
import {Container, Navbar} from "react-bootstrap";

export default function UserBar({user, dispatch}) {
    if (user) {

        return (
            <Navbar className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand>TODO App</Navbar.Brand>
                    <Navbar.Toggle/>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>Signed in as: {<b>{user}</b>}</Navbar.Text>
                    </Navbar.Collapse>
                    <Logout user={user} dispatch={dispatch}/>
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