<!-- src/views/HomePage.vue -->
<script setup>
import { ref, onMounted } from 'vue'
import api from '@/utils/axios.js'

const health = ref(null)

const fetchHealth = async () => {
  const gatewayUrl = import.meta.env.VITE_GATEWAY_URL
  try {
    const res = await api.get(`${gatewayUrl}/health`)
    console.log('Health response:', res.data) // <- добавлено
    health.value = res.data
  } catch (err) {
    console.error(err)
    health.value = { status: 'error', error: err.message }
  }
}

onMounted(fetchHealth)
</script>

<template>
    <div class="homePage-wrapper">
        <div class="homePage-canvas">
<div class="p-6 flex flex-col items-center justify-center min-h-screen">
    <div v-if="health" class="mb-6 w-full max-w-3xl">
        <p>Status: 
            <span :class="{'text-green-600': health.status==='ok', 'text-red-600': health.status!=='ok'}">
            {{ health.status }}
            </span>
        </p>
        <p>Uptime: {{ health.server?.uptime }}s</p>
        <h2 class="mt-4 font-semibold">CPU</h2>
        <p>Cores: {{ health.cpu?.cores }}</p>
        <p>Load Average: {{ health.cpu?.loadAverage?.join(', ') }}</p>

        <h2 class="mt-4 font-semibold">Memory</h2>
        <p>RSS: {{ health.server?.memory?.rss }}</p>
        <p>Heap Total: {{ health.server?.memory?.heapTotal }}</p>
        <p>Heap Used: {{ health.server?.memory?.heapUsed }}</p>
        <p>External: {{ health.server?.memory?.external }}</p>

        <h2 class="mt-4 font-semibold">OS</h2>
        <p>Platform: {{ health.server?.os?.platform }}</p>
        <p>Release: {{ health.server?.os?.release }}</p>
        <p>Free Memory: {{ health.server?.os?.freeMemory }}</p>
        <p>Total Memory: {{ health.server?.os?.totalMemory }}</p>
        <p class="mt-4 text-gray-500 text-sm">Timestamp: {{ health.timestamp }}</p>
    </div>

    <div v-else>
      <p>Checking health...</p>
    </div>
  </div>
        </div>
    </div>
  
</template>