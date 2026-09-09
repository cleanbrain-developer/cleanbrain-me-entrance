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

`ServiceGrid.vue` groups services by `category` (a section per distinct category, in first-seen order) and lays out each group's cards responsively; group headings only render once there's more than one category, so a single-category catalog stays as plain a grid as before. `ServiceCard.vue` renders one service's name, description, status badge, and — only when `status === "active"` — a real `<a>` link that opens the target in a new tab. Non-active services render as non-interactive.

### Entry

`App.vue` composes the header and `ServiceGrid`; `main.ts` mounts the app. There is no router — the page has exactly one view.

## External integrations

Each listed service is an independently deployed subdomain (e.g. `english-core-speaking.cleanbrain.me`). Entrance's only integration with them is a static URL in the service config — it does not call their APIs, share sessions, or depend on their availability at build or runtime.

## Deployment target

The build output is a static bundle meant to be served by a lightweight container (e.g. nginx) inside the `cleanbrain-me-infra` Kubernetes cluster, under the `cleanbrain-me-entrance` namespace convention, sharing the cluster's existing Gateway rather than provisioning new cluster-level resources. Kubernetes manifests themselves live in `cleanbrain-me-infra`, not in this repository.

## Constraints agents must preserve

- Stateless: no client- or server-side persistence beyond the browser tab.
- Config-driven service metadata: never hardcode a service into a component.
- No proxying: navigation is always a real browser navigation to the service's own origin, never a request Entrance forwards or fetches on the user's behalf.
- Target cluster is 2 vCPU / 4 GB RAM / 40 GB disk — keep the runtime footprint of the served bundle and its container minimal.
