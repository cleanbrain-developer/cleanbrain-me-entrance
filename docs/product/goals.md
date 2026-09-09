# Goals

## V1 goals

1. Give `cleanbrain.me` a root-domain page that a first-time visitor understands within seconds.
2. Represent every listed service with name, short description, current status, and a one-click path to it.
3. Keep service metadata config-driven so adding a service never requires touching a UI component.
4. Ship as a stateless static build that a lightweight container can serve, fitting the `cleanbrain-me-infra` cluster's 2 vCPU / 4 GB RAM constraint.
5. Stay decoupled from every listed service's implementation — Entrance never becomes a proxy, gateway, or auth layer.

## Success criteria

A new agent session, starting only from `CLAUDE.md` or `AGENTS.md` with no prior conversation, should accurately answer:

- What is this project, and what does it deliberately not do?
- Why does it exist?
- What are its core principles and architecture?
- What has been completed, and what is the current phase?
- What should happen next?

Every answer must be traceable to a repository path (this document, `docs/architecture/`, `docs/status/current-state.md`, or the source tree), not to assumed context.

## Long-term direction

Possible future extensions, once the static MVP is deployed and stable:

1. Live status (health-check-driven) instead of a manually maintained `status` field.
2. Anything beyond static navigation — proxying, auth, or a backend — is out of scope indefinitely unless a concrete requirement forces a documented architecture decision (see `docs/architecture/overview.md` and `docs/decisions/`).

This sequence is a direction, not a commitment.

Service categorization is no longer speculative: `Service.category` is grouped in the UI (`ServiceGrid.vue`) whenever more than one category is present. Group headings stay hidden while everything shares one category, so the UI doesn't show structure the data doesn't yet justify.
