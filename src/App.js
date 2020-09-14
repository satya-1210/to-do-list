import React, { useState, useEffect } from 'react';
import './App.css';
import Form from './components/Form'
import ToDoList from './components/ToDoList'

function App() {
  // States
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    if(localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    }
    else {
      let localtodos = JSON.parse(localStorage.getItem("todos"));
      setTodos(localtodos);
    }
  }, []);

  useEffect(() => {
    switch(status) {
      case "completed":
        setFilteredTodos(todos.filter(todo => todo.completed === true));
        break;
      case "uncompleted":
        setFilteredTodos(todos.filter(todo => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }

    localStorage.setItem("todos", JSON.stringify(todos));

  }, [todos, status]);

  return (
    <div>
      <header>
        <h1>To Do List</h1>
      </header>

      <Form 
        inputText={inputText} 
        setInputText={setInputText} 
        todos={todos} 
        setTodos={setTodos} 
        setStatus={setStatus}/>

      <ToDoList 
        todos={todos} 
        setTodos={setTodos} 
        filteredTodos={filteredTodos}/>
    </div>
  );
}

export default App;
