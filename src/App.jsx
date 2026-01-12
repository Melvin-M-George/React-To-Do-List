
import { useState } from "react";

function App() {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState("");
    const addTodo = () => {
        if (input.trim() === "") {
            return;
        }
        setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
        setInput("");
    }
    return (<>
        <h1>Todo App</h1>
        <input type="text" value={input} placeholder="Enter todo" onChange={(e) => setInput(e.target.value)} />
        <button onClick={addTodo}>Add</button>

        <ul>
            {todos.map((todo) => (<li key={todo.id}>
                <span
                    onClick={() => setTodos(todos.map((t) => t.id === todo.id ? { ...t, completed: !t.completed } : t))}
                    style={{ textDecoration: todo.completed ? "line-through" : "none", cursor: "pointer" }}>
                    {todo.text}
                </span>
                <button onClick={() => setTodos(todos.filter((t) => t.id !== todo.id))}>❌</button>
            </li>))}
        </ul>
    </>)
}

export default App;