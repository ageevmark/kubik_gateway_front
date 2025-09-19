<template>
  <div class="layout-header">
    <a @click="$router.push('/')" class="layout-header-link-toHome">
      <h1>KUBIK Gateway</h1>
    </a>

    <div class="layout-header-links">
      <a
        v-if="hasToken"
        @click="$router.push('/admin')"
        class="layout-header-link"
      >
        To Admin Panel
      </a>
      <a
        v-else
        @click="$router.push('/login')"
        class="layout-header-link"
      >
        Login
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const hasToken = ref(false)

onMounted(() => {
  hasToken.value = !!localStorage.getItem('token')
})
</script>