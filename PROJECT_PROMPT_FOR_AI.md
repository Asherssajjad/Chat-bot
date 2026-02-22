# Project Brief – Share This With Another AI

Copy everything below the line and paste it into another AI chat so it understands your project and can help you change or improve functions.

---

## PROJECT: WhatsApp SaaS Chatbot Platform

**What I'm building:** A multi-tenant SaaS app where **business owners (Users)** run a WhatsApp chatbot for their customers. An **Admin** manages those client accounts and global settings. The bot uses a **hybrid flow**: first it tries **hardcoded / custom flows** (cheap, fast), then **website knowledge base** match, then **AI (OpenAI)** as fallback to save cost. Each client has their own config (niche, custom steps, system prompt, optional website URL). Data is isolated per tenant (per User).

**Tech stack:** Next.js 16 (App Router), React 19, TypeScript, Prisma (SQLite in dev; plan says PostgreSQL for prod), NextAuth (Credentials + JWT, roles ADMIN / USER), OpenAI (gpt-4o-mini) for AI fallback. Styling: vanilla CSS (glassmorphism, dark theme). WhatsApp Business Cloud API for receiving/sending messages.

**Bot message flow (priority order for every incoming message):**
1. **Custom flow** – User-defined steps in DB (trigger phrase → reply). Stored in `User.customFlow` (JSON).
2. **Niche flow** – Hardcoded flows in code (e.g. LEAD_REPLY_AGENT, CAR_BOOKING, REAL_ESTATE). File: `src/lib/niche-flows.ts`. Match by triggers → return response + tag (HOT/WARM/COLD).
3. **Website knowledge base** – If user set a website URL, we cache text in `User.websiteContent`. Simple keyword match against that text to answer.
4. **AI fallback** – OpenAI with `User.systemPrompt`. Implemented in `src/lib/bot-engine.ts` → `processUserMessage()`.

**App structure:**
- **Landing:** `/` – marketing; links to login, register, admin, user.
- **Auth:** `/login`, `/register`. After login: ADMIN → `/admin`, USER → `/user`.
- **Admin** (`/admin/*`): Dashboard, Users (list/provision clients), Packages (plans), Niche Flows (view templates), Analytics, Bot Simulator (full bot flow works here), Settings. Middleware protects and enforces ADMIN role.
- **User** (`/user/*`): Dashboard, My Leads (CRM), Bot Config (niche, prompt, website URL, custom flow – **works**), Packages, History (chat logs), Reports, Settings.

**Database (Prisma):**
- **User:** id, name, email, password, role (ADMIN/USER), WhatsApp fields (phoneId, wabaId, accessToken, webhookSecret, messageLimit, autoPause), bot config (niche, systemPrompt, customFlow, websiteUrl, websiteContent).
- **Lead:** id, phone, name, status (HOT/WARM/COLD/CONVERTED), interest, location, userId.
- **ChatLog:** id, sender (BOT/USER), message, type (FLOW/AI), leadId, userId, createdAt.

**What works today:**
- Register, login, role-based redirect.
- User Bot Config: save/load niche, system prompt, website URL, custom flow via `/api/config`.
- Leads: list and add leads per user via `/api/leads`.
- Stats: `/api/stats` returns lead counts (hot/warm/cold) for the logged-in user.
- Bot engine: `processUserMessage()` in `src/lib/bot-engine.ts` implements the full 4-step flow. It is used by **Bot Simulator** (`/api/simulator` + `/admin/simulator`) and works end-to-end there.
- WhatsApp webhook: **GET** verifies with Meta (OK). **POST** receives messages but currently: does **not** resolve tenant (no User by phoneId), does **not** call `processUserMessage()`, does **not** create Lead or ChatLog, does **not** send the reply back to WhatsApp (no Graph API call). So WhatsApp E2E is incomplete.

**What’s missing or mock:**
- WhatsApp webhook: needs tenant resolution (phone_number_id → User), then load user config, find/create Lead, call `processUserMessage()`, write ChatLog, send reply via Graph API.
- Admin Users: UI exists but list is mock; “Provision” / “Save” don’t call any API – need CRUD APIs and wire-up.
- Chat History: page is mock; no API to read ChatLog; webhook doesn’t write ChatLog.
- Reports: mock charts; no CSV/PDF export.
- Packages: no DB model; admin and user package UIs are static.
- User dashboard: stats and “recent leads” are hardcoded; should use `/api/stats` and `/api/leads`.

**Key files:**
- Bot logic: `src/lib/bot-engine.ts` (processUserMessage), `src/lib/niche-flows.ts` (NICHE_FLOWS, getResponseForMessage).
- Config: `src/app/api/config/route.ts` (GET/POST), `src/app/user/config/page.tsx`.
- Leads: `src/app/api/leads/route.ts` (GET/POST), `src/app/user/leads/page.tsx`.
- WhatsApp webhook: `src/app/api/webhook/whatsapp/route.ts` (GET verify, POST receive – reply and DB not implemented).
- Simulator: `src/app/api/simulator/route.ts`, `src/app/admin/simulator/page.tsx`.
- Auth: `src/lib/auth.ts`, `src/app/api/auth/[...nextauth]/route.ts`, `src/app/api/register/route.ts`.
- DB: `prisma/schema.prisma`, `src/lib/prisma.ts`.

**What I want help with:** I need to **change and improve functions** in this project so the full flow works: especially the **WhatsApp webhook** (resolve tenant, run bot engine, save Lead + ChatLog, send reply), and then **admin user management**, **chat history API**, and **reports/export**. When you suggest code changes, please do them in the actual files (e.g. `src/app/api/webhook/whatsapp/route.ts`) and keep the existing style and structure (Next.js App Router, Prisma, TypeScript). Use the flow above as the source of truth for how the bot and app are supposed to work.

---

*End of project brief. Paste everything above (from "## PROJECT" to "...work.") into another AI to get contextual help.*
