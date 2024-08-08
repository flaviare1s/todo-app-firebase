import { addDoc, collection, doc, getDocs, query, where } from 'firebase/firestore'
import { db } from './config'

export const todosCol = collection(db, 'todos')

export async function addTodo(data) {
  await addDoc(todosCol, data)
}

export async function getTodos() {
  const snapshot = await getDocs(todosCol)
  const todos = []

  snapshot.forEach((doc) => {
    todos.push({ ...doc.data(), id: doc.id })
  })

  return todos
}

export async function filterTodos(status) {
  const filter = query(todosCol, where('status', '==', status))

  const snapshot = await getDocs(filter)
  const todos = []

  snapshot.forEach((doc) => {
    todos.push({ ...doc.data(), id: doc.id })
  })

  return todos
}

export async function deleteTodo(id) {
  const todoDoc = doc(todosCol, id)
  await deleteTodo(todoDoc)
}
