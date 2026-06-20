import Link from "next/link"

const SSO_URL = process.env.BETTER_AUTH_URL || "http://localhost:3000"

export default function SSOIntegrationPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="mb-8">
        <Link href="/" className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">&larr; Back to Home</Link>
        <h1 className="mt-4 text-3xl font-bold text-zinc-900 dark:text-zinc-50">SSO Integration Guide</h1>
        <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
          Everything you need to integrate OreVerse Single Sign-On into any project
        </p>
      </div>

      <nav className="mb-10 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">On this page</h2>
        <ul className="space-y-1 text-sm">
          <li><a href="#overview" className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">Overview</a></li>
          <li><a href="#ssowidget" className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">Method 1: SSO Widget (1 line — Recommended)</a></li>
          <li><a href="#dauth" className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">Method 2: Direct Auth (Button + Backend)</a></li>
          <li><a href="#oauth" className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">Method 3: OAuth 2.0 (Custom Apps)</a></li>
          <li><a href="#api" className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">API Reference</a></li>
          <li><a href="#env" className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">Environment Variables</a></li>
        </ul>
      </nav>

      {/* ───── Overview ───── */}
      <section id="overview" className="mb-10">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">How It Works</h2>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400 leading-relaxed">
          OreVerse SSO is a centralized authentication service. Users sign in once and automatically get authenticated on every connected project — no separate sign-ups needed.
        </p>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400 leading-relaxed">
          There are three ways to integrate:
        </p>
        <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
          <li><strong className="text-zinc-900 dark:text-zinc-100">SSO Widget</strong> — Drop a script tag. No backend changes. Best for simple projects.</li>
          <li><strong className="text-zinc-900 dark:text-zinc-100">Direct Auth</strong> — Button + two API routes on your project. Full control over the UX.</li>
          <li><strong className="text-zinc-900 dark:text-zinc-100">OAuth 2.0</strong> — Registered apps with client_id/client_secret. For complex or server-side integrations.</li>
        </ul>
      </section>

      {/* ───── Method 1: SSO Widget ───── */}
      <section id="ssowidget" className="mb-10 rounded-xl border-2 border-indigo-200 bg-indigo-50 p-6 dark:border-indigo-800 dark:bg-indigo-950">
        <div className="mb-4 flex items-center gap-2">
          <span className="rounded-full bg-indigo-600 px-2 py-0.5 text-xs font-semibold text-white">RECOMMENDED</span>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Method 1: SSO Widget</h2>
        </div>
        <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
          Paste one line into your HTML and get automatic SSO. If the user is logged in at OreVerse, they&apos;ll see their profile. If not, they&apos;ll see a sign-in button. No backend changes needed.
        </p>

        <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4 text-xs text-zinc-100">{`<script src="${SSO_URL}/sso/widget" async></script>`}</pre>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-indigo-200 bg-white p-4 dark:border-indigo-800 dark:bg-zinc-900">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">User is logged in</h3>
            <p className="mt-1 text-xs text-zinc-500">Widget shows avatar, name, email, and sign-out button. Auto-login happens silently.</p>
          </div>
          <div className="rounded-lg border border-indigo-200 bg-white p-4 dark:border-indigo-800 dark:bg-zinc-900">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">User is NOT logged in</h3>
            <p className="mt-1 text-xs text-zinc-500">Widget shows &ldquo;Sign in with OreVerse&rdquo; button. Clicking redirects to SSO, then back to your project.</p>
          </div>
        </div>

        <div className="mt-4 rounded-lg bg-white p-4 dark:bg-zinc-900">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Custom attributes</h3>
          <pre className="mt-2 overflow-x-auto rounded-lg bg-zinc-900 p-3 text-xs text-zinc-100">{`<script src="${SSO_URL}/sso/widget" data-project="my-project" data-domain="example.com" async></script>`}</pre>
          <ul className="mt-2 space-y-1 text-xs text-zinc-500">
            <li><code className="rounded bg-zinc-100 px-1 py-0.5 dark:bg-zinc-800">data-project</code> — Your project name (shown in widget)</li>
            <li><code className="rounded bg-zinc-100 px-1 py-0.5 dark:bg-zinc-800">data-domain</code> — Your project domain (for redirect back)</li>
          </ul>
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/demo-project" className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition-colors">
            See Live Demo
          </Link>
          <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-lg border border-indigo-300 bg-white px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-50 transition-colors dark:border-indigo-700 dark:bg-zinc-800 dark:text-indigo-300 dark:hover:bg-zinc-700">
            Generate Widget Code
          </Link>
        </div>
      </section>

      {/* ───── Method 2: Direct Auth ───── */}
      <section id="dauth" className="mb-10 rounded-xl border-2 border-emerald-200 bg-emerald-50 p-6 dark:border-emerald-900/30 dark:bg-emerald-950">
        <div className="mb-4 flex items-center gap-2">
          <span className="rounded-full bg-emerald-600 px-2 py-0.5 text-xs font-semibold text-white">ADVANCED</span>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Method 2: Direct Auth</h2>
        </div>
        <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
          Full-control auth flow. Add a &ldquo;Sign in with OreVerse&rdquo; button to your project. User is redirected to SSO, then back with a signed JWT token. Your backend verifies the token and creates a local session.
        </p>

        <Step number="1" title="Add the sign-in button">
          <p className="mb-2">Place this on your login page:</p>
          <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-3 text-xs text-zinc-100">{`<a href="${SSO_URL}/api/dauth?ref=https://your-project.com">
  Sign in with OreVerse
