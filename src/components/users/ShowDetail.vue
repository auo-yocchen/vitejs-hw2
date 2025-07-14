<script setup>
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

</script>

<template>
    <li v-for="(l, i) in filteredSites" :key="l.sno" class="mb-2">
    {{ i + 1 }}.
    
    <button @click="() => addLike(l.sna)" class="btn btn-large">新增到我的最愛</button>
    <a :href="l.u --" target="_blank" class="text-blue-600 underline">{{ l.sna }}</a> (可租：{{ l.available_rent_bikes }}) (可還：{{ l.available_return_bikes }})
    
    
    <button 
        @click="toggleCollapse(l.sno)" 
        class="btn btn-sm"
        >
        {{ openSnos.includes(l.sno) ? '收起' : '展開' }}
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
</template>