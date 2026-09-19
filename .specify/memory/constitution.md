# Constitution

This is the project's constitution in the sense GitHub Spec Kit uses the term: durable principles every change in this repository is evaluated against. It replaces the old `.ai/constitution/engineering-principles.md` — this is now the one place these principles live.

## Evidence before change

Inspect existing documentation and implementation first. Prefer repository evidence over assumptions, and do not propose changes based on a structure that has not been verified.

## Minimal, coherent change

Prefer the smallest coherent change that satisfies the requirement. This is a single-page service directory, not a platform — do not add a backend, database, authentication, or routing layer until a real requirement forces it.

## Explicit architecture

Do not change architectural boundaries or conventions silently. Surface decisions that have long-term impact or are difficult to reverse (for example, moving off config-driven service metadata, or turning Entrance into a proxy) and record them in an ADR before or with implementation.

## Verifiable outcomes

Produce outcomes that can be verified. Run the build and typecheck once they exist; otherwise state the verification method and its limitations. Distinguish guidance that requires judgment from rules that should be enforced by code, tests, linters, or CI.

## Agent-agnostic core

Do not bind product intent, architecture, decisions, or these principles to an agent-specific instruction file. `AGENTS.md` may contain only the routing and behavioral contract needed for any agent to find and follow these shared sources.

## Project-specific principles

A project may add its own principles below this line, each with a real prose definition here — never a bare name only in `PROJECT.yaml`. This project has added two.

### Config over code for service metadata

Service identity, description, status, and URL must live in a single config source, not in UI components. Adding or updating a service must not require touching a presentation component.

### Separated boundaries

Keep domain concerns (service metadata, presentation) separate from external systems and tooling (build tool, container runtime, Kubernetes deployment). Deployment and infrastructure concerns belong to the `cleanbrain-me-infra` repository, not to this repository's source tree.
