<script setup lang="ts">
import ServiceGrid from "./components/ServiceGrid.vue";
import { services } from "./config/services";
</script>

<template>
  <div class="page">
    <header class="header">
      <h1>cleanbrain.me</h1>
      <p class="subtitle">개인 프로젝트/서비스 Entrance</p>
    </header>
    <main>
      <ServiceGrid :services="services" />
    </main>
  </div>
</template>

<style scoped>
.page {
  max-width: 960px;
  margin: 0 auto;
  padding: 3rem 1.5rem 4rem;
}

.header {
  margin-bottom: 2.5rem;
}

.header h1 {
  margin: 0 0 0.35rem;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.subtitle {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.95rem;
}
</style>
