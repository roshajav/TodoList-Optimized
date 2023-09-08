import React, { useState, useMemo } from "react";
import { List } from "react-virtualized";
import "react-virtualized/styles.css"; // Import the styles

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  const addTodo = () => {
    if (task.trim() !== "") {
      setTodos([...todos, task]);
      setTask("");
    }
  };

  const deleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  // Memoize the list of todos to prevent unnecessary re-renders
  const memoizedTodos = useMemo(() => todos, [todos]);

  // Virtualized list configuration
  const rowRenderer = ({ index, key, style }) => (
    <div key={key} style={style}>
      <div>
        {memoizedTodos[index]}{" "}
        <button onClick={() => deleteTodo(index)}>Delete</button>
      </div>
    </div>
  );

  return (
    <div>
      <h1>To-Do List</h1>
      <div>
        <input
          type="text"
          placeholder="Add a task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <List
        width={400}
        height={400}
        rowCount={memoizedTodos.length}
        rowHeight={40}
        rowRenderer={rowRenderer}
      />
    </div>
  );
}

export default TodoList;
