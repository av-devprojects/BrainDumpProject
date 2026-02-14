import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import "./ToDoList.css";

export default function ToDoLists() {
  const [value, setValue] = useState("");
  const [showAll, setShowAll] = useState(false);

  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;

    setTodos([
      ...todos,
      {
        id: Date.now(),
        text: value,
      },
    ]);

    setValue("");
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Only show first 3 unless showAll is true
  const visibleTodos = showAll ? todos : todos.slice(0, 3);

  return (
    <div className="td-lists-elements">
      <div className="todo-header">
        <h3>To Do:</h3>
      </div>

      <form onSubmit={handleSubmit} className="todo-form">
        <input
          className="todo-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit" className="todo-button">
          Add
        </button>
      </form>

      <ul className="todo-list">
        {visibleTodos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <span className="todo-text">{todo.text}</span>
            <button
              className="list-delete-btn"
              onClick={() => handleDelete(todo.id)}
            >
              <FaTrash />
            </button>
          </li>
        ))}
      </ul>

      {todos.length > 3 && (
        <button
          className="see-all-btn"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show Less" : "See All"}
        </button>
      )}
    </div>
  );
}
