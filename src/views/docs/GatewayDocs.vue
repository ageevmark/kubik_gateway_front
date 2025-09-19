<template>
  <div class="card-wrapper">
    <div class="doc-card">
      <h1>Soon...</h1>
    </div>
  </div>
</template>

<script setup>
// Пока динамического кода здесь не требуется.
// Можно добавить позже, если захочется документацию из API генерировать.
</script>

<style scoped>
.card {
    justify-content: flex-start !important;
}

.doc-card {
    width: 900px;
    background: #fff;
    padding: 2.5rem 2rem;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.15);
    display: flex;
    flex-direction: column;
    align-items: flex-start; 
}

ul {
  padding-left: 1.2rem;
  margin-bottom: 1rem;
}

li {
  margin-bottom: 0.5rem;
}

code {
  background-color: #f4f4f4;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: monospace;
}
</style>
