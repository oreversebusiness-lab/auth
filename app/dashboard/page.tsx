"use client"

import { authClient } from "@/lib/auth-client"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, Suspense, useState, useRef } from "react"

const SSO_URL = process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000"

function DashboardInner() {
  const { data: session, isPending } = authClient.useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const ref = searchParams.get("ref")

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/sign-in")
    }
  }, [session, isPending, router])

  async function handleSignOut() {
    await authClient.signOut()
    router.push("/")
    router.refresh()
  }

  function handleGoBack() {
    if (ref) window.location.href = ref
  }

  if (isPending) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
      </div>
    )
  }

  if (!session) return null

  const user = session.user as typeof session.user & { role?: string }
  const isAdmin = user.role === "admin"

  return (
    <div className="flex flex-1 flex-col">
      <header className="flex items-center justify-between border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-indigo-600 text-xs font-bold text-white">O</div>
          <span className="text-sm font-semibold">OreVerse SSO</span>
          {isAdmin && <span className="ml-2 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-900 dark:text-amber-300">Admin</span>}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-zinc-600 dark:text-zinc-400">{user.email}</span>
          <button onClick={handleSignOut} className="rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition-colors dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700">
            Sign Out
          </button>
        </div>
      </header>

      {ref && (
        <div className="flex items-center justify-between bg-indigo-50 px-6 py-3 dark:bg-indigo-950">
          <p className="text-sm text-indigo-700 dark:text-indigo-300">
            Signed in via <span className="font-semibold">{new URL(ref).hostname || ref}</span>
          </p>
          <button onClick={handleGoBack} className="rounded-lg bg-indigo-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-indigo-500 transition-colors">
            Go Back
          </button>
        </div>
      )}

      <main className="flex flex-1 flex-col gap-6 p-6">
        {isAdmin ? (
          <>
            <AdminPanel user={user} />
            <DirectAuthSection />
          </>
        ) : (
          <UserProfile user={user} />
        )}
        <OAuthAppsManager />
      </main>
    </div>
  )
}

