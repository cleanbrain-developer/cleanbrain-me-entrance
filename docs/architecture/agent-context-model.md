# Agent Context Model

## Context classes

### Permanent context

Information that persists across sessions, including project purpose, scope, architecture, engineering principles, and accepted decisions. Store it in `PROJECT.yaml`, `.ai/constitution/`, `docs/product/`, `docs/architecture/`, and `docs/decisions/`.

### Working context

Information that changes with progress, including the current phase, recently completed work, next actions, and open decisions. Store it in `docs/status/current-state.md`.

### Task context

The current user request, relevant code, and temporary research findings. Load it only when needed. If it gains durable value, persist it in the appropriate permanent or working source.

## Bootstrap order

1. Start from the relevant agent adapter (`AGENTS.md` or `CLAUDE.md`).
2. Read `PROJECT.yaml` to identify the project and phase.
3. Read `.ai/constitution/` to understand behavioral boundaries.
4. Read `docs/product/` to understand purpose and scope.
5. Read `docs/architecture/` to understand structure and responsibilities.
6. Read accepted ADRs under `docs/decisions/` relevant to the current work.
7. Read `docs/status/current-state.md` to recover the current position and next work.
8. Inspect repository evidence relevant to the request.
9. Plan, change, verify, and review.
10. Persist durable decisions and working-state changes in the repository.

## Conflict handling

- A user request defines the work objective but does not silently discard accepted architecture.
- A specific accepted ADR takes precedence over a general architecture description.
- `current-state.md` does not redefine principles or design.
- Differences between adapters do not change the shared source of truth.
- Report unresolved conflicts instead of hiding them behind assumptions.

## Bootstrap acceptance test

In a clean session, provide only the entry adapter and no external link. Context recovery succeeds when the agent answers the five acceptance questions in `docs/product/goals.md` ("Success criteria"), with every answer traceable to repository documentation.
