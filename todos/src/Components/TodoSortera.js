import React from 'react';

const TodoSortera = ({ handleSortByName }) => {
  return (
    <button onClick={handleSortByName}>Sortera efter namn</button>
  );
}

export default TodoSortera;
