import Login from './Login';
import Logout from './Logout';
import Register from "./Register";
import {Container, Navbar} from "react-bootstrap";

export default function UserBar({user, setUser}) {
    // const [user, setUser] = useState('');
    if (user) {

        return (
            <Navbar className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand>TODO App</Navbar.Brand>
                    <Navbar.Toggle/>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>Signed in as: {<b>{user}</b>}</Navbar.Text>
                    </Navbar.Collapse>
                    <Logout user={user} setUser={setUser}/>
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
                        <Login setUser={setUser}/>
                        <Register setUser={setUser}/>
                    </Container>

                </Navbar>
            </>
        );
    }


}