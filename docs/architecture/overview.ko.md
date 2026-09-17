> 이 문서는 [`overview.md`](overview.md)의 한국어 번역본입니다. 영어 원본이 canonical이며, 충돌 시 영어 원본이 우선합니다.

# Architecture Overview

## Architectural style

Entrance는 static하고 stateless한 single-page Vue application입니다. server-side logic, API, persistence layer가 없습니다. 모든 "business logic"은 data-to-view mapping입니다: card로 렌더링되는 service의 config array입니다.

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

`src/types/service.ts`는 `Service` 형태를 정의하고, `src/config/services.ts`는 서비스와 그 metadata의 단일 목록입니다. service 정보를 수정해야 하는 유일한 곳이며 — UI 컴포넌트는 service를 hardcode해서는 안 됩니다.

### Presentation

`ServiceGrid.vue`는 service를 `category`별로 그룹화하고(카테고리 이름 알파벳 순으로 정렬된, distinct category마다 heading이 있는 section) 각 그룹의 card를 반응형으로 배치합니다 — category가 하나뿐이어도 항상 section으로 나뉘어, 나중에 service가 추가되어도 구조가 바뀌지 않습니다. `ServiceCard.vue`는 하나의 service의 이름, description, status badge, 그리고 `status === "active"`일 때만 새 탭에서 대상을 여는 실제 `<a>` 링크를 렌더링합니다. active가 아닌 service는 non-interactive하게 렌더링됩니다.

### Entry

`App.vue`는 header와 `ServiceGrid`를 조합하고, `main.ts`가 app을 mount합니다. router는 없습니다 — 페이지는 정확히 하나의 view만 가집니다.

### Internationalization

`src/i18n/locale.ts`는 브라우저의 `navigator.languages`/`navigator.language`로부터 `"ko"`와 `"en"`을 구분합니다 — IP/geo 기반 국가 감지가 아닙니다. 이는 server-side에서 검사할 request가 없는 backend-less static site이기 때문입니다. 한국어가 아닌 모든 경우는 영어로 fallback합니다. `src/i18n/strings.ts`는 locale별 UI chrome 문자열(subtitle, meta description, card action label)을 담고 있으며, `Service.descriptionEn`은 `ServiceCard.vue`가 사용하는 선택적인 service별 override이고, 없으면 `Service.description`(한국어)으로 fallback합니다. `index.html` 자체는 locale-agnostic한 static markup이므로 `App.vue`는 mount 시점에 `document.documentElement.lang`과 `<meta name="description">` content를 설정합니다. 이 client-only 전환 방식 때문에 `index.html`의 Open Graph/Twitter Card meta tag는 한국어로 고정되어 있습니다 — JavaScript를 실행하지 않는 link-preview crawler는 static markup만 보게 되므로, SSR 없이는 방문자별 locale preview가 존재할 수 없습니다.

감지된 locale은 어디까지나 *default*입니다 — `App.vue` header의 KO/EN toggle을 통해 방문자가 이를 override할 수 있습니다. `locale`은 plain value가 아니라 `ref`이며, 클릭 시 `setLocale()`이 호출되어 ref를 업데이트하고(하위 모든 것은 기존 `:locale` prop chain을 통해 반응형으로 동작합니다) `src/i18n/locale.ts`의 `storeLocale()`/`loadStoredLocale()`(`localStorage`, private browsing에서 throw할 수 있으므로 방어적으로 wrapping됨)을 통해 선택을 영속화합니다. 저장된 선택은 다음 방문 시 `detectLocale()`보다 우선하며, 의도적으로 되돌아갈 세 번째 "auto" 상태는 존재하지 않습니다. 다른 언어로 toggle하는 것 자체가 다시 toggle하기 전까지 영구적으로 유지되는 override입니다.

## External integrations

나열된 각 service는 독립적으로 배포된 subdomain입니다(예: `english-core-speaking.education.cleanbrain.me`). Entrance가 이들과 맺는 유일한 통합은 service config 안의 static URL이며 — 이들의 API를 호출하거나, session을 공유하거나, build/runtime 시점에 이들의 가용성에 의존하지 않습니다.

## Deployment target

build output은 `cleanbrain-me-infra` Kubernetes cluster 안에서 `cleanbrain-me-entrance` namespace convention 아래, 새로운 cluster-level resource를 provisioning하지 않고 cluster의 기존 Gateway를 공유하며 경량 container(예: nginx)로 서빙되도록 만들어진 static bundle입니다. Kubernetes manifest 자체는 이 repository가 아니라 `cleanbrain-me-infra`에 있습니다.

## Constraints agents must preserve

- Stateless: 브라우저 tab 외의 client-side 또는 server-side persistence가 없습니다.
- Config-driven service metadata: service를 컴포넌트에 hardcode하지 않습니다.
- No proxying: navigation은 항상 service 자체 origin으로의 실제 브라우저 navigation이며, Entrance가 사용자를 대신해 forward하거나 fetch하는 request가 아닙니다.
- Target cluster는 2 vCPU / 4 GB RAM / 40 GB disk입니다 — 서빙되는 bundle과 container의 runtime footprint를 최소한으로 유지하세요.
