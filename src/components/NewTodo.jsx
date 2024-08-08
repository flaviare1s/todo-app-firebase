import { useForm } from "react-hook-form"
import { addTodo } from "../firebase/todos"

export const NewTodo = ({ mode, fetchTodos }) => {
  const { register, handleSubmit, reset } = useForm()

  function onSubmitTodo(data) {
    addTodo(data).then(() => {
      fetchTodos()
      reset()
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmitTodo)} className="relative">
      <input 
        className={`font-josefin-sans text-very-dark-grayish-blue text-xs md:text-base h-12 md:h-16 w-full mt-10 rounded-[5px] px-[52px] placeholder:text-dark-grayish-blue placeholder:text-xs md:placeholder:text-base ${mode === 'light' ? 'bg-white' : 'bg-dark-mode-input'}`} 
        type="text" 
        placeholder="Create a new todo..." 
        {...register('title', { required: true })}
      />
      <span className={`h-5 w-5 border rounded-full absolute top-[52px] md:top-[60px] left-[20px] ${mode === 'light' ? 'border-light-grayish-blue' : 'border-very-dark-grayish-blue'}`}></span>
    </form>
  )
}
