<script setup lang="ts">
import { computed } from "vue";
import type { Service } from "../types/service";
import ServiceCard from "./ServiceCard.vue";

const props = defineProps<{ services: Service[] }>();

const UNCATEGORIZED = "General";

const groups = computed(() => {
  const order: string[] = [];
  const byCategory = new Map<string, Service[]>();

  for (const service of props.services) {
    const category = service.category ?? UNCATEGORIZED;
    if (!byCategory.has(category)) {
      byCategory.set(category, []);
      order.push(category);
    }
    byCategory.get(category)!.push(service);
  }

  return order.map((category) => ({ category, services: byCategory.get(category)! }));
});
</script>

<template>
  <div class="groups">
    <section v-for="group in groups" :key="group.category" class="group">
      <h2 class="group-title">{{ group.category }}</h2>
      <div class="grid">
        <ServiceCard v-for="service in group.services" :key="service.id" :service="service" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.groups {
  display: flex;
  flex-direction: column;
  gap: 2.25rem;
}

.group-title {
  margin: 0 0 0.9rem;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text-secondary);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1rem;
}
</style>
