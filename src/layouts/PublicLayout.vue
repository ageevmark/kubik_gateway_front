<!-- src/modules/layouts/PublicLayout.vue -->
<template>
  <div class="layout">
    <Header />

    <main class="layout-main">
      <router-view />
    </main>

    <Footer />
  </div>
</template>

<script setup>
import Header from './components/publicHeader.vue'
import Footer from './components/footer.vue'
</script>