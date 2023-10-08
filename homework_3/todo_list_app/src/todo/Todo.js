import {Button, Container} from "react-bootstrap";
import {TODO_EVENTS} from "../AppReducer";

export default function Todo({todo, dispatch}) {

    const localDateString = () => new Date(Date.now()).toLocaleDateString();
    const handleCompletedChange = () => {
        dispatch({
            type: TODO_EVENTS.TOGGLE_COMPLETED,
            payload: {
                ...todo,
                completed: !todo.completed,
                dateCompleted: !todo.completed ? localDateString() : null
            }
        })
    }
    const handleDelete = event => {
        event.preventDefault()
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
                    <i>Written by <b>{todo.author}</b></i>
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