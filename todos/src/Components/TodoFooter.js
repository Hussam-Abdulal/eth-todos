import React from "react";

function TodoFooter({ clearAllTodos }) {
  return (
    <div>
      <button onClick={clearAllTodos}>Clear All</button>
    </div>
  );
}

export default TodoFooter;
