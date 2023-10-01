import Todo from "./Todo";
import CreateTodo from "./CreateTodo";
import {Container} from "react-bootstrap";

export default function TodoList ({user, todos= [], setTodos}) {
    return (
        <Container className="todo-list">
            {
                user &&
                <Container className="todo-list_create-todo">
                    <CreateTodo user={user} todos={todos} setTodos={setTodos} />
                </Container>
            }
            <Container className="todo-list_todos">
                {
                    todos.map((t,i) => (
                        <Container className="todo-list_todos_item">
                            <Todo {...t} key={'todo-'+i} setTodos={setTodos}/>
                        </Container>
                    ))
                }
            </Container>
        </Container>
    );
}