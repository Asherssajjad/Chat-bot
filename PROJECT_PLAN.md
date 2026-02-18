# WhatsApp SaaS Chatbot Platform - Project Plan

A premium SaaS platform for managing WhatsApp automation with niche-based hardcoded flows and AI-powered fallback (Claude).

## 1. Project Overview
The platform provides a dual-dashboard system for managing WhatsApp agents. It prioritizes cost-efficiency by using pre-defined "niche" flows (e.g., Car Booking, Real Estate) and only scaling to AI (Claude) when necessary.

## 2. Core Features

### Admin Dashboard (Owner)
- **User Management**: Creation, suspension, and monitoring of client accounts.
- **Plan/Package Management**: WHMCS-style configuration for pricing, limits, and features.
- **Global Analytics**: Revenue tracking, system-wide bot activity, and API usage.
- **Niche Templates**: Configuration of the "Hardcoded Flows" available to users.

### User Dashboard (SaaS Client)
- **Bot Configuration**: Connect WhatsApp API and AI API keys.
- **Niche Selection**: Select a business category (e.g., Car Booking) to pre-load specific chat logic.
- **Lead Management**: CRM-style view of all leads captured by the bot.
- **Monthly Reports**: Performance analytics, engagement rates, and lead conversion data.
- **Chat Logs**: Real-time monitoring of bot interactions.

### AI & Logic Engine
- **Hybrid Flow Strategy**: 
    1. **Niche Matching**: If a user query matches a predefined flow step (e.g., "I want to book a car"), use hardcoded logic.
    2. **AI Fallback**: If the query is unknown, process with Claude AI for a natural response.
- **Multi-tenant Isolation**: Separate database entries for every user ensures data privacy.

## 3. Tech Stack
- **Framework**: Next.js 14/15 (App Router, Server Components).
- **Styling**: Premium Vanilla CSS (Custom design system, glassmorphism, high-fidelity UI).
- **Backend**: Next.js API Routes / Server Actions.
- **Database**: PostgreSQL (Prisma ORM) for reliable multi-tenant data.
- **Integrations**: WhatsApp Business API, Anthropic (Claude) API.

## 4. Immediate Development Steps
1. **Infrastructure Setup**: Initialize project and database schema.
2. **Admin UI**: Build the premium Admin dashboard layout and User management module.
3. **User UI**: Build the client portal with Niche selection and Lead CRM.
4. **WhatsApp Webhook**: Implement the hybrid flow logic engine.
5. **Reporting Module**: Develop the data aggregation and CSV/PDF report generation.

---
**Status**: Initializing project structure...
