# Codex Project Adapter

This file is the repository entry point for Codex-compatible agents. Do not duplicate project policy or design here. The shared sources of truth are listed below.

## Context bootstrap

Read `PROJECT.yaml` first, then follow the bootstrap order and conflict-handling rules defined in `docs/architecture/agent-context-model.md`. This adapter does not restate that order — if this list and that document ever disagree, `agent-context-model.md` wins.

## Working contract

- Inspect repository evidence before planning or changing anything.
- Prefer the smallest coherent change that satisfies the request.
- Never change architecture silently. Record significant decisions in an ADR.
- Perform available verification before claiming completion, and distinguish verified results from unverified items.
- Persist durable decisions and working-state changes in the correct source of truth within the same change.
- Do not treat conversation history or this adapter as a long-term design source.

Always use `docs/status/current-state.md` as the source of truth for the current phase and next work.
