import {useState} from "react";
import {Button, Container} from "react-bootstrap";
import {TODO_EVENTS} from "../AppReducer";
/**
 * Renders a form accepting title and description for a new Todo item
 */
export default function CreateTodo({user, dispatch}) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
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
    function handleCreate() {
        dispatch({
            type: TODO_EVENTS.CREATE_TODO,
            payload: createTodo()
        })
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