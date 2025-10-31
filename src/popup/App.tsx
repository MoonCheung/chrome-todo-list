import { useState, useEffect } from "react";
import { nanoid } from 'nanoid'
import { printDate } from '@/lib/helper';
import TodoForm from '@/components/TodoForm';
import TodoList from "@/components/TodoList";
import './App.css'

export default function App() {
  const currDate = new Date();
  const date = printDate(currDate);

  const [editing, setEditing] = useState(false);

  const [currentTodo, setCurrentTodo] = useState({
    id: null, description: '', completed: null
  })

  const todosData: any = [
    //{id: uuidv4(), description: 'Go shopping', completed: false}
  ]

  const [todos, setTodos] = useState(todosData);

  // This function stores todos in localStorage:
  useEffect(() => {
    const getLocalTodos = () => {
      if(localStorage.getItem('todos') === null){
        localStorage.setItem('todos', JSON.stringify([]))
      }else{
        setTodos(JSON.parse(localStorage.getItem("todos")))
      }
    }
    getLocalTodos();
  }, [])

  const [status, setStatus] = useState('all');
  // We need a empty array where store the filtered 'todos'
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    // depending on the status, show me a TodoList. filteredTodos will be sent to TodoList component.
    const filterHandler = () => {
      switch(status) {
        case 'completed':
          setFilteredTodos(todos.filter(todo => todo.completed === true));
          break;
        case 'Uncompleted':
          setFilteredTodos(todos.filter(todo => todo.completed === false));
          break;
        default: 
          setFilteredTodos(todos)
          break;
      }
    }

    // Save to localStorage
    const saveLocalTodos = () => {
      localStorage.setItem('todos', JSON.stringify(todos));
    }

    filterHandler();
    saveLocalTodos();
  }, [todos, status]);

  const addTodo = (todo) => {
    todo.id = nanoid();
    todo.completed = false;
    setTodos([
      todo,
      ...todos,
    ])
  }

  //remove todos:
  // we send an id and we put the 'todo' out which match with the sent id
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const editTodo = (todo) => {
    //the EditTodoForm component is showed
    setEditing(true);
    // and the clicked todo's info is stored in the currentTodo variable 
    setCurrentTodo({
      id: todo.id, description: todo.description, completed: todo.completed
    })
  }

  const updateTodo = (id, updatedTodo) => {
    setEditing(false);
    setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo))
  }

  const completeTodo = (todo) => {
    console.log('completed todo:', todo)
    setTodos(todos.map(item => {
      if (item.id === todo.id) {
        return { ...item, completed: !item.completed }
      }
      return item;
    }));
  }

  // NOTE: get image url
  // chrome.runtime.getURL('./src/assets/img/cold-night.jpg')
  
  return (
    <main className="flex flex-col justify-center items-center mx-[auto] my-[0] text-center min-w-[450px]">
      <div className="flex flex-col justify-end items-start pl-6 w-full min-h-[25vh] px-8 bg-[url('chrome-extension://gndblimomfhnimekccnbdldonifilojb/src/assets/img/cold-night.jpg')] bg-cover bg-no-repeat bg-bottom">
        <h2>My Day</h2>
        <p className="text-[1rem] mt-2 pb-6">{date}</p>
      </div>
      <TodoForm 
        editing={editing}
        todos={addTodo}
        setStatus={setStatus}
        currentTodo={currentTodo}
        updateTodo={updateTodo}
       />
      <TodoList 
        todos={todos} 
        filteredTodos={filteredTodos} 
        deleteTodo={deleteTodo}
        completeTodo={completeTodo}
        editTodo={editTodo}
      />
      <footer className="py-4">
        <p>&copy; 2025 MoonCheung Author &bull; <a href="https://github.com/MoonCheung" target="_blank" rel="noreferrer">Portfolio</a></p>
      </footer>
    </main>
  )
}
