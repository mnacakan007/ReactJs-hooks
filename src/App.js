// import React, { useEffect } from 'react'
// import TodoList from './Todo/TodoList'
// import Context from './context'
// import Loader from './Loader'
// import Modal from "./Modal/Modal";
//
// const AddTodo = React.lazy(
//   () => new Promise(resolve => {
//     setTimeout(() => {
//       resolve( import('./Todo/AddTodo'))
//     }, 2000)
//   })
// )
//
// function App() {
//   const [todos, setTodos] = React.useState([])
//   const [loading, setLoading] = React.useState(true)
//
//   useEffect(() => {
//     fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
//       .then(response => response.json())
//       .then(todos => {
//         setTimeout(() => {
//           setTodos(todos)
//           setLoading(false)
//         },3000)
//       })
//   }, [])
//
//   function toggleTodo(id) {
//     setTodos(todos.map(todo => {
//       if (todo.id === id) {
//         todo.completed = !todo.completed
//       }
//       return todo
//     }))
//   }
//
//   function removeTodo(id) {
//     setTodos(todos.filter(todo => todo.id !== id));
//   }
//
//   function addTodo(title) {
//     setTodos(todos.concat([{
//       title,
//       id: Date.now(),
//       completed: false
//     }]))
//   }
//
//   return (
//     <Context.Provider value={{removeTodo}}>
//       <div className='wrapper'>
//         <h1>React Tutorial</h1>
//
//         <Modal />
//
//         <React.Suspense fallback={<Loader />}>
//           <AddTodo onCreate={addTodo}/>
//         </React.Suspense>
//
//         {loading && <Loader />}
//         {
//           todos.length ?
//           <TodoList todos={todos} onToggle={toggleTodo}/> :
//           loading ? null : <p>No todos!</p>
//         }
//       </div>
//     </Context.Provider>
//   );
// }
//
// export default App;

// React Hooks
import React, {useEffect, useState} from 'react'

function useLogger(value) {
  useEffect(() => {
    console.log('Value changed: ', value)
  }, [value])
}

function useInput(initialValue) {
  const [value, setValue] = useState(initialValue)

  const onChange = event => {
    setValue(event.target.value)
  }

  const clear = () => setValue('')

  return {
    bind: {value, onChange},
    value,
    clear
  }
}

function App() {
  const input = useInput('')

  useLogger(input.value)

  return (
    <div className={'container pt-3'}>
      <input type="text" {...input.bind} />

      <button className="btn btn-warning" onClick={() => input.clear()}>Очистить</button>
      <hr />
      <h1>{input.value}</h1>
    </div>
  )
}

export default App
