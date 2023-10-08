import Todo from "./Todo";
import CreateTodo from "./CreateTodo";
import {Container} from "react-bootstrap";

export default function TodoList ({user, todos= [], dispatch}) {
    return (
        <Container className="todo-list">
            {
                user &&
                <Container className="todo-list_create-todo">
                    <CreateTodo user={user} dispatch={dispatch} />
                </Container>
            }
            <Container className="todo-list_todos">
                {
                    todos.map((todo) => (
                        <Container key={todo.id} className="todo-list_todos_item">
                            <Todo todo={todo} dispatch={dispatch}/>
                        </Container>
                    ))
                }
            </Container>
        </Container>
    );
}