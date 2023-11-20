import {Button, Container} from "react-bootstrap";
import {TODO_EVENTS} from "../AppReducer";
import {useResource} from "react-request-hook";
import {useContext} from "react";
import {StateContext} from "../context";

export default function Todo({todo, dispatch}) {

    const {state, dpatch } = useContext(StateContext);
    const { user } = state;

    const [todoResult, updateTodo] = useResource(
        ({id, title, description, author, dateCreated, completed, dateCompleted}) => (
            {
                url: "/todos/" + id,
                method: "put",
                headers: { Authorization: `${user.access_token}` },
                data: {
                    id,
                    title,
                    description,
                    author,
                    dateCreated,
                    completed,
                    dateCompleted
                }
            }
        )
    );

    const [deletedTodo, deleteTodo] = useResource(
        ({id, title, description, author, dateCreated, completed, dateCompleted}) => ({
            url: "/todos/" + id,
            method: "delete",
            headers: { Authorization: `${user.access_token}` }
        })
    )

    const localDateString = () => new Date(Date.now()).toLocaleDateString();
    const handleCompletedChange = () => {
        const update = {
            ...todo,
            completed: !todo.completed,
            dateCompleted: !todo.completed ? localDateString() : null
        };
        console.log("handleCompletedChange() : STATUS_OF_TODO : %s", JSON.stringify(todo));
        updateTodo({...update});
        dispatch({
            type: TODO_EVENTS.TOGGLE_COMPLETED,
            payload: {
                ...update
            }
        })
    }
    const handleDelete = event => {
        event.preventDefault()
        console.log("handleDelete() : todo - (%s) - before backend persistence", todo);
        deleteTodo({...todo})
        dispatch({
            type: TODO_EVENTS.DELETE_TODO,
            payload: {
                ...todo
            }
        })
    }

    return (
        <Container className="todo">
            <Container className="todo_left">
                <Container className="todo-header">
                    <h3>{todo.title}</h3>
                    <i>Written by <b>{user.email}</b></i>
                    <div>
                        <span> Create date: {todo.dateCreated} </span>
                    </div>
                </Container>
                <Container className="todo-body">
                    <span>Description: {todo.description}</span>
                </Container>
                <br/>
                <Container className="todo-footer">
                    <label htmlFor="todo-complete">Completed:</label>
                    <input type="checkbox" value={todo.completed} onClick={handleCompletedChange}
                           checked={todo.completed}
                           name="todo-complete"
                           id="todo-complete"/>
                </Container>
                {
                    todo.completed &&
                    <Container>
                        <i>Complete date: {todo.dateCompleted}</i>
                    </Container>

                }
            </Container>
            <Container className="todo_right">
                <Button variant="outline-dark" onClick={handleDelete} size="sm">Delete</Button>
            </Container>
        </Container>

    )
}