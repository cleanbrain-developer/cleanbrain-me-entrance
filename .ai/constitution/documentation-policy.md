# Documentation Policy

## Authority

> Conversation is temporary. The repository is authoritative.

Conversations and external links may be discovery or bootstrap inputs, but they are not long-term dependencies. A durable agreement is not complete until it has been persisted in the repository.

## Single responsibility

- Project identity, structured phase, and pinned standard versions: `PROJECT.yaml`
- The sole agent entry point and behavioral contract: `AGENTS.md`
- Durable engineering principles: `.specify/memory/constitution.md`
- Document ownership and language policy: `.ai/constitution/documentation-policy.md` — the one policy area no open standard owns
- Product purpose, goals, and scope: `docs/product/`
- Structure and context model: `docs/architecture/`
- Significant decisions and rationale: `docs/decisions/`
- Current progress, next work, and open decisions: `docs/status/current-state.md`

Do not duplicate the same policy across files. When a summary is useful, link to the authoritative path.

## Decision records

Record choices with long-term impact — such as the deployment target, the service metadata schema, or turning Entrance into anything beyond a static link launcher — in an ADR under `docs/decisions/`. An ADR must include context, decision, consequences, and status. An accepted ADR remains effective until another ADR supersedes it.

## Status hygiene

`current-state.md` is not a meeting log or a complete changelog. Keep only the completed work, work in progress, next actions, and open decisions required to reconstruct the current phase.

## Maintenance

If a code or structure change makes documentation false, update the documentation in the same change. Remove stale guidance; use ADRs or version control when history must be preserved.
