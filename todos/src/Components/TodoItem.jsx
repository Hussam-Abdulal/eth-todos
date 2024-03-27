import React from "react";
import PropTypes from "prop-types";

function TodoItem({ id, completed, todoText, onRemoveTodo, onToggleTodo }) {
  const handleTodoDone = () => {
    onToggleTodo(id);
  };

  const handleDeleteTodo = () => {
    onRemoveTodo(id);
  };

  return (
    <>
      <li>
        <div className="item">
          <button
            className={completed ? "done" : ""}
            onClick={handleTodoDone}
          >
            {todoText}
          </button>

          <button className="cross-mark" onClick={handleDeleteTodo}>
            ❌
          </button>
        </div>
      </li>
    </>
  );
}

TodoItem.propTypes = {
  id: PropTypes.number.isRequired,
  completed: PropTypes.bool.isRequired,
  todoText: PropTypes.string.isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
  onToggleTodo: PropTypes.func.isRequired,
};

export default TodoItem;
