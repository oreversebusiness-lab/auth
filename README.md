# OreVerse SSO

Centralized authentication service for the OreVerse ecosystem. One login, access all projects.

## Features

- **Email/Password auth** — Standard sign-in/sign-up
- **Social login** — Google and GitHub OAuth
- **SSO Widget** — Drop-in script tag for instant auth on any page
- **Direct Auth** — Full-control auth flow with JWT tokens
- **OAuth 2.0 Apps** — Create and manage registered applications
- **Admin panel** — User role management and integration code generation
- **Dark mode** — Full dark theme support


## Architecture

```
User's Browser
     │
     ├─ SSO Widget (<script src=".../sso/widget">)
     │    └─ Checks session via /api/auth/session-check
     │       ├─ Logged in → shows profile, auto-authenticates
     │       └─ Not logged in → shows sign-in button
     │
     ├─ Direct Auth (/api/dauth?ref=project)
     │    └─ Generates JWT → project verifies → SSO POSTs user data → project creates session
     │
     └─ OAuth 2.0 (registered apps)
          └─ Uses client_id + client_secret for authorization
```

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Auth:** Better Auth v1.6 with Drizzle adapter
- **Database:** PostgreSQL (Neon)
- **Styling:** Tailwind CSS
- **JWT:** jose

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL database (Neon, local, or any provider)

### Setup

```bash
# 1. Clone the repo
git clone https://github.com/oreverse/auth.git
cd auth

# 2. Install dependencies
npm install

# 3. Copy environment file and fill in values
cp .env.example .env
```

Edit `.env` with your configuration (see [Environment Variables](#environment-variables) below).

```bash
# 4. Push database schema
npm run db:push

# 5. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint |
| `npm run db:push` | Push Drizzle schema to database |

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `BETTER_AUTH_SECRET` | Yes | Secret key for JWT (min 32 chars) |
| `BETTER_AUTH_URL` | Yes | Base URL (e.g. `http://localhost:3000`) |
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `GITHUB_CLIENT_ID` | No | GitHub OAuth App client ID |
| `GITHUB_CLIENT_SECRET` | No | GitHub OAuth App client secret |
| `GOOGLE_CLIENT_ID` | No | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | No | Google OAuth client secret |
| `ALLOWED_ORIGINS` | No | CORS origins (`*` for all) |

## Integration Guide

See the full **[Integration Guide](/docs/sso-integration)** for detailed documentation on:

- **SSO Widget** — 1-line drop-in auth
- **Direct Auth** — Button + backend flow with JWT
- **OAuth 2.0** — Registered app authentication
- **API Reference** — All available endpoints

## Project Structure

```
app/
├── (auth)/sign-in/       # Sign-in page
├── (auth)/sign-up/       # Sign-up page
├── api/
│   ├── auth/[...all]/    # Better Auth API
│   ├── auth/session-check/ # CORS session check
│   ├── auth/set-role/    # Admin role promotion
│   ├── dauth/            # Direct Auth JWT generator
│   ├── oauth/            # OAuth apps CRUD
│   └── user/login/dauth/ # Direct Auth user data delivery
├── dashboard/            # Admin/user dashboard
├── demo-project/         # Live widget demo
├── docs/sso-integration/ # Integration guide
└── sso/widget/           # SSO widget script

lib/
├── auth.ts               # Better Auth configuration
├── auth-client.ts        # Client-side auth client
└── auth-helpers.ts       # Server-side helpers

db/
├── db.ts                 # Database connection + schema merge
├── schema.ts             # OAuth app schema
└── auth-schema.ts        # Auth tables schema

examples/direct-auth/     # Example project integration code
```

## Examples

The `examples/` directory contains ready-to-copy code for integrating external projects:

- `examples/direct-auth/` — Button, `/api/dauth`, and `/api/login/dauth` routes

## License

MIT
