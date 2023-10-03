import {useState} from "react";
import {Button, Container} from "react-bootstrap";
/**
 * Renders a form accepting title and description for a new Todo item
 */
export default function CreateTodo({user, todos, setTodos}) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    function handleTitle(event) {
        setTitle(event.target.value);
    }
    function handleDescription(event) {
        setDescription(event.target.value);
    }
    function handleCreate() {
        const newTodo = {
            title,
            description,
            author: user,
            dateCreated: new Date(Date.now()).toLocaleDateString(),
            completed: false,
            dateCompleted: "NA"
        };
        setTodos([newTodo, ...todos]);
    }

    return (
        <form onSubmit={event => {
            event.preventDefault();
            handleCreate();
        }}>
            <Container>Author: <b>{user}</b></Container>
            <Container>
                <label htmlFor="create-title">Title:</label>
                <input type="text" value={title} onChange={handleTitle} name="create-title" id="create-title"/>
            </Container>
            <Container>
                <label>Desc:</label>
                <textarea value={description} onChange={handleDescription}/>
            </Container>

            <Button as="input" type="submit" value="Create"/>
        </form>
    );
}