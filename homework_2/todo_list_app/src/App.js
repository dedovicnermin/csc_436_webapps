
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {useState} from "react";
import UserBar from "./user/UserBar";
import TodoList from "./todo/TodoList";

const initialTodos = [
  {title: "Clean desk", description: "Ensure desk is clean.", author: "NERM", dateCreated: new Date(Date.now()).toLocaleDateString(), complete: false, dateCompleted: "NA"},
  {title: "Clean bathroom", description: "Ensure bathroom is clean.", author: "NERM", dateCreated: new Date(Date.now()).toLocaleDateString(), complete: false, dateCompleted: "NA"},
  {title: "Fix bed", description: "Ensure bed is fixed.", author: "NERM", dateCreated: new Date(Date.now()).toLocaleDateString(), complete: false, dateCompleted: "NA"}
]

function App() {
  const [user, setUser] = useState('');
  const [todos, setTodos] = useState(initialTodos);

  return (
      <div>
        <UserBar user={user} setUser={setUser}/>
        {user && <TodoList user={user} todos={todos} setTodos={setTodos} />}
      </div>
  )
}

export default App;
