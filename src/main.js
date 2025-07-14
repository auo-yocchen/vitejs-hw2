import { createApp } from "vue"
import { createPinia } from "pinia"
import {
  createWebHistory,
  createWebHashHistory,
  createRouter,
} from "vue-router"
import { getToken } from "@/utils/token"
import App from "./App.vue"
import "./style.css"

import GetUbikeData from "@/components/users/GetUbikeData.vue"
// import Todo from "@/components/ui/Todo.vue"

const routes = [{ path: "/GetUbikeData", component: GetUbikeData }]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, _from, next) => {
  const token = getToken()
  if (to.path === "/") {
    next("/GetUbikeData")
  } else {
    next()
  }
})

const pinia = createPinia()

createApp(App).use(pinia).use(router).mount("#app")

// const app = createApp(App)
// app.use(pinia)
// app.mount('#app')
