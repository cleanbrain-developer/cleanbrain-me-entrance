# Repository Structure

## Responsibility map

| Path | Owner responsibility | Must not become |
|---|---|---|
| `README.md` | Human introduction, dev/build commands, navigation to canonical docs | Full design specification |
| `PROJECT.yaml` | Structured project identity, phase, and pinned standard versions | Narrative architecture document |
| `AGENTS.md` | The sole bootstrap adapter and behavioral contract for every supported agent | Common policy source, or one of several duplicate adapters |
| `.specify/memory/constitution.md` | Durable engineering principles (GitHub Spec Kit's own constitution role) | Product feature requirements |
| `.ai/constitution/documentation-policy.md` | Document ownership and the `.ko.md` language policy — no open standard owns this | Product feature requirements or engineering principles (those live in `.specify/memory/constitution.md`) |
| `docs/product/` | Problem, users, goals, scope | Implementation instructions |
| `docs/architecture/` | Structure, boundaries, context model | Decision history |
| `docs/decisions/` | Significant decisions and rationale | Mutable current-state checklist |
| `docs/status/current-state.md` | Current phase, progress, next work | Permanent policy or changelog |
| `src/config/services.ts` | Service metadata (single source) | Presentation logic |
| `src/components/` | Presentation of service metadata | Service data definitions |

## Dependency direction

`AGENTS.md` and summaries may point inward to authoritative documents. Authoritative documents do not depend on adapter wording or external conversation history.

```text
README ──────────────────┐
AGENTS.md ────────────────┼──> PROJECT.yaml + .specify/memory/constitution.md + docs
current-state.md ─────────┘                 │
                                            └──> accepted ADRs
```

`PROJECT.yaml` lists canonical locations for discovery but does not duplicate their narrative content.

## Directory policy

Add a directory only when a file has a real responsibility within it. `docs/guides/` is intentionally absent — this repository has no repeatable operational procedure that needs one yet, and it does not distribute the Starter itself. `.specify/` (the rest, beyond `memory/constitution.md`) and `specs/` would be installed by running the pinned GitHub Spec Kit CLI (`specify-cli==1.0.8`, see `PROJECT.yaml`'s `standards.spec_kit`) — that install is still pending (see `docs/status/current-state.md`, "Known constraints") and is not something to hand-write. `.claude/skills/`/`.agents/skills/` would hold a project-specific skill only once a real, repeatable workflow is described for it — never at an invented `.ai/skills/` path, and never as a speculative placeholder; this repository currently has none.

## Evolution rule

Before adding a top-level area or responsibility layer, confirm that an existing location — including an open standard's own directory — cannot represent it. A change to the deployment boundary with `cleanbrain-me-infra`, or to the config-driven service metadata model, requires an ADR under `docs/decisions/`.
