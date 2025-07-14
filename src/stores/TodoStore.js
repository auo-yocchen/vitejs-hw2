import { defineStore } from "pinia"
import { ref } from "vue"
import axios from "axios"
import { getToken } from "@/utils/token"

axios.defaults.headers.common["Authorization"] = getToken()

const useTodoStore = defineStore("todos", () => {
  const todos = ref([])
  const token = ref("")

  const toggleTodo = (id) => {
    const todo = todos.value.find((t) => t.id == id)

    if (todo.completed_at) {
      todo.completed_at = null
    } else {
      todo.completed_at = new Date().toLocaleString()
    }

    axios.patch(`https://todoo.5xcamp.us/todos/${id}/toggle`)
  }

  const deleteTodo = (id) => {
    const idx = todos.value.findIndex((t) => t.id == id)
    todos.value.splice(idx, 1)
    axios.delete(`https://todoo.5xcamp.us/todos/${id}`)
  }

  const addTodo = async (content) => {
    try {
      const formData = {
        todo: {
          content: content,
        },
      }

      const uuid = crypto.randomUUID()

      todos.value.unshift({
        id: uuid,
        content: content,
        completed_at: null,
      })

      const { data } = await axios.post(
        "https://todoo.5xcamp.us/todos",
        formData
      )
      const todo = todos.value.find((t) => t.id == uuid)
      todo.id = data.id
    } catch (err) {
      console.log(err)
    }
  }

  const getTodos = async () => {
    const { data } = await axios.get("https://todoo.5xcamp.us/todos")
    todos.value = data.todos
  }

  const updateTodo = (id, content) => {
    const formData = {
      todo: {
        content,
      },
    }

    axios.put(`https://todoo.5xcamp.us/todos/${id}`, formData)
  }

  return { token, todos, toggleTodo, deleteTodo, addTodo, getTodos, updateTodo }
})

export { useTodoStore }
