<!-- vale off -->

# Authentication guide for agents and automated tooling

This document describes how AI agents, scripts, and CI/CD pipelines authenticate
with Shorebird services.

## Overview

Shorebird provides Code Push and over-the-air update services for Flutter
applications. Automated access is managed through the Shorebird API at
`https://api.shorebird.dev/api/v1`.

## Authentication methods

### 1. API keys (recommended for agents and automation)

For automated agents, background workers, and CI/CD systems, use an `sb_api_*`
API key.

- **How to obtain**: Generate an API key in the
  [Shorebird console](https://console.shorebird.dev/account/api-keys) (Account >
  API Keys).
- **Format**: `sb_api_<unique_token_characters>`
- **Lifespan**: No expiry by default; an expiry in days can be set when the key
  is created.
- **Usage**: Pass the key in the HTTP `Authorization` header on all API
  requests:
  ```http
  Authorization: Bearer sb_api_your_token_here
  ```

### 2. Interactive CLI OAuth tokens

Interactive CLI sessions use short-lived JWTs (15 minutes) exchanged through
`shorebird login` via `https://auth.shorebird.dev`.

- Agents should not hardcode or attempt to scrape short-lived OAuth tokens;
  prefer long-lived `sb_api_*` API keys.

## Protected resources

- **API base URL**: `https://api.shorebird.dev/api/v1`
- **OpenAPI specification**: `https://api.shorebird.dev/openapi.json`
- **API catalog**: `https://docs.shorebird.dev/.well-known/api-catalog`
- **Agent card**: `https://docs.shorebird.dev/.well-known/agent.json`
- **Reachability verification**: Verify endpoint status at
  `https://docs.shorebird.dev/system/endpoint-reachability/`

## Unauthenticated endpoints

- `POST https://api.shorebird.dev/api/v1/patches/check`: Endpoint queried by
  deployed devices to check for patch availability. Does not require an
  Authorization header.

<!-- vale on -->