</a>`}</pre>
          <p className="mt-1 text-xs text-zinc-500">Replace <code className="rounded bg-zinc-100 px-1 py-0.5 dark:bg-zinc-800">https://your-project.com</code> with your project URL.</p>
        </Step>

        <Step number="2" title="Create /api/dauth on your project">
          <p className="mb-2">This route receives the JWT token from OreVerse. Verify it, then redirect to get user data.</p>
          <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-3 text-xs text-zinc-100">{`import { NextRequest, NextResponse } from "next/server"
import * as jose from "jose"

const SSO_URL = "${SSO_URL}"
const JWT_SECRET = new TextEncoder().encode(process.env.BETTER_AUTH_SECRET!)

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token")

  if (!token) {
    return NextResponse.redirect(
      \`\${SSO_URL}/sign-in?dauth=true&from=\${encodeURIComponent(request.nextUrl.origin)}\`
    )
  }

  try {
    await jose.jwtVerify(token, JWT_SECRET)
    return NextResponse.redirect(
      \`\${SSO_URL}/api/user/login/dauth?ref=\${encodeURIComponent(request.nextUrl.origin)}&token=\${token}\`
    )
  } catch {
    return NextResponse.redirect(
      \`\${SSO_URL}/sign-in?dauth=true&from=\${encodeURIComponent(request.nextUrl.origin)}\`
    )
  }
}`}</pre>
          <p className="mt-1 text-xs text-zinc-500">The <code className="rounded bg-zinc-100 px-1 py-0.5 dark:bg-zinc-800">BETTER_AUTH_SECRET</code> must match your SSO server&apos;s secret.</p>
        </Step>

        <Step number="3" title="Create /api/login/dauth on your project">
          <p className="mb-2">OreVerse POSTs user data (name, email, image) here. Create a local session and redirect.</p>
          <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-3 text-xs text-zinc-100">{`import { NextRequest, NextResponse } from "next/server"
import * as jose from "jose"

const JWT_SECRET = new TextEncoder().encode(process.env.BETTER_AUTH_SECRET!)

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { token, name, email, image } = body

  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 })
  }

  try {
    await jose.jwtVerify(token, JWT_SECRET)

    // TODO: Create or find user in your DB
    // const user = await db.insert(users)
    //   .values({ name, email, avatar: image })
    //   .returning()

    const sessionToken = crypto.randomUUID()
    const response = NextResponse.redirect(new URL("/dashboard", request.nextUrl.origin))
    response.cookies.set("session_token", sessionToken, {
      httpOnly: true, secure: true, sameSite: "lax", path: "/",
      maxAge: 60 * 60 * 24 * 7,
    })
    return response
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 })
  }
}`}</pre>
        </Step>

        <div className="mt-4 rounded-lg border border-emerald-200 bg-white p-4 dark:border-emerald-900 dark:bg-zinc-900">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Complete example project</h3>
          <p className="mt-1 text-xs text-zinc-500">
            A ready-to-copy example is available in the repository at <code className="rounded bg-zinc-100 px-1 py-0.5 dark:bg-zinc-800">examples/direct-auth/</code>.
          </p>
        </div>

        <div className="mt-4">
          <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500 transition-colors">
            Generate Direct Auth Code
          </Link>
        </div>
      </section>

      {/* ───── Method 3: OAuth 2.0 ───── */}
      <section id="oauth" className="mb-10 rounded-xl border-2 border-violet-200 bg-violet-50 p-6 dark:border-violet-900/30 dark:bg-violet-950">
        <div className="mb-4 flex items-center gap-2">
          <span className="rounded-full bg-violet-600 px-2 py-0.5 text-xs font-semibold text-white">CUSTOM</span>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Method 3: OAuth 2.0 Apps</h2>
        </div>
        <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
          Create registered OAuth applications with client credentials. Use the standard OAuth 2.0 Authorization Code flow to authenticate users on any platform — web, mobile, or server-side.
        </p>

        <Step number="1" title="Create an OAuth App">
          <p className="mb-2">Go to your <Link href="/dashboard" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">Dashboard</Link> and scroll to the <strong>OAuth Applications</strong> section. Click <strong>Create App</strong> and provide:</p>
          <ul className="mb-2 list-inside list-disc space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
            <li><strong className="text-zinc-900 dark:text-zinc-100">App Name</strong> — A display name for your application</li>
            <li><strong className="text-zinc-900 dark:text-zinc-100">Redirect URIs</strong> — Comma-separated list of allowed callback URLs (e.g. <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-800">https://app.com/callback, http://localhost:3000/callback</code>)</li>
          </ul>
          <p className="text-xs text-zinc-500">After creation, you&apos;ll receive a <code className="rounded bg-zinc-100 px-1 py-0.5 dark:bg-zinc-800">client_id</code> and <code className="rounded bg-zinc-100 px-1 py-0.5 dark:bg-zinc-800">client_secret</code>. Save the secret — it&apos;s shown only once.</p>
        </Step>

        <Step number="2" title="Redirect users to authorize">
          <p className="mb-2">Construct the authorization URL and redirect the user:</p>
          <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-3 text-xs text-zinc-100">{`${SSO_URL}/sign-in?ref=${encodeURIComponent("https://your-project.com")}`}</pre>
          <p className="mt-1 text-xs text-zinc-500">Optionally pass your <code className="rounded bg-zinc-100 px-1 py-0.5 dark:bg-zinc-800">client_id</code> and <code className="rounded bg-zinc-100 px-1 py-0.5 dark:bg-zinc-800">redirect_uri</code> as query params.</p>
        </Step>

        <Step number="3" title="Verify the session">
          <p className="mb-2">After the user is redirected back to your project, verify their session via the SSO API:</p>
          <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-3 text-xs text-zinc-100">{`const response = await fetch("${SSO_URL}/api/auth/session-check", {
  credentials: "include",
})
const { authenticated, user } = await response.json()

