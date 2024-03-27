import  { useRef } from "react";
import PropTypes from "prop-types";

function AddTodoForm({ createTodo }) {
  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = inputRef.current.value.trim();
    if (text) {
      createTodo(text);
      inputRef.current.value = "";
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input ref={inputRef} placeholder="Enter item...." />
      <button type="submit">Add</button>
    </form>
  );
}

AddTodoForm.propTypes = {
  createTodo: PropTypes.func.isRequired,
};

export default AddTodoForm;
