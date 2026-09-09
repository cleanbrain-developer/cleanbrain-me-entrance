<script setup lang="ts">
import type { Service } from "../types/service";
import ServiceCard from "./ServiceCard.vue";

defineProps<{ services: Service[] }>();
</script>

<template>
  <div class="grid">
    <ServiceCard v-for="service in services" :key="service.id" :service="service" />
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1rem;
}
</style>
