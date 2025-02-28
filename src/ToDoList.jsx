import React, { useState } from "react"

function ToDoList() {

    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [editIndex, setEditIndex] = useState(null);
    const [editedTask, setEditedTask] = useState("");
    const [completedTasks, setCompletedTasks] = useState([]);


    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function addTask() {
        if (newTask.trim() !== "") {
            setTasks(t => [...t, newTask]);
            setNewTask("");
        }
    }

    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);

        
        const updatedCompletedTasks = completedTasks
            .filter(i => i !== index) 
            .map(i => (i > index ? i - 1 : i)); 

        setCompletedTasks(updatedCompletedTasks);
    }

    function moveTaskUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);

            
            const updatedCompletedTasks = [...completedTasks];
            const indexInCompleted = updatedCompletedTasks.indexOf(index);
            const indexAboveInCompleted = updatedCompletedTasks.indexOf(index - 1);

            if (indexInCompleted !== -1) {
                updatedCompletedTasks[indexInCompleted] = index - 1;
            }
            if (indexAboveInCompleted !== -1) {
                updatedCompletedTasks[indexAboveInCompleted] = index;
            }

            setCompletedTasks(updatedCompletedTasks);
        }
    }

    function moveTaskDown(index) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);

            
            const updatedCompletedTasks = [...completedTasks];
            const indexInCompleted = updatedCompletedTasks.indexOf(index);
            const indexBelowInCompleted = updatedCompletedTasks.indexOf(index + 1);

            if (indexInCompleted !== -1) {
                updatedCompletedTasks[indexInCompleted] = index + 1;
            }
            if (indexBelowInCompleted !== -1) {
                updatedCompletedTasks[indexBelowInCompleted] = index;
            }

            setCompletedTasks(updatedCompletedTasks);
        }
    }

    function startEditTask(index) {
        setEditIndex(index);
        setEditedTask(tasks[index]);
    }                                                 

    function saveEditedTask() {
        if (editedTask.trim() !== "") {
            const updatedTasks = [...tasks];
            updatedTasks[editIndex] = editedTask;
            setTasks(updatedTasks);
            setEditIndex(null);
        }
    }

    function toggleCompleteTask(index) {
        if (completedTasks.includes(index)) {                             
           
            setCompletedTasks(completedTasks.filter(i => i !== index));                             
        } else {
                                                                                                    
            setCompletedTasks([...completedTasks, index]);
        }
    }



    return (
        <div className="to-do-list">
            <h1>To-Do-List</h1>
            <div>
                <input type="text" placeholder="Enter a task..." value={newTask} onChange={handleInputChange} />
                <button className="add-button" onClick={addTask}>Add</button>
            </div>

            <ol>
                {tasks.map((task, index) => (
                    <li key={index}>
                        {editIndex === index ? (
                            <input type="text" value={editedTask} onChange={(e) => setEditedTask(e.target.value)} />
                        ) : (
                            <span className={completedTasks.includes(index) ? "completed" : ""}>{task}</span>
                        )}

                        {editIndex === index ? (
                            <button onClick={saveEditedTask}>Save</button>
                        ) : (
                            <>
                                <button onClick={() => startEditTask(index)} disabled={completedTasks.includes(index)}>Edit</button>
                                <button onClick={() => deleteTask(index)}>Delete</button>
                                <button onClick={() => moveTaskUp(index)} disabled={completedTasks.includes(index)}>⬆️</button>
                                <button onClick={() => moveTaskDown(index)} disabled={completedTasks.includes(index)}>⬇️</button>
                                <button onClick={() => toggleCompleteTask(index)}>{completedTasks.includes(index) ? "❌" : "✅"}</button>
                            </>
                        )}
                    </li>
                ))}
            </ol>

        </div>
    )
}

export default ToDoList