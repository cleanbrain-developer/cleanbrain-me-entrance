# Scope

## V1 in scope

- A single page listing services as cards: name, description, status, one-click navigation.
- A single config file as the source of service metadata (`id`, `name`, `description`, `url`, `status`, optional `category`/`external`).
- Responsive layout (desktop grid, mobile single column) with `prefers-color-scheme`-based light/dark styling, no manual theme toggle.
- Static build deployable as a container image.

## V1 out of scope

- User authentication or accounts.
- A database or persistent storage of any kind.
- A separate API/backend server.
- Reverse proxy or API gateway behavior — Entrance always navigates via a plain URL, never proxies a request to a listed service.
- Deep navigation, modals, onboarding flows, or animation beyond simple hover/transition states.
- Production deployment configuration (namespace, HTTPRoute, Gateway wiring) — owned by the `cleanbrain-me-infra` repository, never duplicated here.

## Open decisions

- The optional `external` field on the service metadata shape has no defined behavior yet — it exists in the type but nothing branches on it. Decide whether to give it real meaning (e.g. same-tab vs new-tab navigation) or drop it before it looks load-bearing.
- No listed service is `planned` right now (the `developer` placeholder was removed from `src/config/services.ts` until that project actually exists) — decide whether a `planned` entry should ever be shown pre-launch, or only added once a service is real.

## Scope rule

Consider out-of-scope items only enough to avoid blocking future extension. Do not add placeholder screens, unused config options, or speculative abstractions ahead of a real requirement.
