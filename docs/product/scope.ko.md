> 이 문서는 [`scope.md`](scope.md)의 한국어 번역본입니다. 영어 원본이 canonical이며, 충돌 시 영어 원본이 우선합니다.

# Scope

## V1 in scope

- service를 card로 나열하는 단일 페이지: 이름, description, status, 원클릭 navigation.
- service metadata의 source가 되는 단일 config file(`id`, `name`, `description`, `descriptionEn`, `url`, `status`, 선택적 `category`/`external`).
- `prefers-color-scheme` 기반 light/dark styling을 가진 반응형 layout(desktop grid, mobile 단일 column), 수동 theme toggle 없음.
- 기본값은 한국어, 한국어가 아닌 브라우저 locale에는 영어(`navigator.language` 기반, IP/geo 감지 아님), per-browser로 기억되는 선택을 가진 수동 KO/EN toggle로 override 가능 — `docs/architecture/overview.md`의 "Internationalization" 참고.
- container image로 배포 가능한 static build.

## V1 out of scope

- 사용자 authentication이나 계정.
- 어떤 종류든 database나 persistent storage.
- 별도의 API/backend server.
- Reverse proxy나 API gateway 동작 — Entrance는 항상 plain URL을 통해 navigate하며, 나열된 service로의 request를 절대 proxy하지 않습니다.
- Deep navigation, modal, onboarding flow, 단순 hover/transition state를 넘어서는 animation.
- production 배포 설정(namespace, HTTPRoute, Gateway wiring) — `cleanbrain-me-infra` repository가 소유하며, 여기에 절대 중복하지 않습니다.

## Open decisions

- service metadata 형태의 선택적 `external` field는 아직 정의된 동작이 없습니다 — type에는 존재하지만 이를 기준으로 분기하는 곳이 없습니다. 실제 의미(예: same-tab vs new-tab navigation)를 부여할지, 아니면 load-bearing처럼 보이기 전에 제거할지 결정해야 합니다.
- `planned`(출시 전) entry를 언젠가 보여줄지, 아니면 service가 실재할 때만 나타나게 할지 — 현재 `planned` 상태인 service는 없지만 `ServiceStatus` type은 여전히 이를 허용합니다.
- `descriptionEn`은 선택적이며 현재 두 service에만 설정되어 있습니다 — service가 더 추가됨에 따라(lint rule이 없으므로 review 시점에 강제되는) required field로 만들지 결정해야, 새 entry가 조용히 한국어만으로 출시되는 것을 막을 수 있습니다.

## Scope rule

scope 밖 항목은 향후 확장을 막지 않을 정도로만 고려하세요. 실제 요구사항보다 앞서 placeholder screen, 사용하지 않는 config option, speculative abstraction을 추가하지 마세요.
