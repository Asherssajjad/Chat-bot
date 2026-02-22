# Improvement Roadmap – Make the Project “Perfect”

This roadmap is ordered so we **fix the flow first**, then **fill in admin and user features**, then **polish**. Each phase can be done in order; check off items as you go.

---

## How to Use This

1. **Find the flow** → Use **PROJECT_FLOW.md** to see how everything connects.  
2. **Process to the next** → Pick the current phase below and implement one bullet at a time.  
3. **Test** → After each change, run the app and test the path you touched.

---

## Phase 1: Core Bot & WhatsApp (Flow Works End-to-End)

Goal: A real WhatsApp message goes: **Meta → our webhook → bot engine → DB (Lead + ChatLog) → reply back to user**.

| # | Task | Details |
|---|------|--------|
| 1.1 | **Resolve tenant in webhook** | In `POST /api/webhook/whatsapp`, read `phone_number_id` from payload. Find `User` where `phoneId === phone_number_id`. If not found, optionally use one global `WHATSAPP_PHONE_ID` + env token for single-tenant. |
| 1.2 | **Load user config in webhook** | For that User, load `niche`, `customFlow` (parse JSON), `systemPrompt`, `websiteContent`. |
| 1.3 | **Find or create Lead** | By `userId` + sender phone number; upsert Lead (create if new, update `updatedAt`). |
| 1.4 | **Call bot engine** | Call `processUserMessage(userId, text, 'text', niche, customFlow, systemPrompt, websiteContent)`. |
| 1.5 | **Persist ChatLog** | Create two `ChatLog` rows: one sender USER (message), one sender BOT (response), both with same `leadId`, `userId`, and `type` (FLOW/AI/CUSTOM_FLOW). |
| 1.6 | **Send reply to WhatsApp** | Use Graph API: `POST .../v18.0/{phone_id}/messages` with User’s `accessToken` (or env token), body: `messaging_product: "whatsapp"`, `to`, `type: "text"`, `text: { body: replyText }`. |
| 1.7 | **Optional: HOT lead** | If `botResponse.tag === 'HOT'`, set Lead `status = HOT` (and later: notify human / pause bot if you add that). |

**Done when**: User sends WhatsApp message → bot replies on WhatsApp; Lead and ChatLog exist in DB for that conversation.

---

## Phase 2: Chat History & User Dashboard (Real Data)

Goal: User sees **real** leads and **real** chat logs from the DB.

| # | Task | Details |
|---|------|--------|
| 2.1 | **ChatLog API** | Add `GET /api/chat-logs` (or `/api/leads/[id]/logs`): query `ChatLog` by `userId`, optionally by `leadId`. Return list for history page. |
| 2.2 | **Wire History page** | Replace mock list with API; show real conversations grouped by lead (or flat list). Click lead → show messages for that lead. |
| 2.3 | **User dashboard stats** | On `/user`, call `/api/stats` and show real total leads, hot/warm/cold (already have API). Replace hardcoded “452”, “18”, etc. with `data.total`, `data.hot`, etc. |
| 2.4 | **User dashboard recent leads** | On `/user`, fetch last N leads from `/api/leads` and show in the table (or “High-Intent Leads”) instead of mock array. |

**Done when**: User dashboard and History page show live data from the DB.

---

## Phase 3: Admin User Management (Real CRUD)

Goal: Admin can **list real users**, **create (provision)** and **edit** client config (including WhatsApp fields).

| # | Task | Details |
|---|------|--------|
| 3.1 | **List users API** | `GET /api/admin/users`: only for role ADMIN; return list of users (id, name, email, role, phoneId, wabaId, messageLimit, autoPause, etc.) from DB. |
| 3.2 | **Update user API** | `PATCH /api/admin/users/[id]` (or POST): only ADMIN; update User fields: name, email, phoneId, wabaId, accessToken, webhookSecret, messageLimit, autoPause. Do not expose password hash. |
| 3.3 | **Create user (provision)** | `POST /api/admin/users`: create new User (name, email, password, role USER), optionally set phoneId, wabaId, etc. |
| 3.4 | **Wire Admin Users page** | Replace `mockUsers` with `GET /api/admin/users`. “Provision new client” → call create API. “Manage config” → load user, save via PATCH. |
| 3.5 | **Optional: Suspend** | Add `suspended: Boolean` on User and skip webhook processing for suspended users. |

