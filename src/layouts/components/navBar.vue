<!-- src\layouts\components\navBar.vue -->

<template>
  <div class="layout-navBar">
    <div class="layout-navBar-links">
      <a
        @click.prevent="$router.push('/admin')"
        class="layout-header-link"
        :class="{ active: isActive('/admin') }"
        :aria-current="isActive('/admin') ? 'page' : null"
      >
        Dashboard
      </a>

      <a
        @click.prevent="$router.push('/admin/clients')"
        class="layout-header-link"
        :class="{ active: isActive('/admin/clients') }"
        :aria-current="isActive('/admin/clients') ? 'page' : null"
      >
        Clients
      </a>

      <a
        @click.prevent="$router.push('/admin/apikeys')"
        class="layout-header-link"
        :class="{ active: isActive('/admin/apikeys') }"
        :aria-current="isActive('/admin/apikeys') ? 'page' : null"
      >
        API keys
      </a>

      <a
        @click.prevent="$router.push('/admin/microservices')"
        class="layout-header-link"
        :class="{ active: isActive('/admin/microservices') }"
        :aria-current="isActive('/admin/microservices') ? 'page' : null"
      >
        Microservices
      </a>

      <a
        @click.prevent="$router.push('/admin/users')"
        class="layout-header-link"
        :class="{ active: isActive('/admin/users') }"
        :aria-current="isActive('/admin/users') ? 'page' : null"
      >
        Users
      </a>
    </div>

    <div class="layout-navBar-btns">
      <button class="button button--secondary button--h-small" v-if="showAdd" @click="goAdd">➕ Add</button>
      <button class="button button--secondary button--h-small" @click="refreshPage">🔄 Refresh</button>
      <button class="button button--secondary button--h-small" @click="reloadCache">⟳ Reload cache</button>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import api from '@/utils/axios.js'
import { handleError, handleSuccess } from '@/utils/toastHandler.js'

const route = useRoute()
const router = useRouter()

const normalizePath = (p) => {
  if (!p) return '/'
  const trimmed = p.replace(/\/+$/, '')
  return trimmed === '' ? '/' : trimmed
}

const isActive = (path) => {
  const current = normalizePath(route.path)
  const target = normalizePath(path)

  if (target === '/admin') {
    return current === '/admin'
  }

  return current === target || current.startsWith(`${target}/`)
}

const showAdd = computed(() => {
  const current = normalizePath(route.path)
  const sections = ['/admin/users', '/admin/apikeys', '/admin/clients', '/admin/microservices']
  return sections.some((s) => current === s || current.startsWith(`${s}/`))
})

const goAdd = () => {
  const addPath = `${route.path.replace(/\/$/, '')}/add`
  router.push(addPath)
}

const refreshPage = () => {
  router.go(0)
}

const reloadCache = async () => {
  try {
    await api.post('/admin/reload_cache')
    handleSuccess('Cache has been reloaded successfully')
  } catch (err) {
    console.error(err)
    handleError(err)
  }
}
</script>