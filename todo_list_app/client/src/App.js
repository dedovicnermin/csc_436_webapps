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

    const [todosResponse, getTodos] = useResource(() => ({
        url: "/todos",
        method: "get"
    }))

    // useEffect(getTodos, []);
    useEffect(() => {
        getTodos()
        console.log(todosResponse)
    }, []);

    useEffect(() => {
        if (todosResponse && todosResponse.data) {
            dispatch({ type: TODO_EVENTS.FETCH_TODOS, payload: todosResponse.data.reverse() })
        }
    }, [todosResponse]);



    const [state, dispatch] = useReducer(appReducer, {
        user: "",
        todos: []
    });

    return (
        <Container>
            <StateContext.Provider value={{state, dispatch}}>
                <UserBar />
                {
                    !state.user &&
                    <Container className="new_user_wrapper">
                        <Login />
                        <Register dispatchUser={dispatch}/>
                        {/*<Counter />*/}
                    </Container>
                }
                {
                    state.user &&
                    <TodoList  />
                }
            </StateContext.Provider>
        </Container>
    )
}

export default App;
