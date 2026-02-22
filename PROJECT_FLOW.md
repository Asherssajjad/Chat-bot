# Project Flow – WhatsApp SaaS Chatbot

This document describes **how the project is supposed to work** end-to-end: entry points, user journeys, bot logic flow, and data flow. Use it to align the code with the product and to fix gaps step by step.

---

## 1. High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           EXTERNAL                                          │
│  WhatsApp Cloud API  ──►  Webhook (POST)  ──►  Our App                      │
│  (User sends msg)         (we reply via Graph API)                          │
└─────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           OUR APP (Next.js)                                 │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐   ┌──────────────┐ │
│  │ Landing      │   │ Auth         │   │ Admin        │   │ User         │ │
│  │ /            │   │ /login       │   │ /admin/*     │   │ /user/*      │ │
│  │              │   │ /register     │   │ users,       │   │ config,      │ │
│  │              │   │               │   │ packages,    │   │ leads,       │ │
│  │              │   │               │   │ flows,       │   │ history,      │ │
│  │              │   │               │   │ analytics    │   │ reports      │ │
│  └──────────────┘   └──────────────┘   └──────────────┘   └──────────────┘ │
│         │                    │                   │                   │       │
│         └────────────────────┴───────────────────┴───────────────────┘       │
│                                        │                                     │
│                          ┌─────────────▼─────────────┐                      │
│                          │  API Routes + Bot Engine   │                      │
│                          │  /api/config, /api/leads  │                      │
│                          │  /api/webhook/whatsapp    │                      │
│                          │  processUserMessage()     │                      │
│                          └─────────────┬─────────────┘                      │
│                                        │                                     │
│                          ┌─────────────▼─────────────┐                      │
│                          │  Prisma (SQLite / DB)     │                      │
│                          │  User, Lead, ChatLog      │                      │
│                          └──────────────────────────┘                      │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Entry Points & Routing

| Who            | Entry                    | After login (or click)        |
|----------------|--------------------------|------------------------------|
| Anonymous      | `/` (landing)            | Can go to `/login`, `/register`, `/admin`, `/user` (links) |
| New user       | `/register`             | → Create account → redirect to `/login` |
| Returning      | `/login`                | ADMIN → `/admin`, USER → `/user` |
| Admin          | `/admin` (dashboard)    | Sidebar: Users, Packages, Flows, Analytics, Simulator, Settings |
| User (client)  | `/user` (dashboard)     | Sidebar: Leads, Bot Config, Packages, History, Reports, Settings |

**Protected routes**: `middleware.ts` protects `/admin/*` and `/user/*`; only logged-in users. Admin pages require `role === 'ADMIN'`.

---

## 3. User Journeys (Step-by-Step)

### 3.1 Registration & Login

1. **Register**  
   - User opens `/register`, fills name, email, password.  
   - `POST /api/register` → bcrypt hash → `prisma.user.create`.  
   - First user gets role `ADMIN`, rest get `USER`.  
   - Success → redirect to `/login`.

2. **Login**  
   - User opens `/login`, submits email/password.  
   - NextAuth Credentials → `prisma.user.findUnique` + `bcrypt.compare`.  
   - JWT stores `id`, `email`, `role`.  
   - After login: `getSession()` → redirect to `/admin` if role ADMIN, else `/user`.

### 3.2 Admin Journey

- **Dashboard** (`/admin`): Overview (currently mock stats).  
- **Users** (`/admin/users`): List clients, “Provision new client”, “Manage config”.  
  - **Gap**: No API; list is mock; save does not persist.  
- **Packages** (`/admin/packages`): View/edit plans (mock).  
- **Niche Flows** (`/admin/flows`): View hardcoded flows; “Edit” / “Add step” not wired.  
- **Analytics** (`/admin/analytics`): Charts (mock).  
- **Bot Simulator** (`/admin/simulator`): Full bot flow with current user config (works).  
- **Settings** (`/admin/settings`): Placeholder.

### 3.3 User (Client) Journey

- **Dashboard** (`/user`): Welcome, stats, recent leads (stats/leads currently mock on dashboard).  
- **Bot Config** (`/user/config`): Niche, system prompt, website URL, custom flow steps → `GET/POST /api/config` (works).  
- **Leads** (`/user/leads`): List leads for this user, add lead manually → `GET/POST /api/leads` (works).  
- **Packages** (`/user/packages`): View plans (mock).  
- **History** (`/user/history`): Chat logs (mock; no API).  
- **Reports** (`/user/reports`): Charts + “Generate PDF” (mock; no export).  
- **Settings** (`/user/settings`): Placeholder.

---

## 4. Bot Message Flow (The “Brain”)

This is the core flow for every incoming user message (simulator or WhatsApp).

### 4.1 Order of Checks (priority)

```
Incoming message (text or audio)
        │
        ▼
┌───────────────────┐
│ 1. Voice?         │  → If audio: transcribe (Whisper placeholder) → use text
└─────────┬─────────┘
          ▼
┌───────────────────┐
│ 2. Custom Flow    │  → User-defined steps (from DB: customFlow JSON)
│    (DB config)    │  → Match trigger (e.g. "hello") → return step text
└─────────┬─────────┘
          │ no match
          ▼
┌───────────────────┐
│ 3. Niche Flow     │  → NICHE_FLOWS[nicheId] (e.g. LEAD_REPLY_AGENT)
│    (hardcoded)    │  → getResponseForMessage(text, niche) → return step response + tag
└─────────┬─────────┘
          │ no match
          ▼
┌───────────────────┐
│ 4. Website KB     │  → If user has websiteContent: simple keyword match in text
│    (cached)       │  → Return matching sentence
└─────────┬─────────┘
          │ no match
          ▼
┌───────────────────┐
│ 5. AI Fallback    │  → OpenAI (gpt-4o-mini) with systemPrompt
│                   │  → Return AI reply
└───────────────────┘
```

**Where it runs**:

- **Simulator**: `POST /api/simulator` → loads user config (niche, customFlow, systemPrompt, websiteContent) → calls `processUserMessage()` → returns `{ botResponse }`. ✅ Working.  
- **WhatsApp webhook**: Currently does **not** call `processUserMessage()`. It only uses `getResponseForMessage(message, 'LEAD_REPLY_AGENT')` and does not send reply back to WhatsApp. ❌ Gap.

### 4.2 Data needed per tenant (per User)

For each message we need:

- `userId` (tenant).  
- `niche` (e.g. LEAD_REPLY_AGENT).  
- `customFlow` (parsed JSON).  
- `systemPrompt`.  
- `websiteContent` (cached).  
- Optional: `claudeKey` if we add Claude later.

All of this is on `User` and loadable by `userId` or by WhatsApp `phone_id` (if we map phone_id → User).

---

## 5. WhatsApp Integration Flow

### 5.1 Current (as implemented)

1. **Verification (GET)**  
   - Meta sends `hub.mode`, `hub.verify_token`, `hub.challenge`.  
   - We check `verify_token === WHATSAPP_VERIFY_TOKEN` → return `challenge`. ✅  

2. **Incoming message (POST)**  
   - We parse `body.message.text`, `body.sender.phone`.  
   - We use hardcoded niche `LEAD_REPLY_AGENT` and only `getResponseForMessage()`.  
   - We do **not**: resolve tenant, load user config, call `processUserMessage()`, create Lead/ChatLog, or send reply via Graph API. ❌  

### 5.2 Intended (target flow)

1. **POST** receives webhook payload.  
2. **Resolve tenant**: e.g. from `body.entry[].changes[].value.metadata.phone_number_id` → find `User` where `phoneId === phone_number_id` (or use a single global env and one tenant for now).  
3. **Load user**: Get User by that id; read niche, customFlow, systemPrompt, websiteContent.  
4. **Find or create Lead**: By `userId` + sender phone → upsert Lead.  
5. **Process message**: `processUserMessage(userId, text, 'text', niche, customFlow, systemPrompt, websiteContent)`.  
6. **Persist ChatLog**: Append two rows (USER message, BOT response) for this Lead.  
7. **Send reply**: `POST https://graph.facebook.com/v18.0/{phone_id}/messages` with token from User (or env), body with recipient and reply text.  
8. **Optional**: If tag === 'HOT', mark Lead status or trigger human handoff.

---

## 6. Data Flow (Database ↔ API ↔ UI)

| Data           | Stored in        | Read by              | Written by           |
|----------------|------------------|----------------------|-----------------------|
| User           | `User`           | Auth, config, leads  | Register, (admin TBD) |
| Config         | `User` fields    | `/api/config` GET    | `/api/config` POST    |
| Leads          | `Lead`           | `/api/leads` GET     | `/api/leads` POST, (webhook TBD) |
| Chat logs      | `ChatLog`        | (no API yet)         | (webhook TBD)         |
| Stats          | Derived (Lead)   | `/api/stats`         | —                     |

**Multi-tenant**: All queries must be scoped by `userId` (from session or from webhook tenant resolution).

---

## 7. Files That Implement Each Flow

| Flow / concern        | Main files |
|-----------------------|------------|
| Entry & auth          | `app/page.tsx`, `app/login`, `app/register`, `middleware.ts`, `lib/auth.ts` |
| Admin UI              | `app/admin/layout.tsx`, `app/admin/*.tsx` |
| User UI               | `app/user/layout.tsx`, `app/user/*.tsx` |
| Bot logic             | `lib/bot-engine.ts`, `lib/niche-flows.ts` |
| Config                | `app/api/config/route.ts`, `app/user/config/page.tsx` |
| Leads                 | `app/api/leads/route.ts`, `app/user/leads/page.tsx` |
| Stats                 | `app/api/stats/route.ts` |
| Simulator             | `app/api/simulator/route.ts`, `app/admin/simulator/page.tsx` |
| WhatsApp webhook      | `app/api/webhook/whatsapp/route.ts` |
| DB                    | `prisma/schema.prisma`, `lib/prisma.ts` |

---

## 8. Summary: What Works vs What’s Missing

- **Working**: Landing, register, login (with role redirect), admin/user dashboards, bot config (save/load), leads list/add, stats API, **full bot flow in simulator**, webhook verification.  
- **Missing / partial**: WhatsApp E2E (tenant + reply + Lead/ChatLog), admin user management API, chat history API, real reports/export, packages in DB, settings pages.

Next step: use **IMPROVEMENT_ROADMAP.md** to implement these in order so the project becomes a “perfect” end-to-end flow.
