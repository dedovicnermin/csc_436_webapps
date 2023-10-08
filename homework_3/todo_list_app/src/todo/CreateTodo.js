import {useState} from "react";
import {Button, Form} from "react-bootstrap";
import {TODO_EVENTS} from "../AppReducer";
/**
 * Renders a form accepting title and description for a new Todo item
 */
export default function CreateTodo({user, dispatch}) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const isDisabled = !title || !description;
    const localDateString = () => new Date(Date.now()).toLocaleDateString();
    const createTodo = () => {
        return {
            id: user+":"+title,
            title: title,
            description: description,
            author: user,
            dateCreated: localDateString(),
            completed: false,
            dateCompleted: null
        };
    }

    function handleTitle(event) {setTitle(event.target.value);}
    function handleDescription(event) {setDescription(event.target.value);}
    function handleCreate(event) {
        event.preventDefault();
        dispatch({
            type: TODO_EVENTS.CREATE_TODO,
            payload: createTodo()
        })
    }



    return (
        <Form onSubmit={handleCreate}>
            <Form.Group className="mb-3" controlId="create-todo-author">
                <Form.Label>Author: </Form.Label>
                <Form.Control plaintext readOnly as="text" value={user}>{user}</Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="create-todo-title">
                <Form.Label>Title: </Form.Label>
                <Form.Control type="text" placeholder="Enter title for TODO" value={title} onChange={handleTitle}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="create-todo-description">
                <Form.Label>Description: </Form.Label>
                <Form.Control as="textarea" rows="3" value={description} onChange={handleDescription} placeholder="Enter TODO description"/>
            </Form.Group>

            <Button variant="primary" type="submit" disabled={isDisabled}>
                Create
            </Button>
        </Form>
    );
}