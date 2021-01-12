import Form from './components/Form';
import './App.css';
import Todolist from './components/Todolist';
import React,{useState,useEffect} from 'react';

function App() {

  const [inputText, setInputText] = useState("");
  const [todos,setTodos]=useState([]);
  const [status,setStatus] = useState("all");
  const [filteredTodos,setFilteredTodos] = useState([]);

  useEffect(()=>{
    getLocalTodos();
  },[]);

  useEffect(()=>{
    /*filterHandler();
    saveLocalTodos();*/
    
      switch(status){
        case 'completed':
          setFilteredTodos(todos.filter(todo=>todo.completed === true));
          break;
        case 'uncompleted':
          setFilteredTodos(todos.filter(todo=>todo.completed === false));
          break;
        default:
          setFilteredTodos(todos);
          break;
      };
  
      localStorage.setItem("todos",JSON.stringify(todos));


  },[todos,status])

  /*const filterHandler =()=>{
    switch(status){
      case 'completed':
        setFilteredTodos(todos.filter(todo=>todo.completed === true));
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo=>todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };*/

  /*const saveLocalTodos =()=>{
      localStorage.setItem("todos",JSON.stringify(todos));
  };*/

  const getLocalTodos =()=>{
    if(localStorage.getItem("todos")=== null){
      localStorage.setItem("todos",JSON.stringify([]));
    }else{
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
    }
  };

  return (
    <div className="App">
      <header>
        <h3>
          Todo List
        </h3>
      </header>
      <Form  todos={todos} 
             setTodos={setTodos}  
             inputText={inputText} 
             setInputText={setInputText}
             setStatus={setStatus}
             
      />
      <Todolist  
              setTodos={setTodos} 
              todos={todos}
              filteredTodos={filteredTodos}
      />
    </div>
  );
}

export default App;
