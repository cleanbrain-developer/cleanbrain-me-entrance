<script setup lang="ts">
import { onMounted, ref } from "vue";
import ServiceGrid from "./components/ServiceGrid.vue";
import { services } from "./config/services";
import { fetchAllTimeCount, fetchTodayCount, recordVisitOnce } from "./lib/visitorCounter";
import { detectLocale } from "./i18n/locale";
import { strings } from "./i18n/strings";

const locale = detectLocale();
const todayCount = ref<number | null>(null);
const allTimeCount = ref<number | null>(null);

onMounted(async () => {
  document.documentElement.lang = locale;
  document.querySelector('meta[name="description"]')?.setAttribute("content", strings[locale].metaDescription);

  await recordVisitOnce();
  todayCount.value = await fetchTodayCount();
  allTimeCount.value = await fetchAllTimeCount();
});
</script>

<template>
  <div class="page">
    <header class="header">
      <h1>cleanbrain.me</h1>
      <p class="subtitle">
        {{ strings[locale].subtitle }}
        <span v-if="todayCount !== null" class="visitor-count">
          · {{ strings[locale].visitorCountPrefix }} {{ todayCount }}
        </span>
        <span v-if="allTimeCount !== null" class="visitor-count">
          · {{ strings[locale].allTimeCountPrefix }} {{ allTimeCount }}
        </span>
      </p>
    </header>
    <main>
      <ServiceGrid :services="services" :locale="locale" />
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

.visitor-count {
  color: var(--text-secondary);
  opacity: 0.8;
}
</style>
