<template>
  <div class="layout-header">
    <a @click="$router.push('/')" class="layout-header-linkToHome">
      <h1>KUBIK Gateway</h1>
    </a>
    <div class="layout-header-links">
      <a @click="$router.push('/admin/admindocs')" class="layout-header-link">Admin doc</a>
      <a @click="$router.push('/admin/gatewaydocs')" class="layout-header-link">Gateway doc</a>
      <a @click="logout" class="layout-header-link">Logout</a>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('role')
  router.push('/')
}
</script>