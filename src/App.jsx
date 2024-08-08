import { useState } from 'react'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Background } from './components/Background'
import { NewTodo } from './components/NewTodo'
import { Todos } from './components/Todos'

export function App() {
  const [mode, setMode] = useState('light')
  const [todos, setTodos] = useState([])

  const changeMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light')
  }

  return (
    <>
      <div className={`relative h-screen ${mode === 'light' ? 'bg-very-light-gray' : 'bg-black'}`}>
       <Background mode={mode} />
        <main className='flex flex-col px-[26px] pt-12 md:pt-[70px] w-full sm:w-[540px] m-auto absolute top-0 left-1/2 -translate-x-1/2'>
          <Header mode={mode} changeMode={changeMode} />
          <NewTodo mode={mode} />
          <Todos todos={todos} setTodos={setTodos} mode={mode} />
          <Footer mode={mode} />
        </main>
      </div>
    </>
  )
}
