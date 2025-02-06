// import { useState, useEffect } from 'react'
// import {Todoprovider} from './context'
// import './App.css'
// import { Todoform } from './Components'
// import { Todoitem} from './Components'


// function App() {
//   const [todos, setTodos] = useState([])

//   const addTodo = (todo)=>{
//     setTodos((prev)=>[ {id:Date.now(), ...todo}, ...prev])
//   }

//   const updatedTodo = (id, todo)=>{
//     setTodos((prev) => prev.map((prevTodo)=> (prevTodo.id === id ? todo : prevTodo)))

   
//   }

//   const deleteTodo = (id)=>{
//     setTodos((prev)=> prev.filter((todo)=> todo.id !== id  ))
//   }

//   const toggleComplete = (id)=>{
//     setTodos((prev)=> prev.map((prevTodo)=> prevTodo ===  id ? {...prevTodo, completed: !prevTodo.completed} : prevTodo ))
//   }

//   useEffect ( () => {
//     const todos = JSON.parse(localStorage.getItem("todos"))

//     if (todos && todos.length  > 0) {
//       setTodos(todos)
//     }
//   },[])

//   useEffect(() => {
//     localStorage.setItem("todos", JSON.stringify(todos))
//   }, [todos])
  

  
//   return (
//     <Todoprovider value={{todos, addTodo, updatedTodo,deleteTodo,toggleComplete}}>
//      <div className="bg-[#172842] min-h-screen py-8">
//                 <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
//                     <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
//                     <div className="mb-4">
//                         {/* Todo form goes here */} 
//                         <Todoform/>
//                     </div>
//                     <div className="flex flex-wrap gap-y-3">
//                         {/*Loop and Add TodoItem here */}
//                         {todos.map((todo)=>(
//                           <div key={todo.id}
//                           className='w-full'>
//                             <Todoitem/>
//                           </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//     </Todoprovider>
//   )
// }

// export default App


import { useState, useEffect } from 'react'
import {Todoprovider} from './Context'
import './App.css'
// import{ Todoform} from './Components/Todoform'
// import { Todoitem } from './Components/Todoitem'
import { Todoform } from './Components'
import {Todoitem} from './Components'
import TodoReminder from './TodoRemainder'
function App() {
  const [todos, setTodos] = useState([])
  const [time, setTime] = useState("")

  const addTodo = (todo) => {
    setTodos((prev) => [{id: Date.now(), ...todo}, ...prev] )
  }

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo )))

    
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id) => {
    //console.log(id);
    setTodos((prev) => 
    prev.map((prevTodo) => 
      prevTodo.id === id ? { ...prevTodo, 
        completed: !prevTodo.completed } : prevTodo))
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])
  
// here
const updatetodoTime = (id, newTime) => {
  setTodos((prevtodos) => prevtodos.map((todo) => (todo.id === id ? { ...todo, time: newTime } : todo)))
}

return (
  <Todoprovider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
    <div className="bg-[#172842] min-h-screen py-8">
      <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
        <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
        <div className="mb-4">
          <Todoform />
        </div>
        <div className="flex flex-wrap gap-y-3">
          {todos.map((todo) => (
            <div key={todo.id} className="w-full">
              <Todoitem todo={todo} />
              <div className="p-2 sm:p-1">
                <input
                  type="datetime-local"
                  value={todo.time || ""}
                  onChange={(e) => updatetodoTime(todo.id, e.target.value)}
                  className="border bg-pink-200 text-black p-1 rounded w-full mt-1"
                />
                <TodoReminder todo={todo.todo} time={todo.time} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Todoprovider>
)
}

export default App

