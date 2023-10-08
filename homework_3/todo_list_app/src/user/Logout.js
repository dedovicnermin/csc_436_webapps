import {Button, Container} from "react-bootstrap";
import {USER_EVENTS} from "../AppReducer";

function handleLogout(dispatch) {
    dispatch({type: USER_EVENTS.LOGOUT});
}

export default function Logout({user, dispatch}) {
    return (
        <form onSubmit={e => {
            e.preventDefault();
            handleLogout(dispatch);
        }}>
            <Container>
                {
                    user && <Button as="input" type="submit" value="Logout"/>
                }
            </Container>
        </form>
    );
}