import Todo from "./Todo";
import CreateTodo from "./CreateTodo";
import {Container} from "react-bootstrap";
import {useContext} from "react";
import {StateContext} from "../context";

export default function TodoList () {

    const {state, dispatch: todoDispatch} = useContext(StateContext);
    const { user, todos } = state;


    return (
        <Container className="todo-list">
            {
                state.user?.email &&
                <Container className="todo-list_create-todo">
                    <CreateTodo  />
                </Container>
            }
            <Container className="todo-list_todos">
                {
                    todos?.length === 0 &&
                    <span>NONE FOUND - CREATE YOUR FIRST!</span>
                }
                {
                    todos?.length > 0 && todos.map((todo) => (
                        <Container key={todo.id} className="todo-list_todos_item">
                            <Todo todo={todo} dispatch={todoDispatch}/>
                        </Container>
                    ))
                }
            </Container>
        </Container>
    );
}