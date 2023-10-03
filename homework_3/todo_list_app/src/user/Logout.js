import {Button, Container} from "react-bootstrap";

export default function Logout({user, setUser}) {
    return (
        <form onSubmit={e => {
            e.preventDefault();
            setUser("");
        }}>
            <Container>
                {
                    user && <Button as="input" type="submit" value="Logout"/>
                }
            {/*Logged in as: <b>{user}</b>*/}
            {/*<input type="submit" value="Logout"/>*/}
            </Container>
        </form>
    );
}