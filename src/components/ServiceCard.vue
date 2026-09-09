<script setup lang="ts">
import type { Service } from "../types/service";

const props = defineProps<{ service: Service }>();

const statusLabel: Record<Service["status"], string> = {
  active: "Active",
  planned: "Planned",
  maintenance: "Maintenance",
};

const isNavigable = props.service.status === "active";
</script>

<template>
  <component
    :is="isNavigable ? 'a' : 'div'"
    class="card"
    :class="[`status-${service.status}`, { disabled: !isNavigable }]"
    v-bind="isNavigable ? { href: service.url, target: '_blank', rel: 'noopener noreferrer' } : {}"
  >
    <div class="card-header">
      <h2 class="card-title">{{ service.name }}</h2>
      <span class="status-badge" :class="`status-${service.status}`">{{ statusLabel[service.status] }}</span>
    </div>
    <p class="card-description">{{ service.description }}</p>
    <span class="card-action">{{ isNavigable ? "이동하기 →" : "준비 중" }}</span>
  </component>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  background: var(--card-bg);
  text-decoration: none;
  color: inherit;
  transition: border-color 0.15s ease, transform 0.15s ease, box-shadow 0.15s ease;
}

.card:not(.disabled):hover {
  border-color: var(--accent-color);
  box-shadow: var(--card-shadow);
  transform: translateY(-2px);
}

.card:not(.disabled):focus-visible {
  outline: 2px solid var(--accent-color);
  outline-offset: 2px;
}

.card.disabled {
  cursor: default;
  opacity: 0.6;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.card-title {
  font-size: 1.05rem;
  font-weight: 600;
  margin: 0;
}

.card-description {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.5;
  flex-grow: 1;
}

.card-action {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--accent-color);
}

.card.disabled .card-action {
  color: var(--text-secondary);
}

.status-badge {
  flex-shrink: 0;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
}

.status-badge.status-active {
  color: var(--status-active-text);
  background: var(--status-active-bg);
}

.status-badge.status-planned {
  color: var(--status-planned-text);
  background: var(--status-planned-bg);
}

.status-badge.status-maintenance {
  color: var(--status-maintenance-text);
  background: var(--status-maintenance-bg);
}
</style>
