# Engineering Principles

This document defines engineering principles that should outlive a technology choice or an individual feature in this repository.

## Evidence before change

Inspect existing documentation and implementation first. Prefer repository evidence over assumptions, and do not propose changes based on a structure that has not been verified.

## Minimal, coherent change

Prefer the smallest coherent change that satisfies the requirement. This is a single-page service directory, not a platform — do not add a backend, database, authentication, or routing layer until a real requirement forces it.

## Explicit architecture

Do not change architectural boundaries or conventions silently. Surface decisions that have long-term impact or are difficult to reverse (for example, moving off config-driven service metadata, or turning Entrance into a proxy) and record them in an ADR before or with implementation.

## Verifiable outcomes

Produce outcomes that can be verified. Run the build and typecheck once they exist; otherwise state the verification method and its limitations. Distinguish guidance that requires judgment from rules that should be enforced by code, tests, linters, or CI.

## Config over code for service metadata

Service identity, description, status, and URL must live in a single config source, not in UI components. Adding or updating a service must not require touching a presentation component.

## Separated boundaries

Keep domain concerns (service metadata, presentation) separate from external systems and tooling (build tool, container runtime, Kubernetes deployment). Deployment and infrastructure concerns belong to the `cleanbrain-me-infra` repository, not to this repository's source tree.
