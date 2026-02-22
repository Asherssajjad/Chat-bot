# Chat Bot – Full Codebase Analysis & Gaps Report

This document summarizes what the codebase contains, how it aligns with **PROJECT_PLAN.md**, and where the main gaps and bugs are.

---

## 1. What’s in the Repo (Overview)

- **Framework**: Next.js 16 (App Router), React 19, TypeScript  
- **Database**: SQLite via Prisma (plan says PostgreSQL; see gap below)  
- **Auth**: NextAuth with Credentials + JWT, role-based (ADMIN / USER)  
- **AI**: OpenAI (gpt-4o-mini) in `bot-engine`; PROJECT_PLAN mentions Claude  
- **Integrations**: WhatsApp webhook (verification + POST handler), optional scrape (Cheerio)

**Structure**:  
`src/app/` (pages + API routes), `src/lib/` (auth, prisma, bot-engine, niche-flows), `src/components/` (Sidebar, Providers, PlaceholderPage), `prisma/schema.prisma`.

---

## 2. Feature vs PROJECT_PLAN

| PROJECT_PLAN feature | Status | Notes |
|----------------------|--------|--------|
| **Admin – User Management** | Partial | UI with mock data only; no API to list/update/suspend users or save “Provision” modal |
| **Admin – Plan/Package Management** | UI only | Hardcoded packages; no DB model, no CRUD, no assignment to users |
| **Admin – Global Analytics** | Mock | Stats/charts are static; no aggregation from DB |
| **Admin – Niche Templates** | Read-only UI | Flows from `niche-flows.ts`; “CREATE NEW NICHE” / “EDIT” / “ADD STEP” not wired |
| **User – Bot Configuration** | Done | Niche, system prompt, website URL, custom flow; saved via `/api/config` |
| **User – Niche Selection** | Done | In config page; uses `NICHE_FLOWS` |
| **User – Lead Management** | Done | CRM list + add lead; uses `/api/leads` (one bug – see below) |
| **User – Monthly Reports** | Mock | Reports page uses static charts; no real aggregation or CSV/PDF |
| **User – Chat Logs** | Mock | History page is static; no API to read/write `ChatLog` |
| **Hybrid Flow (niche + AI fallback)** | Done | In `bot-engine` + simulator; custom flow → niche flow → website KB → AI |
| **Multi-tenant isolation** | Partial | Data keyed by `userId`; webhook not yet per-tenant (see below) |
| **WhatsApp Business API** | Partial | Webhook verify + POST; POST does **not** send reply back to WhatsApp, does not use per-user config or create Lead/ChatLog |
| **Reporting (CSV/PDF)** | Not done | “EXPORT CSV” / “GENERATE PDF” buttons not implemented |

---

## 3. Bugs & Critical Gaps

### 3.1 Bugs (fixed in this pass)

1. **Leads API (`/api/leads` GET)**  
   - Filter used `user: { email: session.user.email }`; when `session.user.email` was missing, filter was `undefined` and could return all leads.  
   - **Fix**: Require session and use `userId` from token; filter by `userId` (and return 401 if no user).

2. **Login redirect**  
   - Always redirected to `/user`. Admins should go to `/admin`.  
   - **Fix**: Redirect by role (ADMIN → `/admin`, USER → `/user`).

3. **Admin Bot Simulator – niche dropdown**  
   - `selectedNiche` is the object key (e.g. `LEAD_REPLY_AGENT`), but `<option value={flow.id}>` used `flow.id` (e.g. `lead-reply-agent`), so the selected value didn’t match any option.  
   - **Fix**: Use niche key as option value (e.g. `Object.keys(NICHE_FLOWS)` or value = key).

4. **User Config page – wrong icon**  
   - A local component `Activity` was defined and rendered `<Smartphone>`, overriding Lucide’s `Activity`.  
   - **Fix**: Remove local `Activity` and use Lucide `Activity` (or rename to avoid override).

### 3.2 Remaining logic / design gaps

5. **WhatsApp webhook (`/api/webhook/whatsapp`)**  
   - Does not identify tenant: uses hardcoded `LEAD_REPLY_AGENT` and does not load user by `phoneId`/WABA.  
   - Does not call `processUserMessage()` (no custom flow, no website KB, no real AI).  
   - Does not create or update `Lead` or `ChatLog`.  
   - Does not send the reply back to WhatsApp (no outbound call to Graph API).  
   - So: end-to-end WhatsApp flow is not implemented; only verification + internal response object.

