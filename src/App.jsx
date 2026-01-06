import { useState } from "react"


function App() {

    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState("");

    const addTodo = () => {
        if (input.trim() === "") return;
        setTodos([...todos, { id: Date.now(), text: input, completed: false }])
        setInput("");
    }

    return (<>
        <h1>Todo App</h1>
        <input type="text" placeholder="Enter todo" value={input} onChange={(e) => setInput(e.target.value)} />
        <button onClick={addTodo}>Add todo</button>

        <ul>
            {todos.map((todo) => (<li key={todo.id}>
                {todo.text}
            </li>))}
        </ul>
    </>)
}

export default App