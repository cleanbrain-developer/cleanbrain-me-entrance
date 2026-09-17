> 이 문서는 [`engineering-principles.md`](engineering-principles.md)의 한국어 번역본입니다. 영어 원본이 canonical이며, 충돌 시 영어 원본이 우선합니다.

# Engineering Principles

이 문서는 이 repository에서 기술 선택이나 개별 feature보다 오래 지속되어야 할 engineering 원칙을 정의합니다.

## Evidence before change

기존 documentation과 implementation을 먼저 확인합니다. assumption보다 repository 증거를 우선하고, 검증되지 않은 구조를 근거로 변경을 제안하지 않습니다.

## Minimal, coherent change

요구사항을 충족하는 가장 작고 일관된 변경을 선호합니다. 이것은 platform이 아니라 single-page service directory입니다 — 실제 요구가 강제하기 전까지 backend, database, authentication, routing layer를 추가하지 않습니다.

## Explicit architecture

architectural boundary나 convention을 조용히 바꾸지 않습니다. 장기적 영향을 가지거나 되돌리기 어려운 decision(예: config-driven service metadata에서 벗어나는 것, Entrance를 proxy로 바꾸는 것)을 드러내고, 구현 전이나 구현과 함께 ADR에 기록합니다.

## Verifiable outcomes

검증 가능한 결과물을 만듭니다. build와 typecheck가 존재하면 실행하고, 그렇지 않다면 검증 방법과 그 한계를 명시합니다. 판단이 필요한 guidance와 code, test, linter, CI로 강제되어야 하는 규칙을 구분합니다.

## Config over code for service metadata

Service identity, description, status, URL은 UI 컴포넌트가 아니라 단일 config source에 있어야 합니다. 서비스를 추가하거나 업데이트하는 것이 presentation 컴포넌트를 건드리는 것을 요구해서는 안 됩니다.

## Separated boundaries

domain concern(service metadata, presentation)을 external system이나 tooling(build tool, container runtime, Kubernetes 배포)과 분리합니다. 배포와 infrastructure 관련 사항은 이 repository의 source tree가 아니라 `cleanbrain-me-infra` repository에 속합니다.
