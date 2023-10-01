import {useState} from "react";
import {Container} from "react-bootstrap";

export default function Todo({title, description, author, dateCreated, setTodos}) {
    const [completed, setCompleted] = useState(false);
    const [dateCompleted, setDateCompleted] = useState("");

    function handleCompletedChange(event) {
        setCompleted(prevState => !prevState);
        if (!completed === true) {
            setDateCompleted(new Date(Date.now()).toLocaleDateString());
        } else {
            setDateCompleted("")
        }
    }

    return (
        <Container className="todo">
            <Container className="todo-header">
                <h3>{title}</h3>
                <i>Written by <b>{author}</b></i>
                <div>
                    <span> Create date: {dateCreated} </span>
                </div>
            </Container>
            <Container className="todo-body">
                <span>Description: {description}</span>
            </Container>
            <br/>
            <Container className="todo-footer">
                <label htmlFor="todo-complete">Completed:</label>
                <input type="checkbox" value={completed} onChange={handleCompletedChange}
                       name="todo-complete"
                       id="todo-complete"/>
            </Container>
            {
                dateCompleted &&
                <Container>
                    <i>Complete date: {dateCompleted}</i>
                </Container>

            }
        </Container>
    )
}