import { ethers } from "ethers";
import { useEffect, useState, useCallback, useRef } from "react";
import TodoItem from "./Components/TodoItem";
import {abi, address} from "./config"; 

import "./App.css";




if (window.ethereum) {
  window.provider = new ethers.providers.Web3Provider(window.ethereum);
} else {
  console.error(
    "Ethers.js: Web3 provider not found. Please install a wallet with Web3 support.",
  );
}

function App() {
  const [readContract, setReadContract] = useState(null);
  const [writeContract, setWriteContract] = useState(null);
  const [todos, setTodos] = useState([]);
  const inputRef = useRef();

  useEffect(() => {
    const setContract = async () => {
      const provider = new ethers.providers.JsonRpcProvider("HTTP://127.0.0.1:7545");
      const signer = provider.getSigner();
  
      const read = new ethers.Contract(address, abi, provider);
      const write = new ethers.Contract(address, abi, signer);
  
      setReadContract(read);
      setWriteContract(write);
    };
  
    setContract();
  }, []);
  
  const fetchTodos = useCallback(async () => {
    if (!readContract) return;
  
    try {
      const count = await readContract.todoCount(); 
      const todosPromises = [];
      for (let i = 1; i <= count; i++) {
        todosPromises.push(readContract.todos(i));
      }
      const todos = (await Promise.all(todosPromises))
        .filter(todo => todo.text !== '')  
        .map(todo => ({
          id: todo.id.toNumber(),           
          text: todo.text,
          completed: todo.completed
        }));
      setTodos(todos);
    } catch (error) {
      console.error("Failed to fetch todos", error);
    }
  }, [readContract]);
  

  const createTodo = async (text) => {
    if (!writeContract) return;
  
    try {
     
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const from = accounts[0];
  
     
      const tx = await writeContract.populateTransaction.createTodo(text);
  
      
      await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: from,
            to: tx.to,
            data: tx.data
          }
        ]
      });
  
      
      await fetchTodos();
    } catch (error) {
      console.error("Failed to create todo", error);
    }
  };
  
  
  
const toggleTodo = async (id) => {
  if (!writeContract) return;

  try {
      const transaction = await writeContract.toggleTodo(id);
      await transaction.wait();
      fetchTodos();
  } catch (error) {
      console.error("Failed to toggle todo", error);
  }
};

const removeTodo = async (id) => {
  if (!writeContract) return;

  try {
 
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const from = accounts[0];

    
    const tx = await writeContract.populateTransaction.removeTodo(id);

  
    await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: from,
          to: tx.to,
          data: tx.data
        }
      ]
    });

  
    await fetchTodos();
  } catch (error) {
    console.error("Failed to remove todo", error);
  }
};


  return (
    <div className="App">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const text = inputRef.current.value.trim();
          if (text) {
            createTodo(text);
            inputRef.current.value = "";
          }
        }}
      >
        <input ref={inputRef} placeholder="Enter item...." />
        <button type="submit">Add</button>
      </form>

      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            todoText={todo.text}
            completed={todo.completed}
            onToggleTodo={toggleTodo}
            onRemoveTodo={removeTodo}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;