if (authenticated) {
  // user.name, user.email, user.id are available
  console.log("Authenticated as:", user.email)
}`}</pre>
        </Step>

        <Step number="4" title="Manage your apps via API">
          <p className="mb-2">You can also manage OAuth apps programmatically. <a href="#api-oauth" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">See API Reference below</a>.</p>
        </Step>

        <div className="mt-4 rounded-lg border border-violet-200 bg-white p-4 dark:border-violet-900 dark:bg-zinc-900">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">When to use OAuth Apps</h3>
          <ul className="mt-2 list-inside list-disc space-y-1 text-xs text-zinc-500">
            <li>You need client credentials (client_id + client_secret) for API access</li>
            <li>You&apos;re building a mobile or desktop app that can&apos;t use cookies</li>
            <li>You need fine-grained control over callback URLs and permissions</li>
            <li>You want to offer &ldquo;Sign in with OreVerse&rdquo; on third-party services</li>
          </ul>
        </div>
      </section>

      {/* ───── API Reference ───── */}
      <section id="api" className="mb-10">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">API Reference</h2>
        <p className="mt-2 text-sm text-zinc-500 mb-6">Complete reference for all available API endpoints.</p>

        {/* API: Session Check */}
        <ApiEndpoint method="GET" path="/api/auth/session-check">
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Check if the user has an active session on the SSO. Used by the widget and for server-side verification.</p>
          <h4 className="text-xs font-semibold text-zinc-500 mb-1">Response</h4>
          <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-3 text-xs text-zinc-100 mb-2">{`{
  "authenticated": true,
  "user": {
    "id": "usr_...",
    "name": "John",
    "email": "john@example.com",
    "image": "https://..."
  }
}`}</pre>
          <p className="text-xs text-zinc-500">Requires <code className="rounded bg-zinc-100 px-1 py-0.5 dark:bg-zinc-800">{'credentials: "include"'}</code> for cross-origin requests.</p>
        </ApiEndpoint>

        {/* API: Widget */}
        <ApiEndpoint method="GET" path="/sso/widget">
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Serves a JavaScript widget that renders SSO status on any page. Supports <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-800">data-project</code> and <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-800">data-domain</code> attributes.</p>
          <h4 className="text-xs font-semibold text-zinc-500 mb-1">Usage</h4>
          <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-3 text-xs text-zinc-100 mb-2">{`<script src="${SSO_URL}/sso/widget" data-project="my-project" async></script>`}</pre>
          <p className="text-xs text-zinc-500">Returns <code className="rounded bg-zinc-100 px-1 py-0.5 dark:bg-zinc-800">Content-Type: application/javascript</code>. Cached for 1 hour.</p>
        </ApiEndpoint>

        {/* API: Dauth */}
        <ApiEndpoint method="GET" path="/api/dauth">
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Direct Auth endpoint. If the user is logged in, generates a signed JWT and redirects to the project. If not, redirects to sign-in.</p>
          <h4 className="text-xs font-semibold text-zinc-500 mb-1">Query params</h4>
          <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-3 text-xs text-zinc-100 mb-2">{`/api/dauth?ref=https://your-project.com`}</pre>
          <table className="w-full text-xs text-left">
            <thead><tr className="text-zinc-500"><th className="pb-1 pr-4">Param</th><th className="pb-1">Description</th></tr></thead>
            <tbody>
              <tr><td className="pr-4 font-mono text-zinc-900 dark:text-zinc-100">ref</td><td className="text-zinc-600 dark:text-zinc-400">Redirect URL after auth (required)</td></tr>
            </tbody>
          </table>
        </ApiEndpoint>

        {/* API: Login Dauth */}
        <ApiEndpoint method="GET" path="/api/user/login/dauth">
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">POSTs user data to the project after JWT verification. The project must implement <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-800">POST /api/login/dauth</code> to receive the data.</p>
          <h4 className="text-xs font-semibold text-zinc-500 mb-1">Query params</h4>
          <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-3 text-xs text-zinc-100 mb-2">{`/api/user/login/dauth?ref=https://your-project.com&token=jwt...`}</pre>
          <table className="w-full text-xs text-left">
            <thead><tr className="text-zinc-500"><th className="pb-1 pr-4">Param</th><th className="pb-1">Description</th></tr></thead>
            <tbody>
              <tr><td className="pr-4 font-mono text-zinc-900 dark:text-zinc-100">ref</td><td className="text-zinc-600 dark:text-zinc-400">Your project URL</td></tr>
              <tr><td className="pr-4 font-mono text-zinc-900 dark:text-zinc-100">token</td><td className="text-zinc-600 dark:text-zinc-400">JWT token from the dauth flow</td></tr>
            </tbody>
          </table>
          <h4 className="text-xs font-semibold text-zinc-500 mt-2 mb-1">POST body sent to your project</h4>
          <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-3 text-xs text-zinc-100">{`{
  "token": "jwt...",
  "name": "John Doe",
  "email": "john@example.com",
  "image": "https://..."
}`}</pre>
        </ApiEndpoint>

        {/* API: OAuth */}
        <ApiEndpoint method="GET | POST | DELETE" path="/api/oauth" id="api-oauth">
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Manage OAuth applications. All endpoints require authentication.</p>

          <h4 className="text-xs font-semibold text-zinc-500 mt-3 mb-1">GET — List your apps</h4>
          <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-3 text-xs text-zinc-100 mb-2">{`GET /api/oauth
