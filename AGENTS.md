# AGENTS.md

This file is the single, agent-agnostic entry point for any coding agent working in this repository — Claude Code, Codex, or any other tool that reads `AGENTS.md`. It is not the source of truth for product, architecture, or principles; it routes to them and states the behavioral contract every agent follows here.

## Context bootstrap

Read `PROJECT.yaml` first, then follow the bootstrap order and conflict-handling rules defined in `docs/architecture/agent-context-model.md`. This file does not restate that order — if this section and that document ever disagree, `agent-context-model.md` wins.

## Working contract

### Before work

- Load persistent context in the order `agent-context-model.md` defines.
- Inspect the current request, `docs/status/current-state.md`, and relevant files.
- Find evidence in existing documentation and implementation before proposing a change.
- For change work, prepare a proportionate plan and verification strategy before implementation.

### During work

- Stay within the user request and accepted decisions; treat existing changes as user-owned.
- Surface material assumptions and architectural changes (for example, introducing a backend, changing the service metadata shape, or changing the deployment target) instead of deciding them silently.
- Record a new rule once, in its correct source of truth — never in this file.

### Before completion

- Run relevant verification (build, typecheck) or state why it could not be run; distinguish a green automated check from direct verification against the real running system.
- Review the final change against the requirement, architecture, and documentation responsibilities.
- Update `docs/status/current-state.md` when the next session needs to know about a state change.
- If this change edited a document with a `.ko.md` companion, update the companion in the same change — a stale translation is a defect, not a follow-up task.

Claiming completion and demonstrating verification are different. Do not claim success without verification evidence.

## Conflict handling

- A user request defines the work objective but does not silently discard accepted architecture.
- A specific accepted ADR takes precedence over a general architecture description.
- `current-state.md` does not redefine principles or design.
- Report unresolved conflicts instead of hiding them behind assumptions.

Use `docs/status/current-state.md` as the source of truth for the current phase and next work.
