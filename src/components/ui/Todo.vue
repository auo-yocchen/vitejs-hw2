<script setup>
import { ref, onMounted } from "vue"
import TodoItem from "./TodoItem.vue"
import { useTodoStore } from "@/stores/TodoStore"

const store = useTodoStore()

const todoInput = ref("")

const onAddTodo = () => {
  const content = todoInput.value

  if (content != "") {
    store.addTodo(content)
    todoInput.value = ""
  }
}

onMounted(() => {
  store.getTodos()
})
</script>

<template>
  <section class="container mx-auto">
    <h1 class="text-2xl">今天你想做些什麼事...</h1>
    <div class="my-2">
      <input
        type="text"
        @keyup.enter="onAddTodo"
        v-model.trim="todoInput"
        class="input"
      />
      <button @click="onAddTodo" class="btn">新增</button>
    </div>
    <div class="divider"></div>

    <section class="grid grid-cols-1 sm:grid-cols-4 gap-4">
      <TodoItem :key="todo.id" :todo="todo" v-for="todo in store.todos" />
    </section>
  </section>
</template>
