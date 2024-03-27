
import TodoItem from "./TodoItem";
import PropTypes from "prop-types";

function TodoList({ todos, onRemoveTodo, onToggleTodo }) {
  const list = todos.map((todo) => (
    <TodoItem
      key={todo.id}
      id={todo.id}
      todoText={todo.text}
      completed={todo.completed}
      onRemoveTodo={onRemoveTodo}
      onToggleTodo={onToggleTodo}
    />
  ));

  return (
    <>
      <ul>{list}</ul>
    </>
  );
}


TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired
    })
  ).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
  onToggleTodo: PropTypes.func.isRequired
};

export default TodoList;
