
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {useReducer} from "react";
import UserBar from "./user/UserBar";
import TodoList from "./todo/TodoList";
import {Container} from "react-bootstrap";
import Login from "./user/Login";
import Register from "./user/Register";
import appReducer from "./AppReducer";

const initialTodos = [
  {
      id: "NERM:Clean desk",
      title: "Clean desk",
      description: "Ensure desk is clean.",
      author: "NERM",
      dateCreated: new Date(Date.now()).toLocaleDateString(),
      completed: false,
      dateCompleted: null
  },
  {
      id: "NERM:Clean bathroom",
      title: "Clean bathroom",
      description: "Ensure bathroom is clean.",
      author: "NERM",
      dateCreated: new Date(Date.now()).toLocaleDateString(),
      completed: false,
      dateCompleted: null
  },
  {
      id: "NERM:Fix bed",
      title: "Fix bed",
      description: "Ensure bed is fixed.",
      author: "NERM",
      dateCreated: new Date(Date.now()).toLocaleDateString(),
      completed: false,
      dateCompleted: null
  }
]

const initialState = {
    user: "",
    todos: initialTodos
}

function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
      <Container>
        <UserBar user={state.user} dispatch={dispatch}/>
          {
              !state.user &&
              <Container className="new_user_wrapper">
                  <Login dispatch={dispatch}/>
                  <Register dispatch={dispatch}/>
                  {/*<Counter />*/}
              </Container>
          }
          {
              state.user &&
              <TodoList user={state.user} todos={state.todos} dispatch={dispatch} />
          }
      </Container>
  )
}

export default App;