→ [{ id, name, clientId, clientSecret, redirectUris, scopes, createdAt }]`}</pre>

          <h4 className="text-xs font-semibold text-zinc-500 mt-3 mb-1">POST — Create a new app</h4>
          <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-3 text-xs text-zinc-100 mb-2">{`POST /api/oauth
Content-Type: application/json
{ "name": "My App", "redirectUris": ["https://app.com/callback"] }
→ { id, name, clientId, clientSecret, redirectUris, scopes }`}</pre>
          <table className="w-full text-xs text-left mb-2">
            <thead><tr className="text-zinc-500"><th className="pb-1 pr-4">Field</th><th className="pb-1 pr-4">Type</th><th className="pb-1">Description</th></tr></thead>
            <tbody>
              <tr><td className="pr-4 font-mono text-zinc-900 dark:text-zinc-100">name</td><td className="pr-4 text-zinc-600 dark:text-zinc-400">string</td><td className="text-zinc-600 dark:text-zinc-400">Display name (required)</td></tr>
              <tr><td className="pr-4 font-mono text-zinc-900 dark:text-zinc-100">redirectUris</td><td className="pr-4 text-zinc-600 dark:text-zinc-400">string[]</td><td className="text-zinc-600 dark:text-zinc-400">Allowed callback URLs (required)</td></tr>
            </tbody>
          </table>

          <h4 className="text-xs font-semibold text-zinc-500 mt-3 mb-1">DELETE — Delete an app</h4>
          <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-3 text-xs text-zinc-100">{`DELETE /api/oauth?id=app_id
