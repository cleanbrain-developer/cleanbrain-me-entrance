# Product Overview

## Product

cleanbrain.me Entrance is the landing page served at the `cleanbrain.me` root domain. It is a service directory / launcher: it lists the services running under the `cleanbrain.me` domain and lets a visitor reach any of them in one click.

## Problem

`cleanbrain.me` currently has no page at its root. Services live on subdomains (`english-core-speaking.cleanbrain.me`, and eventually `developer.cleanbrain.me` and others), but nothing ties them together for a visitor who lands on the bare domain.

## Product thesis

Entrance is a directory, not infrastructure. It does not proxy, gate, or authenticate traffic to the services it lists — it only helps a visitor find and open them. Each subdomain remains independently deployed and owned by its own repository; Entrance stays decoupled from their implementations.

## Users

The primary user is the domain owner (`cleanbrain.developer`), who operates every listed service and uses this page to present them. A secondary user is anyone the owner shares `cleanbrain.me` with, who should be able to understand the available services and reach one without prior explanation.

## Open items

- Whether Entrance will ever need a secondary presentation surface (e.g. an about/contact section) beyond the service directory itself is undecided; V1 assumes it will not.
