import { useState, useEffect } from 'react';
import './App.css';
import TodoList from './components/TodoList'
export function App() {

  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');


  useEffect(() => {
    fetch('http://localhost:8000/todos/')
      .then(response => response.json())
      .then(data => setTodos(data));
  }, []);


  function handleSubmit(event) {
    event.preventDefault();
    fetch('http://localhost:8000/todos/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ description: newTodo })
    })
      .then(response => response.json())
      .then(data => {
        setTodos([...todos, data]);
        setNewTodo('');
      });
  }
  return (
    <div className="App">
      <TodoList todos={todos} />
      <div>
        <h1>Create a ToDo</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>ToDo: </label>
            <input type="text" value={newTodo} onChange={event => setNewTodo(event.target.value)} />
          </div>
          <div style={{ "marginTop": "5px" }}>
            <button>Add ToDo!</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
