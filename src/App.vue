<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import ServiceGrid from "./components/ServiceGrid.vue";
import { services } from "./config/services";
import { fetchAllTimeCount, fetchTodayCount, recordVisitOnce } from "./lib/visitorCounter";
import { detectLocale, loadStoredLocale, storeLocale, type Locale } from "./i18n/locale";
import { strings } from "./i18n/strings";

// A stored manual choice (from the toggle below) wins over the browser's
// detected locale; otherwise fall back to detection (Korean in Korea,
// English everywhere else) same as before the toggle existed.
const locale = ref<Locale>(loadStoredLocale() ?? detectLocale());
const todayCount = ref<number | null>(null);
const allTimeCount = ref<number | null>(null);

function applyLocaleToDocument(value: Locale) {
  document.documentElement.lang = value;
  document.querySelector('meta[name="description"]')?.setAttribute("content", strings[value].metaDescription);
}

function setLocale(value: Locale) {
  locale.value = value;
  storeLocale(value);
}

watch(locale, applyLocaleToDocument);

onMounted(async () => {
  applyLocaleToDocument(locale.value);

  await recordVisitOnce();
  todayCount.value = await fetchTodayCount();
  allTimeCount.value = await fetchAllTimeCount();
});
</script>

<template>
  <div class="page">
    <header class="header">
      <div class="header-top">
        <h1>cleanbrain.me</h1>
        <div class="locale-toggle" role="group" aria-label="Language">
          <button
            type="button"
            class="locale-button"
            :class="{ active: locale === 'ko' }"
            :aria-pressed="locale === 'ko'"
            @click="setLocale('ko')"
          >
            KO
          </button>
          <span class="locale-divider" aria-hidden="true">/</span>
          <button
            type="button"
            class="locale-button"
            :class="{ active: locale === 'en' }"
            :aria-pressed="locale === 'en'"
            @click="setLocale('en')"
          >
            EN
          </button>
        </div>
      </div>
      <p class="subtitle">{{ strings[locale].subtitle }}</p>
      <p v-if="todayCount !== null || allTimeCount !== null" class="visitor-count">
        <span v-if="todayCount !== null">{{ strings[locale].visitorCountPrefix }} {{ todayCount }}</span>
        <span v-if="todayCount !== null && allTimeCount !== null"> · </span>
        <span v-if="allTimeCount !== null">{{ strings[locale].allTimeCountPrefix }} {{ allTimeCount }}</span>
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

.header-top {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.35rem;
}

.header h1 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.locale-toggle {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  flex-shrink: 0;
}

.locale-button {
  padding: 0;
  border: none;
  background: none;
  font: inherit;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--text-secondary);
  cursor: pointer;
}

.locale-button.active {
  color: var(--accent-color);
}

.locale-button:not(.active):hover {
  color: var(--text-primary);
}

.locale-button:focus-visible {
  outline: 2px solid var(--accent-color);
  outline-offset: 2px;
  border-radius: 2px;
}

.locale-divider {
  color: var(--border-color);
  font-size: 0.8rem;
}

.subtitle {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.95rem;
}

.visitor-count {
  margin: 0.35rem 0 0;
  color: var(--text-secondary);
  font-size: 0.8rem;
}
</style>
