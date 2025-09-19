<template>
  <aside :class="['bg-gray-900 text-white', isExpanded ? 'w-64' : 'w-16']" class="transition-all duration-300 min-h-screen">
    <nav class="flex flex-col p-4 gap-2">
      <router-link to="/admin/clients" class="hover:bg-gray-700 rounded p-2">Clients</router-link>
      <router-link to="/admin/keys" class="hover:bg-gray-700 rounded p-2">API Keys</router-link>
    </nav>
  </aside>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  isExpanded: { type: Boolean, default: true }
})
</script>
