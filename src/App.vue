<script setup>
import { getToken } from "@/utils/token"

import { ref, onMounted } from "vue"

const show = ref("getUbikeData")

onMounted(() => {
  const token = getToken()
  if (token) {
    console.log(show.value)
  }
})
</script>

<template>
  <nav class="flex gap-2">
    <RouterLink to="/getUbikeData"></RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
  <footer class="bg-blue-300 text-center font-sm">@2025 AUO 版權所有</footer>
</template>
