<!-- src/modules/layouts/AdminLayout.vue -->
<template>
    <div class="layout">
      <Header />

      <main class="layout-main">
        <Navbar />
        <router-view />
      </main>

      <Footer />
    </div>
</template>

<script setup>
import Header from './components/adminHeader.vue'
import Footer from './components/footer.vue'
import Navbar from './components/navBar.vue'
</script>

