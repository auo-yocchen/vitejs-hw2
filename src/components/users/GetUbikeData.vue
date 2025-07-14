<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";

const siteList = ref([]);
const likeList = ref([]);
const openSnos = ref([]) // 可以存放多個展開的站點SNO

const searchTerm = ref('')       // 輸入暫存
const searchKeyword = ref('')    // 真正篩選用的關鍵字

const notification = ref({ message: '', visible: false })

const showNotification = (msg) => {
  notification.value.message = msg
  notification.value.visible = true
  setTimeout(() => {
    notification.value.visible = false
  }, 2000) // 2秒後隱藏
}


const toggleCollapse = (sno) => {
  const index = openSnos.value.indexOf(sno)
  if (index === -1) {
    // 不在陣列中，加入（展開）
    openSnos.value.push(sno)
  } else {
    // 已在陣列中，收起
    openSnos.value.splice(index, 1)
  }
}

onMounted(() => {
  const storage = localStorage.getItem('likeList-strg');
  if (storage != undefined) {
    const result = JSON.parse(storage);
    console.log(result);
    likeList.value = result;
  }
});

const addLike = (sna) => {
  if (likeList.value.includes(sna)) {
    showNotification(`"${sna}" 已經在我的最愛中了！`)
  } else {
    likeList.value.push(sna)
    localStorage.setItem('likeList-strg', JSON.stringify(likeList.value))
    showNotification(`已加入 "${sna}" 到我的最愛`)
  }
}

const delLike = (i) => {
  likeList.value.splice(i, 1);
  localStorage.setItem('likeList-strg', JSON.stringify(likeList.value));
};

const clearLike = () => {
  likeList.value = [];
  localStorage.removeItem('likeList-strg');
};

const likedSites = computed(() => {
  return siteList.value.filter(l => likeList.value.includes(l.sna));
});

const getUbikeData = async () => {
  try {
    const resp = await axios.get(
      "https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json",
      { mode: "cors" }
    )
    siteList.value = resp.data
  } catch (error) {
    console.error("Failed to fetch data:", error)
  }
}

const updateSearchKeyword = () => {
  searchKeyword.value = searchTerm.value
}

const filteredSites = computed(() => {
  if (!searchKeyword.value) return siteList.value
  const lowerKeyword = searchKeyword.value.toLowerCase()
  return siteList.value.filter(site =>
    site.sna && site.sna.toLowerCase().includes(lowerKeyword)
  )
})



// Optionally fetch data on component mount
onMounted(() => {
  getUbikeData()
})

// Clear function (if needed)
const clearAll = () => {
  keyword.value = ""
}
</script>

<template>
  <section class="container mx-auto p-4">
    
    <h1 class="text-3xl">我的最愛專區</h1>
    <button @click="clearLike" class="btn btn-large">清空我的最愛</button>
    <hr class="my-4" />

    <ul>
      <li v-for="(l, i) in likedSites" :key="l.sno" class="mb-2">
        {{ i + 1 }}.
        <button @click="delLike(l.sna)" class="btn btn-large">刪除</button>
        <a :target="_blank" class="text-blue-600 underline">{{ l.sna }}</a> 
        (可租：{{ l.available_rent_bikes }}) (可還：{{ l.available_return_bikes }})

        <button 
            @click="toggleCollapse(l.sno)" 
            class="btn btn-sm"
          >
            {{ openSnos.includes(l.sno) ? '隱藏詳情' : '查看詳情' }}
        </button>
        <!-- 顯示或隱藏詳細資訊 -->
        <div v-if="openSnos.includes(l.sno)" class="mt-2 p-2 bg-gray-100 border rounded">
          <p><strong>更新時間:</strong> {{ l.mday }}</p>
          <p><strong>行政區:</strong> {{ l.sarea }}</p>
          <p><strong>地址:</strong> {{ l.ar }}</p>
          <p><strong>Site Name:</strong> {{ l.snaen }}</p>
          <p><strong>Area:</strong> {{ l.sareaen }}</p>
          <p><strong>Addr.:</strong> {{ l.aren }}</p>

        </div>
      </li>
    </ul>
  </section>
  <section class="container mx-auto p-4">
    
    <h1 class="text-3xl">關鍵字搜尋專區</h1>
    <form class="flex flex-col gap-4">
      <div class="flex flex-col">
        <label class="label">請輸入要查詢站點的關鍵字</label>
        <input v-model.trim()="searchTerm" @keyup.enter="updateSearchKeyword" type="text" class="input" placeholder="輸入站點名稱" />
      </div>
    </form>

    <button @click="updateSearchKeyword" class="mt-2 px-4 py-2 bg-blue-500 text-white rounded">查詢</button>
    <button @click="clearAll" class="mt-2 px-4 py-2 bg-gray-300 text-black rounded">清空搜尋</button>

    <hr class="my-4" />

    <ul>
      <li v-for="(l, i) in filteredSites" :key="l.sno" class="mb-2">
        {{ i + 1 }}.
        
        <button @click="() => addLike(l.sna)" class="btn btn-large">加入最愛</button>
        <a :target="_blank" class="text-blue-600 underline">{{ l.sna }}</a> (可租：{{ l.available_rent_bikes }}) (可還：{{ l.available_return_bikes }})
        
        
        <button 
            @click="toggleCollapse(l.sno)" 
            class="btn btn-sm"
          >
            {{ openSnos.includes(l.sno) ? '隱藏詳情' : '查看詳情' }}
        </button>
        <!-- 顯示或隱藏詳細資訊 -->
        <div v-if="openSnos.includes(l.sno)" class="mt-2 p-2 bg-gray-100 border rounded">
          <p><strong>更新時間:</strong> {{ l.mday }}</p>
          <p><strong>行政區:</strong> {{ l.sarea }}</p>
          <p><strong>地址:</strong> {{ l.ar }}</p>
          <p><strong>Site Name:</strong> {{ l.snaen }}</p>
          <p><strong>Area:</strong> {{ l.sareaen }}</p>
          <p><strong>Addr.:</strong> {{ l.aren }}</p>

        </div>
      </li>
    </ul>
  </section>
</template>