**Done when**: Admin can add and edit clients and their WhatsApp/config from the UI.

---

## Phase 4: Reports & Export (CSV / PDF)

Goal: User can **export leads** and **see real reports**.

| # | Task | Details |
|---|------|--------|
| 4.1 | **Export CSV** | Add `GET /api/leads/export?format=csv` (or similar): same auth as leads, return CSV of leads (name, phone, status, interest, location, date). Set header `Content-Disposition: attachment; filename="leads.csv"`. |
| 4.2 | **Wire “Export CSV” button** | On `/user/leads`, button triggers download (e.g. open `/api/leads/export?format=csv` in new tab or fetch and download blob). |
| 4.3 | **Reports from DB** | Add `GET /api/reports/stats`: aggregate from Lead/ChatLog (e.g. leads per day, conversion count, flow vs AI count). Use for Reports page. |
| 4.4 | **Wire Reports page** | Replace mock charts with data from `/api/reports/stats`. |
| 4.5 | **Optional: PDF** | Use a library (e.g. jsPDF or server-side PDF) to generate a simple report PDF; “Generate PDF” downloads it. |

**Done when**: User can download leads as CSV and see real report metrics (and optionally PDF).

---

## Phase 5: Packages & Limits (Optional but Aligns with Plan)

Goal: **Plans in DB** and **message limits** enforced.

| # | Task | Details |
|---|------|--------|
| 5.1 | **Plan model** | Add `Plan` (name, price, messageLimit, features JSON, etc.) and `User.planId` (optional). Seed a few plans. |
| 5.2 | **Admin packages** | CRUD APIs for plans; admin UI reads/writes plans. |
| 5.3 | **User packages** | User dashboard shows current plan (from User.planId); “Upgrade” can link to admin or a checkout flow. |
| 5.4 | **Enforce limit** | In webhook (or in a helper), before processing: check User’s message count (e.g. ChatLog count today or a `dailyMessageCount` field) vs User’s plan limit; if over, reply “Limit reached” and do not call AI. |

**Done when**: Plans exist in DB and message limit can be enforced per user.

---

## Phase 6: Polish & Settings

Goal: **No placeholders**, small UX improvements.

| # | Task | Details |
|---|------|--------|
| 6.1 | **User Settings** | Page to change name, email, password (current user). API: e.g. `PATCH /api/me` with session. |
| 6.2 | **Admin Settings** | Global app settings (e.g. default niche, webhook base URL) or leave as “System configuration” placeholder with a short note. |
| 6.3 | **Landing “Watch Demo”** | Link to a demo video or to `/user` (or simulator) with a demo account. |
| 6.4 | **Niche flow key** | In admin flows page, use `.replace(/-/g, '_')` when mapping flow id to key for consistency. |
| 6.5 | **README / env** | Document all env vars (NEXTAUTH_SECRET, OPENAI_API_KEY, WHATSAPP_VERIFY_TOKEN, WHATSAPP_PHONE_ID, WHATSAPP_TOKEN, DATABASE_URL for production). |

**Done when**: No dead buttons; settings and README are clear.

---

## Quick Reference: What to Do Next

- **If WhatsApp is priority** → Start with **Phase 1** (webhook tenant + engine + reply + Lead/ChatLog).  
- **If dashboard first** → Do **Phase 2** (real stats and history).  
- **If admin must manage clients** → Do **Phase 3** (admin user CRUD).  

After each phase, run the app and test the flow described in **PROJECT_FLOW.md** for that part.
