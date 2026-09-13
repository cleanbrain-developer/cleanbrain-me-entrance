# Architecture Overview

## Architectural style

Entrance is a static, stateless single-page Vue application. There is no server-side logic, no API, and no persistence layer. All "business logic" is a data-to-view mapping: a config array of services rendered as cards.

```text
src/config/services.ts (Service[] data)
    ↓
src/App.vue
    ↓
src/components/ServiceGrid.vue
    ↓
src/components/ServiceCard.vue  ──(plain <a href>)──>  external subdomain
```

## Layers

### Domain data

`src/types/service.ts` defines the `Service` shape; `src/config/services.ts` is the single list of services and their metadata. This is the only place service information should be edited — UI components must not hardcode a service.

### Presentation

`ServiceGrid.vue` groups services by `category` (a section with a heading per distinct category, sorted alphabetically by category name) and lays out each group's cards responsively — always sectioned, even with a single category, so the structure doesn't change shape as services are added later. `ServiceCard.vue` renders one service's name, description, status badge, and — only when `status === "active"` — a real `<a>` link that opens the target in a new tab. Non-active services render as non-interactive.

### Entry

`App.vue` composes the header and `ServiceGrid`; `main.ts` mounts the app. There is no router — the page has exactly one view.

### Internationalization

`src/i18n/locale.ts` detects `"ko"` vs `"en"` from the browser's `navigator.languages`/`navigator.language` — not IP/geo-based country detection, since this is a backend-less static site with no request to inspect server-side. Anything that isn't Korean falls back to English. `src/i18n/strings.ts` holds the UI chrome strings (subtitle, meta description, card action labels) per locale; `Service.descriptionEn` is an optional per-service override consumed by `ServiceCard.vue`, falling back to `Service.description` (Korean) when absent. `App.vue` sets `document.documentElement.lang` and the `<meta name="description">` content on mount, since `index.html` itself is locale-agnostic static markup. This client-only switch is also why `index.html`'s Open Graph/Twitter Card meta tags are fixed in Korean — a link-preview crawler that doesn't execute JavaScript sees only the static markup, so there is no per-visitor-locale preview without SSR.

The detected locale is only the *default* — a KO/EN toggle in `App.vue`'s header lets a visitor override it. `locale` is a `ref`, not a plain value; a click calls `setLocale()`, which updates the ref (everything downstream is reactive through the existing `:locale` prop chain) and persists the choice via `src/i18n/locale.ts`'s `storeLocale()`/`loadStoredLocale()` (`localStorage`, wrapped defensively since it can throw in private browsing). A stored choice takes precedence over `detectLocale()` on the next visit; there is intentionally no third "auto" state to switch back to; toggling to the other language *is* the override, permanently until toggled again.

## External integrations

Each listed service is an independently deployed subdomain (e.g. `english-core-speaking.education.cleanbrain.me`). Entrance's only integration with them is a static URL in the service config — it does not call their APIs, share sessions, or depend on their availability at build or runtime.

## Deployment target

The build output is a static bundle meant to be served by a lightweight container (e.g. nginx) inside the `cleanbrain-me-infra` Kubernetes cluster, under the `cleanbrain-me-entrance` namespace convention, sharing the cluster's existing Gateway rather than provisioning new cluster-level resources. Kubernetes manifests themselves live in `cleanbrain-me-infra`, not in this repository.

## Constraints agents must preserve

- Stateless: no client- or server-side persistence beyond the browser tab.
- Config-driven service metadata: never hardcode a service into a component.
- No proxying: navigation is always a real browser navigation to the service's own origin, never a request Entrance forwards or fetches on the user's behalf.
- Target cluster is 2 vCPU / 4 GB RAM / 40 GB disk — keep the runtime footprint of the served bundle and its container minimal.