function UserProfile({ user }: { user: { name: string; email: string; emailVerified: boolean; id: string; image?: string | null; role?: string } }) {
  return (
    <div className="mx-auto w-full max-w-lg">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100 text-3xl font-bold text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300">
          {user.name?.charAt(0)?.toUpperCase() || "?"}
        </div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Welcome, {user.name}</h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">You are signed in to the OreVerse ecosystem</p>
      </div>
      <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500">Account Details</h2>
        <dl className="space-y-3">
          {[
            { label: "Name", value: user.name },
            { label: "Email", value: user.email },
            { label: "Role", value: user.role || "user" },
            { label: "Email Verified", value: user.emailVerified ? "Yes" : "No", highlight: !user.emailVerified },
          ].map(({ label, value, highlight }) => (
            <div key={label} className="flex justify-between">
              <dt className="text-sm text-zinc-600 dark:text-zinc-400">{label}</dt>
              <dd className={`text-sm font-medium ${highlight ? "text-amber-600 dark:text-amber-400" : "text-zinc-900 dark:text-zinc-100"}`}>{String(value ?? "-")}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="mt-6 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-500">Connected Projects</h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Your OreVerse SSO account gives you access to all OreVerse projects. More projects coming soon.
        </p>
      </div>

      <Link href="/docs/oauth" className="mt-6 block rounded-xl border-2 border-violet-200 bg-violet-50 p-6 transition-colors hover:border-violet-300 dark:border-violet-900/30 dark:bg-violet-950 dark:hover:border-violet-700">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-violet-900 dark:text-violet-100">OAuth Apps</h2>
            <p className="mt-1 text-xs text-violet-600 dark:text-violet-300">
              Create and manage OAuth applications for your projects
            </p>
          </div>
          <span className="text-lg text-violet-500">&rarr;</span>
        </div>
      </Link>
    </div>
  )
}

function AdminPanel({ user }: { user: { name: string; email: string; id: string; role?: string } }) {
  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Admin Dashboard</h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Manage OreVerse SSO users, projects, and settings</p>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {[
          { label: "Total Users", value: "-", desc: "All registered users" },
          { label: "Active Sessions", value: "-", desc: "Currently active" },
          { label: "Connected Apps", value: "3", desc: "OreVerse projects" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{s.value}</div>
            <div className="mt-1 text-sm font-medium text-zinc-700 dark:text-zinc-300">{s.label}</div>
            <div className="text-xs text-zinc-500">{s.desc}</div>
          </div>
        ))}
      </div>

      <SSOWidgetGenerator />
      <AdminActions user={user} />
    </div>
  )
}

function SSOWidgetGenerator() {
  const [domain, setDomain] = useState("")
  const [projectName, setProjectName] = useState("")
  const [copied, setCopied] = useState(false)

  const snippet = `<!-- OreVerse SSO Widget -->
<script>
(function() {
  var s = document.createElement("script");
  s.src = "${SSO_URL}/sso/widget";
  s.setAttribute("data-project", "${projectName || "my-project"}");
  s.setAttribute("data-domain", "${domain || "your-domain.com"}");
  s.async = true;
  document.head.appendChild(s);
})();
</script>`

  async function copySnippet() {
    await navigator.clipboard.writeText(snippet)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="mb-6 rounded-xl border border-indigo-200 bg-white p-6 dark:border-indigo-900/30 dark:bg-zinc-900">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-indigo-600 text-xs font-bold text-white">&lt;/&gt;</div>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">SSO Widget Code Generator</h2>
      </div>
      <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
        Paste this widget into any project to enable automatic OreVerse SSO. Users logged in at OreVerse will be auto-authenticated on your project.
      </p>

      <div className="mb-4 grid gap-3 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Project Name</label>
          <input value={projectName} onChange={(e) => setProjectName(e.target.value)} placeholder="My Awesome Project" className="mt-1 block w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100" />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Project Domain</label>
          <input value={domain} onChange={(e) => setDomain(e.target.value)} placeholder="myproject.com" className="mt-1 block w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100" />
        </div>
      </div>

      <div className="relative">
        <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4 text-xs text-zinc-100">{snippet}</pre>
        <button onClick={copySnippet} className="absolute right-2 top-2 rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-500 transition-colors">
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      <div className="mt-4 rounded-lg border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-700 dark:bg-zinc-800">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">How it works</h3>
        <ol className="mt-2 list-inside list-decimal space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
          <li>Paste the code above into your project&apos;s HTML (before <code className="rounded bg-zinc-200 px-1 py-0.5 text-xs dark:bg-zinc-700">&lt;/body&gt;</code>)</li>
          <li>The widget detects if the user is logged in at OreVerse SSO</li>
          <li>If logged in: shows user info, auto-authenticates on your project</li>
          <li>If not logged in: shows a &ldquo;Sign in with OreVerse&rdquo; button</li>
          <li>After login at SSO, the user is redirected back to your project</li>
        </ol>
      </div>
    </div>
  )
}

function AdminActions({ user }: { user: { name: string; email: string; id: string } }) {
  function setUserAsAdmin() {
    const userId = prompt("Enter user ID to promote to admin:")
    if (!userId) return
    fetch("/api/auth/set-role", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, role: "admin" }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.error) alert("Error: " + d.error)
        else alert("User promoted to admin!")
      })
      .catch(() => alert("Failed to set role"))
  }

  return (
    <>
      <div className="mb-6 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500">Admin Actions</h2>
        <div className="flex flex-wrap gap-3">
          <button onClick={setUserAsAdmin} className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-500 transition-colors">
            Promote User to Admin
          </button>
          <a href="/docs/sso-integration" className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition-colors dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700">
            Full Integration Docs
          </a>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500">Your Profile</h2>
        <dl className="space-y-3">
          {[
            { label: "Name", value: user.name },
            { label: "Email", value: user.email },
            { label: "User ID", value: user.id },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between">
              <dt className="text-sm text-zinc-600 dark:text-zinc-400">{label}</dt>
              <dd className="max-w-[250px] truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">{String(value ?? "-")}</dd>
            </div>
          ))}
        </dl>
      </div>
    </>
  )
}