→ { "success": true }`}</pre>
        </ApiEndpoint>

        {/* API: Set Role */}
        <ApiEndpoint method="POST" path="/api/auth/set-role">
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Promote a user to admin. Requires admin session.</p>
          <h4 className="text-xs font-semibold text-zinc-500 mb-1">Body</h4>
          <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-3 text-xs text-zinc-100">{`{ "userId": "usr_...", "role": "admin" }`}</pre>
        </ApiEndpoint>
      </section>

      {/* ───── Environment Variables ───── */}
      <section id="env" className="mb-10 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Environment Variables</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 mb-4">Configure these in your <code className="rounded bg-zinc-100 px-1 py-0.5 dark:bg-zinc-800">.env</code> file:</p>
        <table className="w-full text-xs text-left">
          <thead><tr className="text-zinc-500 border-b border-zinc-200 dark:border-zinc-700"><th className="pb-2 pr-4 font-semibold">Variable</th><th className="pb-2 pr-4 font-semibold">Required</th><th className="pb-2 font-semibold">Description</th></tr></thead>
          <tbody>
            <EnvRow var="BETTER_AUTH_SECRET" req="Yes" desc="Secret key for JWT signing and encryption (min 32 chars)" />
            <EnvRow var="BETTER_AUTH_URL" req="Yes" desc="Base URL of the SSO server (e.g. http://localhost:3000)" />
            <EnvRow var="DATABASE_URL" req="Yes" desc="PostgreSQL connection string" />
            <EnvRow var="GITHUB_CLIENT_ID" req="No" desc="GitHub OAuth App client ID (for social login)" />
            <EnvRow var="GITHUB_CLIENT_SECRET" req="No" desc="GitHub OAuth App client secret" />
            <EnvRow var="GOOGLE_CLIENT_ID" req="No" desc="Google OAuth client ID (for social login)" />
            <EnvRow var="GOOGLE_CLIENT_SECRET" req="No" desc="Google OAuth client secret" />
            <EnvRow var="ALLOWED_ORIGINS" req="No" desc="Comma-separated CORS origins (use * for all)" />
          </tbody>
        </table>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Need Help?</h2>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Visit the <Link href="/dashboard" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">Admin Dashboard</Link> to manage OAuth apps and generate integration code.
        </p>
      </section>
    </div>
  )
}

function Step({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <div className="mb-4 rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-start gap-4">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">{number}</div>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">{title}</h3>
          <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  )
}

function ApiEndpoint({ method, path, children, id }: { method: string; path: string; children: React.ReactNode; id?: string }) {
  return (
    <div id={id} className="mb-4 rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-3 flex items-center gap-3">
        <span className="rounded bg-zinc-900 px-2 py-0.5 text-xs font-mono font-bold text-white dark:bg-zinc-100 dark:text-zinc-900">{method}</span>
        <span className="font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100">{path}</span>
      </div>
      {children}
    </div>
  )
}

function EnvRow({ var: name, req, desc }: { var: string; req: string; desc: string }) {
  return (
    <tr className="border-b border-zinc-100 dark:border-zinc-800">
      <td className="py-2 pr-4 font-mono text-zinc-900 dark:text-zinc-100">{name}</td>
      <td className={`py-2 pr-4 ${req === "Yes" ? "text-red-600 dark:text-red-400" : "text-zinc-500"}`}>{req}</td>
      <td className="py-2 text-zinc-600 dark:text-zinc-400">{desc}</td>
    </tr>
  )
}
