import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {useEffect, useReducer} from "react";
import { useResource } from "react-request-hook";
import UserBar from "./user/UserBar";
import TodoList from "./todo/TodoList";
import {Container} from "react-bootstrap";
import Login from "./user/Login";
import Register from "./user/Register";
import appReducer, {TODO_EVENTS} from "./AppReducer";
import {StateContext} from "./context";


function App() {

    const [state, dispatch] = useReducer(appReducer, {
        user: {},
        todos: []
    });


    const [todosResponse, getTodos] = useResource(() => ({
        url: "/todos",
        method: "get",
        headers: { Authorization: `${state?.user?.access_token}` },
    }))


    useEffect(() => {
        getTodos()
        console.log(todosResponse)
    }, [state?.user?.access_token]);

    useEffect(() => {
        if (todosResponse && todosResponse.data && todosResponse.isLoading === false) {
            dispatch({ type: TODO_EVENTS.FETCH_TODOS, payload: todosResponse.data.reverse() })
        }
    }, [todosResponse]);



    return (
        <Container>
            <StateContext.Provider value={{state, dispatch}}>
                <UserBar />
                {
                    !state.user?.email &&
                    <Container className="new_user_wrapper">
                        <Login />
                        <Register dispatchUser={dispatch}/>
                    </Container>
                }
                {
                    state.user?.email &&
                    <TodoList  />
                }
            </StateContext.Provider>
        </Container>
    )
}

export default App;
