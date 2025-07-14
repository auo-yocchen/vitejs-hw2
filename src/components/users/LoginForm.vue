<script setup>
import { ref, computed } from "vue"
import axios from "axios"
import { setToken } from "@/utils/token"

const emits = defineEmits(["go_register", "login_success"])

const email = ref("")
const password = ref("")
const canLogin = computed(() => {
  return email.value != "" && password.value != ""
})

const login = async () => {
  const formData = {
    user: {
      email: email.value,
      password: password.value,
    },
  }

  try {
    const resp = await axios.post(
      "https://todoo.5xcamp.us/users/sign_in",
      formData
    )
    const token = resp.headers.authorization
    setToken(token)
    clearAll()
    emits("login_success")
  } catch (err) {
    const message = err.response.data.message
    alert(message)
  }
}

const clearAll = () => {
  email.value = ""
  password.value = ""
}
</script>

<template>
  <section class="container mx-auto">
    <form class="flex flex-col gap-4">
      <div class="flex flex-col">
        <label class="label">Email</label>
        <input v-model.trim="email" type="email" class="input" />
      </div>

      <div class="flex flex-col">
        <label class="label">密碼</label>
        <input v-model.trim="password" type="password" class="input" />
      </div>

      <div>
        <button @click.prevent="login" :disabled="!canLogin" class="btn">
          登入
        </button>
      </div>
      <span
        >還沒有帳號嗎？<RouterLink to="/register">註冊</RouterLink>一個吧</span
      >
    </form>
  </section>
</template>
