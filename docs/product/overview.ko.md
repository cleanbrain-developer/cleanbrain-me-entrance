> 이 문서는 [`overview.md`](overview.md)의 한국어 번역본입니다. 영어 원본이 canonical이며, 충돌 시 영어 원본이 우선합니다.

# Product Overview

## Product

cleanbrain.me Entrance는 `cleanbrain.me` root domain에서 서빙되는 랜딩 페이지입니다. service directory/launcher입니다: `cleanbrain.me` 도메인 아래에서 운영되는 service들을 나열하고 방문자가 원클릭으로 그중 하나에 도달하게 합니다.

## Problem

`cleanbrain.me`는 현재 root에 페이지가 없습니다. service들은 subdomain(`english-core-speaking.education.cleanbrain.me`, 그리고 이후 `developer.cleanbrain.me` 등)에 존재하지만, bare domain에 도착한 방문자를 위해 이들을 하나로 묶어주는 것이 없습니다.

## Product thesis

Entrance는 infrastructure가 아니라 directory입니다. 나열된 service로 가는 트래픽을 proxy하거나, gate하거나, authenticate하지 않습니다 — 방문자가 그들을 찾고 열도록 도울 뿐입니다. 각 subdomain은 자신의 repository가 독립적으로 배포하고 소유하며, Entrance는 그 implementation으로부터 decoupled 상태를 유지합니다.

## Users

주요 사용자는 도메인 소유자(`cleanbrain.developer`)로, 나열된 모든 service를 운영하며 이 페이지를 사용해 이들을 소개합니다. 부차적인 사용자는 소유자가 `cleanbrain.me`를 공유한 누구든지이며, 이들은 사전 설명 없이도 이용 가능한 service를 이해하고 도달할 수 있어야 합니다.

## Open items

- Entrance가 service directory 자체를 넘어서는 2차 presentation surface(예: about/contact section)를 언젠가 필요로 할지는 미정입니다. V1은 그렇지 않다고 가정합니다.