function DirectAuthSection() {
  const [projectUrl, setProjectUrl] = useState("")
  const [activeTab, setActiveTab] = useState<"button" | "api-dauth" | "api-login">("button")

  const buttonCode = `<a href="${SSO_URL}/api/dauth?ref=${projectUrl || "https://your-project.com"}">
  Sign in with OreVerse
</a>`

  const apiDauthCode = `// app/api/dauth/route.ts
import { NextRequest, NextResponse } from "next/server"
import * as jose from "jose"

const SSO_URL = "https://auth.oreverse.com"
const JWT_SECRET = new TextEncoder().encode(process.env.BETTER_AUTH_SECRET!)

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token")
  if (!token) return NextResponse.redirect(\`\${SSO_URL}/sign-in?dauth=true&from=\${request.nextUrl.origin}\`)

  try {
    const { payload } = await jose.jwtVerify(token, JWT_SECRET)
    return NextResponse.redirect(\`\${SSO_URL}/api/user/login/dauth?ref=\${request.nextUrl.origin}&token=\${token}\`)
  } catch {
    return NextResponse.redirect(\`\${SSO_URL}/sign-in?dauth=true&from=\${request.nextUrl.origin}\`)
  }
}`

  const apiLoginCode = `// app/api/login/dauth/route.ts
import { NextRequest, NextResponse } from "next/server"
import * as jose from "jose"

const JWT_SECRET = new TextEncoder().encode(process.env.BETTER_AUTH_SECRET!)

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { token, name, email, image } = body

  if (!token) return NextResponse.json({ error: "Missing token" }, { status: 400 })

  try {
    const { payload } = await jose.jwtVerify(token, JWT_SECRET)
    // Create or find local user with payload.email / payload.name
    const user = {
      id: payload.sub,
      name: payload.name,
      email: payload.email,
      image: payload.picture || null,
    }

    // Create session token, set cookie, etc.
    const sessionToken = crypto.randomUUID()
    const response = NextResponse.redirect(request.nextUrl.origin)
    response.cookies.set("session_token", sessionToken, {
      httpOnly: true, secure: true, sameSite: "lax", path: "/",
    })
    return response
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 })
  }
}`

  const snippets: Record<string, { code: string; title: string; desc: string }> = {
    button: {
      title: "Sign-in Button",
      desc: "A simple link that starts the Direct Auth flow. Place this on your project's sign-in page.",
      code: buttonCode,
    },
    "api-dauth": {
      title: "API Route: /api/dauth",
      desc: "Handles the incoming JWT token from SSO. Redirects to SSO sign-in if no token present.",
      code: apiDauthCode,
    },
    "api-login": {
      title: "API Route: /api/login/dauth",
      desc: "Receives user data via POST from the SSO. Creates a local session for the user.",
      code: apiLoginCode,
    },
  }

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="rounded-xl border border-emerald-200 bg-white p-6 dark:border-emerald-900/30 dark:bg-zinc-900">
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-600 text-xs font-bold text-white">&rarr;</div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">Direct Auth Integration</h2>
        </div>
        <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
          Direct Auth lets your project authenticate users via the OreVerse SSO without the drop-in widget.
          Copy these three pieces into your project.
        </p>

        <div className="mb-4">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Your Project URL</label>
          <input value={projectUrl} onChange={(e) => setProjectUrl(e.target.value)} placeholder="https://your-project.com" className="mt-1 block w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100" />
        </div>

        <div className="mb-4 flex gap-2 border-b border-zinc-200 dark:border-zinc-700">
          {Object.entries(snippets).map(([key, s]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as typeof activeTab)}
              className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === key ? "border-b-2 border-emerald-600 text-emerald-600" : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"}`}
            >
              {s.title}
            </button>
          ))}
        </div>

        {(() => {
          const s = snippets[activeTab]
          return (
            <>
              <p className="mb-3 text-sm text-zinc-600 dark:text-zinc-400">{s.desc}</p>
              <div className="relative">
                <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4 text-xs text-zinc-100">{s.code}</pre>
                <CopyButton text={s.code} />
              </div>
            </>
          )
        })()}
      </div>
    </div>
  )
}

type OAuthAppSummary = {
  id: string
  name: string
  clientId: string
  redirectUris: string[]
  scopes: string | null
  createdAt: string
}

type OAuthAppWithSecret = OAuthAppSummary & { clientSecret: string }