6. **Database**  
   - Plan says PostgreSQL; project uses SQLite. Fine for dev; production usually needs PostgreSQL and env `DATABASE_URL`.

7. **Admin User Management**  
   - “PROVISION NEW CLIENT” / “SAVE & PROVISION WABA” do not call any API; form state is not persisted.  
   - No API to list users from DB, suspend users, or update `phoneId` / `wabaId` / `accessToken` / `webhookSecret` / `messageLimit` / `autoPause`.

8. **Packages / plans**  
   - No Prisma model for plans or subscription; admin and user package UIs are static.  
   - No link between users and plans (e.g. `planId` on User), no enforcement of message limits.

9. **Chat History**  
   - No API to read/write `ChatLog`; history page is mock.  
   - Webhook and bot engine do not create `ChatLog` when processing messages.

10. **Reports & export**  
    - “EXPORT CSV” (leads) and “GENERATE PDF” (reports) are not implemented.  
    - No aggregation from DB for conversion, volume, or cost.

11. **Landing “Watch Demo”**  
    - Button has no handler.

12. **Placeholder pages**  
    - User Settings and Admin Settings are placeholders only.

13. **Niche flow key in flows page**  
    - `flow.id.toUpperCase().replace('-', '_')` only replaces the first `-`; for `lead-reply-agent` it still becomes `LEAD_REPLY_AGENT` in one pass. If more hyphens are added in the future, use `.replace(/-/g, '_')` for consistency.

---

## 4. File-Level Summary

| Area | Files | Purpose |
|------|--------|--------|
| **Auth** | `lib/auth.ts`, `app/api/auth/[...nextauth]/route.ts`, `app/api/register/route.ts` | Login, register, JWT, role |
| **DB** | `prisma/schema.prisma`, `lib/prisma.ts` | User, Lead, ChatLog; SQLite |
| **Bot logic** | `lib/bot-engine.ts`, `lib/niche-flows.ts` | Hybrid flow, custom flow, website KB, OpenAI |
| **Config** | `app/api/config/route.ts`, `app/user/config/page.tsx` | Get/update niche, prompt, website, custom flow |
| **Leads** | `app/api/leads/route.ts`, `app/user/leads/page.tsx` | List/add leads (per user) |
| **Stats** | `app/api/stats/route.ts` | Per-user lead counts (hot/warm/cold) |
| **WhatsApp** | `app/api/webhook/whatsapp/route.ts` | Verify + POST (no outbound send, no tenant, no DB) |
| **Simulator** | `app/api/simulator/route.ts`, `app/admin/simulator/page.tsx` | Uses full bot engine with user config |
| **Admin** | `app/admin/*` | Dashboard, users, packages, flows, analytics, settings (mostly mock/static) |
| **User** | `app/user/*` | Dashboard, leads, config, packages, history, reports, settings (mix of real + mock) |
| **Misc** | `app/api/whatsapp-test/route.ts`, `app/api/scrape-test/route.ts` | WhatsApp API test; scrape test (Cheerio) |

---

## 5. Recommended Next Steps (Priority)

1. **WhatsApp E2E**: Resolve tenant from webhook (e.g. by phone number ID), load user config, call `processUserMessage()`, create/update Lead and ChatLog, send reply via Graph API.  
2. **Admin users**: Add API to list/update/suspend users and wire “Provision” modal to it.  
3. **Chat history**: Add API to list ChatLogs by user/lead; optionally wire history UI to it.  
4. **Reports / export**: Implement CSV export for leads and, if needed, PDF report generation from real stats.  
5. **Packages**: Add Plan model and link to User; enforce message limits in webhook/bot.

---

## 6. How to Run

- `npm install`  
- `npx prisma generate` (and `npx prisma db push` for schema)  
- Optional: `npx ts-node seed-admin.ts` for an admin user  
- `npm run dev` → http://localhost:3000  
- Env: `OPENAI_API_KEY`, `NEXTAUTH_SECRET`, optionally `WHATSAPP_VERIFY_TOKEN`, `WHATSAPP_PHONE_ID`, `WHATSAPP_TOKEN` for WhatsApp.

This analysis was generated after a full read of the repository; the fixes for the four bugs above are applied in the codebase.
