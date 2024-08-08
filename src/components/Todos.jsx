import { useEffect, useState } from 'react'
import checkIcon from '../assets/images/icon-check.svg'
import crossIcon from '../assets/images/icon-cross.svg'
import { deleteTodo, getTodos, updateTodo } from '../firebase/todos'

export const Todos = ({ mode, fetchTodos }) => {
  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    function fetchData() {
      getTodos().then((data) => {
        setTodos(data)
      })
    }

    fetchData()
  }, [fetchTodos])

  function handleDelete(id) {
    deleteTodo(id).then(() => {
      fetchTodos()
    })
  }

  function handleToggleStatus(id, status) {
    const newStatus = status === 'completed' ? 'active' : 'completed'
    updateTodo(id, newStatus).then(() => {
      fetchTodos()
    })
  }

  function filterStatus(status) {
    setFilter(status)
  }

  function clearCompleted() {
    const completedTodos = todos.filter(todo => todo.status === 'completed')
    Promise.all(completedTodos.map(todo => deleteTodo(todo.id)))
      .then(() => fetchTodos())
  }

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'all':
        return true
      case 'active':
        return todo.status !== 'completed'
      case 'completed':
        return todo.status === 'completed'
      default:
        return true
    }
  })

  return (
    <>
      <section className={`rounded-[5px] mt-[16px] shadow-sm ${mode === 'light' ? 'bg-white' : 'bg-dark-mode-input'}`}>
        {filteredTodos.map((todo) => (
          <div key={todo.id} className={`px-5 p-4 md:p-5 flex justify-between items-center border-b ${mode === 'light' ? 'border-light-grayish-blue' : 'border-very-dark-grayish-blue'}`}>
            <div className='flex items-center'>
              <button 
                onClick={() => handleToggleStatus(todo.id, todo.status)} 
                className={`h-5 w-5 border ${mode === 'light' ? 'border-light-grayish-blue' : 'border-very-dark-grayish-blue'} rounded-full relative ${todo.status === 'completed' ? 'bg-gradient-to-r from-linear-gradient-1 to-linear-gradient-2' : ''}`}
              >
              </button>
              {todo.status === 'completed' && <img className='absolute p-1 pointer-events-none' src={checkIcon} alt="check" />}
              {mode === 'light' && 
              <button className={`px-3 text-xs md:text-base text-very-dark-grayish-blue ${todo.status === 'completed' ? 'text-very-light-grayish-blue line-through' : ''}`}>
              {todo.title}
              </button>}
              {mode === 'dark' && 
              <button className={`px-3 text-xs md:text-base text-very-dark-grayish-blue ${todo.status === 'completed' ? 'line-through' : 'text-very-light-grayish-blue'}`}>
              {todo.title}
            </button>}
            </div>
            <button onClick={() => handleDelete(todo.id)}>
              <img className='h-3' src={crossIcon} alt="cross" />
            </button>
          </div>
        ))}
        <div className={`h-12 flex justify-around items-center text-xs md:hidden ${mode === 'light' ? 'text-very-dark-grayish-blue' : 'text-dark-grayish-blue'}`}>
          <span>{filteredTodos.length} items left</span>
          <button onClick={clearCompleted}>Clear Completed</button>
        </div>
        <div className={`hidden md:flex justify-around items-center text-sm font-bold h-12 ${mode === 'light' ? 'text-dark-grayish-blue' : 'text-very-dark-grayish-blue'}`}>
          <span>{filteredTodos.length} items left</span>
          <div className='flex justify-center gap-5'>
            <button onClick={() => filterStatus('all')} className={`${filter === 'all' ? 'text-bright-blue' : ''} ${mode === 'light' ? ' hover:text-very-dark-grayish-blue' :  'hover:text-light-grayish-blue'}`}>All</button>
            <button onClick={() => filterStatus('active')} className={`${filter === 'active' ? 'text-bright-blue' : '' } ${mode === 'light' ? ' hover:text-very-dark-grayish-blue' :  'hover:text-light-grayish-blue'}`}>Active</button>
            <button onClick={() => filterStatus('completed')} className={`${filter === 'completed' ? 'text-bright-blue' : ''} ${mode === 'light' ? ' hover:text-very-dark-grayish-blue' :  'hover:text-light-grayish-blue'}`}>Completed</button>
          </div>
          <button className={`${mode === 'light' ? ' hover:text-very-dark-grayish-blue' :  'hover:text-light-grayish-blue'}`} onClick={clearCompleted}>Clear Completed</button>
        </div>
      </section>
      <div className={`h-12 flex justify-evenly rounded-[5px] font-bold items-center text-xs md:text-base mt-4 shadow-sm md:hidden ${mode === 'light' ? 'bg-white text-dark-grayish-blue' : 'bg-dark-mode-input text-very-dark-grayish-blue'}`}>
        <button onClick={() => filterStatus('all')} className={`${filter === 'all' ? 'text-bright-blue' : ''}`}>All</button>
        <button onClick={() => filterStatus('active')} className={`${filter === 'active' ? 'text-bright-blue' : ''}`}>Active</button>
        <button onClick={() => filterStatus('completed')} className={`${filter === 'completed' ? 'text-bright-blue' : ''}`}>Completed</button>
      </div>
      <p className={`text-center text-sm md:text-base my-10 ${mode === 'light' ? 'text-dark-grayish-blue' : 'text-very-dark-grayish-blue'}`}>Drag and drop to reorder list</p>
    </>
  )
}
