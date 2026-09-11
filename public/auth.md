# Authentication Guide for Agents and Automated Tooling

This document describes how AI agents, scripts, and CI/CD pipelines authenticate
with Shorebird services.

## Overview

Shorebird provides code push and over-the-air update services for Flutter
applications. Automated access to Shorebird is managed through the Shorebird API
at `https://api.shorebird.dev/api/v1`.

## Authentication Methods

### 1. API Keys (Recommended for Agents & Automation)

For automated agents, background workers, and CI/CD systems, use an `sb_api_*`
API key.

- **How to obtain**: Generate an API key in the
  [Shorebird Console](https://console.shorebird.dev/account/api-keys) (Account >
  API Keys).
- **Format**: `sb_api_<unique_token_characters>`
- **Lifespan**: Configurable for 30 days, 90 days, or 1 year.
- **Usage**: Pass the key in the HTTP `Authorization` header on all API
  requests:
  ```http
  Authorization: Bearer sb_api_your_token_here
  ```

### 2. Interactive CLI OAuth Tokens

Interactive CLI sessions use short-lived JWTs (15 minutes) exchanged through
`shorebird login` via `https://auth.shorebird.dev`.

- Agents should not hardcode or attempt to scrape short-lived OAuth tokens;
  prefer long-lived `sb_api_*` API keys.

## Protected Resources

- **API Base URL**: `https://api.shorebird.dev/api/v1`
- **OpenAPI Specification**: `https://api.shorebird.dev/openapi.json`
- **Resource Metadata**:
  `https://docs.shorebird.dev/.well-known/oauth-protected-resource`
- **Reachability Verification**: Verify endpoint status at
  `https://docs.shorebird.dev/system/endpoint-reachability/`

## Unauthenticated Endpoints

- `POST https://api.shorebird.dev/api/v1/patches/check`: Endpoint queried by
  deployed devices to check for patch availability. Does not require an
  Authorization header.
