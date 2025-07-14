<script setup>
import { ref, computed } from "vue"
import axios from "axios"
import { setToken } from "@/utils/token"

const keyword = ref("")
const siteList = ref([])

const getUbikeData = async () => {
  const resp = await axios.get(
    "https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json",
    { mode: "cors" }
  )
  console.log(resp.data)
  siteList.value = resp.data
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
        <label class="label">請輸入要查詢站點的關鍵字</label>
        <input v-model.trim="keyword" type="keyword" class="input" />
      </div>
    </form>
  </section>
</template>
