# SportSignal TMA Demo

Client-facing demo of a Telegram Mini App for sports analytics, predictive insights, and AI-assisted match commentary.

## Product Idea

SportSignal is designed as a mobile-first analytics workspace inside Telegram where users can:

- track fixtures, live states, lineup changes, and injury context
- view AI-generated prediction cards built on structured sports data
- unlock premium access tiers through a paywall-ready product model
- return to the app through trigger-based Telegram notifications

This repository contains a presentation-safe demo surface for client review.

## What The Demo Shows

- Telegram Mini App style interface optimized for mobile
- live slate and fixture overview
- prediction feed with probabilities and rationale
- access tiers and retention scenarios
- polished frontend experience that can be reviewed in browser preview mode

## Demo Scope

Included in this repository:

- React + Vite frontend
- mock sports data for realistic UI demonstration
- demo-safe UX flow without production secrets

Not included in this repository:

- FastAPI backend
- PostgreSQL / Redis infrastructure
- production sports-data integrations
- live LLM requests
- Telegram Bot API delivery logic
- billing, postback verification, and private business rules

## Why This Version Exists

The purpose of this demo is to let a client quickly review:

- the visual quality of the Mini App
- the product structure and monetization logic
- the user flow inside Telegram
- the overall concept before a full technical delivery

The complete version remains private and is maintained separately.

## Technology

- React
- TypeScript
- Vite
- Telegram WebApp-ready frontend shell

## Local Preview

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
```

## Notes

- This is a demo repository intended for presentation and stakeholder review.
- All data shown in the interface is mocked for safe external sharing.