function OAuthAppsManager() {
  const [apps, setApps] = useState<OAuthAppSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState("")
  const [redirectUris, setRedirectUris] = useState("")
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState("")
  const [newApp, setNewApp] = useState<OAuthAppWithSecret | null>(null)
  const [regeneratedSecret, setRegeneratedSecret] = useState<{ id: string; secret: string } | null>(null)
  const [regeneratingId, setRegeneratingId] = useState<string | null>(null)
  const notRendered = useRef(true)

  useEffect(() => {
    if (!notRendered.current) return
    notRendered.current = false
    setLoading(true)
    fetch("/api/oauth")
      .then((r) => r.ok ? r.json() : [])
      .then(setApps)
      .finally(() => setLoading(false))
  }, [])

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setCreating(true)
    setNewApp(null)
    try {
      const res = await fetch("/api/oauth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          redirectUris: redirectUris.split(",").map((s) => s.trim()).filter(Boolean),
        }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || "Failed to create"); return }
      setNewApp(data)
      setName("")
      setRedirectUris("")
      fetch("/api/oauth").then((r) => { if (r.ok) r.json().then(setApps) })
    } catch { setError("Failed to create OAuth app") }
    setCreating(false)
  }

  async function handleRegenerateSecret(id: string) {
    setRegeneratingId(id)
    setRegeneratedSecret(null)
    try {
      const res = await fetch(`/api/oauth?id=${encodeURIComponent(id)}`, { method: "PATCH" })
      const data = await res.json()
      if (!res.ok) { alert(data.error || "Failed to regenerate"); return }
      setRegeneratedSecret({ id, secret: data.clientSecret })
    } catch { alert("Failed to regenerate secret") }
    setRegeneratingId(null)
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this OAuth app? This cannot be undone.")) return
    try {
      await fetch(`/api/oauth?id=${encodeURIComponent(id)}`, { method: "DELETE" })
      setApps((prev) => prev.filter((a) => a.id !== id))
    } catch { alert("Failed to delete") }
  }

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-indigo-600 text-xs font-bold text-white">O</div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">OAuth Applications</h2>
        </div>

        <form onSubmit={handleCreate} className="mb-6 rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800">
          <h3 className="mb-3 text-sm font-medium text-zinc-700 dark:text-zinc-300">Create New OAuth App</h3>
          <div className="mb-3 grid gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400">App Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} required placeholder="My App" className="mt-1 block w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400">Redirect URIs (comma-separated)</label>
              <input value={redirectUris} onChange={(e) => setRedirectUris(e.target.value)} required placeholder="https://app.com/callback, http://localhost:3000/callback" className="mt-1 block w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100" />
            </div>
          </div>
          {error && <p className="mb-2 text-sm text-red-600 dark:text-red-400">{error}</p>}
          <button type="submit" disabled={creating} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-50 transition-colors">
            {creating ? "Creating..." : "Create App"}
          </button>
        </form>

        {newApp && (
          <div className="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900/30 dark:bg-emerald-950">
            <h3 className="mb-2 text-sm font-semibold text-emerald-700 dark:text-emerald-300">App Created!</h3>
            <p className="mb-1 text-xs text-emerald-600 dark:text-emerald-400">Save these credentials now. The secret will not be shown again.</p>
            <dl className="space-y-1 text-sm">
              <div className="flex gap-2"><dt className="font-medium text-zinc-600 dark:text-zinc-400">Client ID:</dt><dd className="font-mono text-zinc-900 dark:text-zinc-100">{newApp.clientId}</dd></div>
              <div className="flex gap-2"><dt className="font-medium text-zinc-600 dark:text-zinc-400">Client Secret:</dt><dd className="font-mono text-zinc-900 dark:text-zinc-100">{newApp.clientSecret}</dd></div>
            </dl>
          </div>
        )}

        {regeneratedSecret && (
          <div className="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900/30 dark:bg-emerald-950">
            <h3 className="mb-2 text-sm font-semibold text-emerald-700 dark:text-emerald-300">Secret Regenerated!</h3>
            <p className="mb-1 text-xs text-emerald-600 dark:text-emerald-400">Save this new secret now. It will not be shown again.</p>
            <div className="text-sm"><span className="font-medium text-zinc-600 dark:text-zinc-400">New Client Secret:</span> <span className="font-mono text-zinc-900 dark:text-zinc-100">{regeneratedSecret.secret}</span></div>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="h-6 w-6 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
          </div>
        ) : apps.length === 0 ? (
          <p className="py-6 text-center text-sm text-zinc-500">No OAuth apps yet. Create one above.</p>
        ) : (
          <div className="space-y-3">
            {apps.map((app) => (
              <div key={app.id} className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-700">
                <div className="flex items-start justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{app.name}</h3>
                      <span className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">OAuth {app.scopes || "default"}</span>
                    </div>
                    <p className="mt-1 text-xs text-zinc-500">
                      <span className="font-mono">{app.clientId}</span>
                      {app.redirectUris.length > 0 && (
                        <> &middot; {app.redirectUris.length} redirect URI{app.redirectUris.length !== 1 ? "s" : ""}</>
                      )}
                    </p>
                    <p className="mt-0.5 text-xs text-zinc-400">
                      Client Secret: <span className="font-mono tracking-widest">••••••••••••••••</span>
                    </p>
                  </div>
                  <div className="ml-4 flex shrink-0 flex-col gap-1.5">
                    <button onClick={() => handleRegenerateSecret(app.id)} disabled={regeneratingId === app.id} className="rounded-lg border border-amber-200 bg-white px-3 py-1.5 text-xs font-medium text-amber-700 hover:bg-amber-50 transition-colors dark:border-amber-800 dark:bg-zinc-800 dark:text-amber-400 dark:hover:bg-amber-950 disabled:opacity-50">
                      {regeneratingId === app.id ? "..." : "Regenerate Secret"}
                    </button>
                    <button onClick={() => handleDelete(app.id)} className="rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors dark:border-red-900 dark:bg-zinc-800 dark:text-red-400 dark:hover:bg-red-950">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      onClick={async () => { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
      className="absolute right-2 top-2 rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-500 transition-colors"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="flex flex-1 items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" /></div>}>
      <DashboardInner />
    </Suspense>
  )
}
