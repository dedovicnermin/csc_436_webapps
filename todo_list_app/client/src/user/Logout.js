import {Button, Container} from "react-bootstrap";
import {USER_EVENTS} from "../AppReducer";
import {useContext} from "react";
import {StateContext} from "../context";

function handleLogout(dispatch) {
    dispatch({type: USER_EVENTS.LOGOUT});
}

export default function Logout() {
    const { state, dispatch } = useContext(StateContext);
    const { user } = state;

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