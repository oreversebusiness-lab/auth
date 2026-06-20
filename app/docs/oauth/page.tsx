import Link from "next/link"

const SSO_URL = process.env.BETTER_AUTH_URL || "http://localhost:3000"

export default function OAuthGuidePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="mb-8">
        <Link href="/dashboard" className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">&larr; Back to Dashboard</Link>
        <h1 className="mt-4 text-3xl font-bold text-zinc-900 dark:text-zinc-50">OAuth App Guide</h1>
        <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
          Create and manage OAuth applications for your projects
        </p>
      </div>

      <nav className="mb-10 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">On this page</h2>
        <ul className="space-y-1 text-sm">
          <li><a href="#what" className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">What is an OAuth App?</a></li>
          <li><a href="#create" className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">How to Create an App</a></li>
          <li><a href="#credentials" className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">Understanding Your Credentials</a></li>
          <li><a href="#integrate" className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">How to Integrate</a></li>
          <li><a href="#example" className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">Complete Code Example</a></li>
          <li><a href="#manage" className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">Managing Your Apps</a></li>
          <li><a href="#security" className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">Security Tips</a></li>
        </ul>
      </nav>

      <section id="what" className="mb-10">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">What is an OAuth App?</h2>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400 leading-relaxed">
          An OAuth App is a registered application that can use OreVerse SSO to authenticate users.
          When you create an app, you get a <strong>Client ID</strong> and <strong>Client Secret</strong> — these are
          like a username and password for your app to communicate with the SSO server.
        </p>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Any OreVerse user can create OAuth apps. You don&apos;t need to be an admin. This is useful for:
        </p>
        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
          <li>Personal projects that need OreVerse login</li>
          <li>Third-party services you want to integrate</li>
          <li>Testing OAuth flows during development</li>
          <li>Mobile apps that can&apos;t use the SSO Widget</li>
        </ul>
      </section>

      <section id="create" className="mb-10 rounded-xl border-2 border-violet-200 bg-violet-50 p-6 dark:border-violet-900/30 dark:bg-violet-950">
        <div className="mb-4 flex items-center gap-2">
          <span className="rounded-full bg-violet-600 px-2 py-0.5 text-xs font-semibold text-white">STEP BY STEP</span>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">How to Create an App</h2>
        </div>

        <div className="mb-4 rounded-xl border border-violet-200 bg-white p-5 dark:border-violet-800 dark:bg-zinc-900">
          <div className="flex items-start gap-4">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-100 text-sm font-bold text-violet-700 dark:bg-violet-900 dark:text-violet-300">1</div>
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Go to your Dashboard</h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                Navigate to the <Link href="/dashboard" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">Dashboard</Link> and scroll down to the <strong>OAuth Applications</strong> section.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-4 rounded-xl border border-violet-200 bg-white p-5 dark:border-violet-800 dark:bg-zinc-900">
          <div className="flex items-start gap-4">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-100 text-sm font-bold text-violet-700 dark:bg-violet-900 dark:text-violet-300">2</div>
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Fill in the details</h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                Enter an <strong>App Name</strong> (e.g. &ldquo;My Portfolio Site&rdquo;) and one or more <strong>Redirect URIs</strong> separated by commas.
              </p>
              <div className="mt-2 rounded-lg bg-zinc-900 p-3 text-xs text-zinc-100">
                <p className="text-zinc-400 mb-1">Example redirect URIs:</p>
                <code>https://myapp.com/auth/callback, http://localhost:3000/auth/callback</code>
              </div>
              <p className="mt-1 text-xs text-zinc-500">Redirect URIs are the URLs OreVerse will send users back to after they sign in.</p>
            </div>
          </div>
        </div>

        <div className="mb-4 rounded-xl border border-violet-200 bg-white p-5 dark:border-violet-800 dark:bg-zinc-900">
          <div className="flex items-start gap-4">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-100 text-sm font-bold text-violet-700 dark:bg-violet-900 dark:text-violet-300">3</div>
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Click &ldquo;Create App&rdquo;</h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                Your app will be created instantly. A green box will appear with your <strong>Client ID</strong> and <strong>Client Secret</strong>.
              </p>
              <div className="mt-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-700 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-300">
                <strong>&#9888; Save your Client Secret now.</strong> It will not be shown again.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="credentials" className="mb-10">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Understanding Your Credentials</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Client ID</h3>
            <p className="mt-1 text-xs text-zinc-500">A public identifier for your app. It&apos;s safe to share — it tells the SSO which app is asking for access.</p>
            <pre className="mt-2 rounded-lg bg-zinc-900 p-2 text-xs text-zinc-100">id_abc123def456</pre>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Client Secret</h3>
            <p className="mt-1 text-xs text-zinc-500">A private secret known only to your app and the SSO. <strong>Never share it</strong> or expose it in client-side code.</p>
            <pre className="mt-2 rounded-lg bg-zinc-900 p-2 text-xs text-zinc-100">sec_xyz789...abc123</pre>
          </div>
        </div>
      </section>

      <section id="integrate" className="mb-10 rounded-xl border-2 border-violet-200 bg-white p-6 dark:border-violet-900/30 dark:bg-zinc-900">
        <div className="mb-4 flex items-center gap-2">
          <span className="rounded-full bg-violet-600 px-2 py-0.5 text-xs font-semibold text-white">GUIDE</span>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">How to Integrate</h2>
        </div>
        <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
          Once you have your Client ID and Redirect URIs, follow these steps to add OreVerse login to your project.
        </p>

        <Step number="1" title="Add a sign-in button on your project">
          <p className="mb-2">Create a link or button that redirects users to the OreVerse SSO sign-in page:</p>
          <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-3 text-xs text-zinc-100">{`<a href="${SSO_URL}/sign-in?ref=https://your-project.com/dashboard">
  Sign in with OreVerse
</a>`}</pre>
          <p className="mt-1 text-xs text-zinc-500">The <code className="rounded bg-zinc-100 px-1 py-0.5 dark:bg-zinc-800">ref</code> parameter is the URL the user will be redirected to after signing in.</p>
        </Step>

        <Step number="2" title="Handle the redirect back">
          <p className="mb-2">After the user signs in, OreVerse redirects them back to your <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-800">ref</code> URL. On that page, verify their session:</p>
          <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-3 text-xs text-zinc-100">{`// JavaScript on your redirect page
const response = await fetch("${SSO_URL}/api/auth/session-check", {
  credentials: "include",
})
const { authenticated, user } = await response.json()

if (authenticated) {
  // User is signed in
  console.log("Welcome", user.name)
  // user.id, user.email, user.image also available
} else {
  // Not signed in — show error
}`}</pre>
          <p className="mt-1 text-xs text-zinc-500">If the user was already logged in at OreVerse, this will work immediately without needing them to sign in again.</p>
        </Step>

        <Step number="3" title="Create a local session (server-side)" heading="true">
          <p className="mb-2">On your backend, use the user info to create or find a user in your database and start a local session:</p>
          <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-3 text-xs text-zinc-100">{`// Your server endpoint (Next.js example)
export async function POST(request) {
  const { name, email, image, id } = await request.json()

  // Find or create user in your database
  let user = await db.findUserByEmail(email)
  if (!user) {
    user = await db.createUser({ name, email, avatar: image })
  }

  // Create session token
  const token = crypto.randomUUID()
  // Store token, set cookie, etc.

  return Response.json({ success: true })
}`}</pre>
        </Step>
      </section>

      <section id="example" className="mb-10">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Complete Code Example</h2>
        <p className="mt-2 text-sm text-zinc-500 mb-4">A full working example for a Next.js project:</p>

        <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="rounded bg-zinc-900 px-2 py-0.5 text-xs font-mono font-bold text-white">PAGES</span>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Your sign-in page</h3>
          </div>
          <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-3 text-xs text-zinc-100">{`{/* app/sign-in/page.tsx */}
"use client"

export default function SignInPage() {
  const ssoUrl = "${SSO_URL}"

  function handleSSOLogin() {
    // Redirect to OreVerse SSO
    window.location.href = \`\${ssoUrl}/sign-in?ref=\${encodeURIComponent(
      window.location.origin + "/api/auth/callback"
    )}\`
  }

  return (
    <div>
      <h1>Welcome</h1>
      <button onClick={handleSSOLogin}>
        Sign in with OreVerse
      </button>
    </div>
  )
}`}</pre>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="rounded bg-zinc-900 px-2 py-0.5 text-xs font-mono font-bold text-white">ROUTE</span>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Your callback API route</h3>
          </div>
          <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-3 text-xs text-zinc-100">{`// app/api/auth/callback/route.ts
import { NextRequest, NextResponse } from "next/server"

const SSO_URL = "${SSO_URL}"

export async function GET(request: NextRequest) {
  // Verify session with SSO
  const ssoRes = await fetch(\`\${SSO_URL}/api/auth/session-check\`, {
    headers: {
      cookie: request.headers.get("cookie") || "",
    },
  })
  const { authenticated, user } = await ssoRes.json()

  if (!authenticated) {
    return NextResponse.redirect(\`\${SSO_URL}/sign-in?ref=\${encodeURIComponent(request.nextUrl.origin + "/api/auth/callback")}\`)
  }

  // User is authenticated — create local session
  const sessionToken = crypto.randomUUID()

  const response = NextResponse.redirect(new URL("/dashboard", request.nextUrl.origin))
  response.cookies.set("session", sessionToken, {
    httpOnly: true, secure: true, sameSite: "lax", path: "/",
  })
  return response
}`}</pre>
        </div>
      </section>

      <section id="manage" className="mb-10">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Managing Your Apps</h2>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400 leading-relaxed">
          From your <Link href="/dashboard" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">Dashboard</Link>, you can:
        </p>
        <ul className="mt-3 space-y-3">
          <li className="flex items-start gap-3 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <span className="text-lg">&#128194;</span>
            <div>
              <strong className="text-sm text-zinc-900 dark:text-zinc-100">View all your apps</strong>
              <p className="text-xs text-zinc-500 mt-0.5">See every OAuth app you&apos;ve created, with their Client IDs and redirect URIs.</p>
            </div>
          </li>
          <li className="flex items-start gap-3 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <span className="text-lg">&#10060;</span>
            <div>
              <strong className="text-sm text-zinc-900 dark:text-zinc-100">Delete unused apps</strong>
              <p className="text-xs text-zinc-500 mt-0.5">Remove apps you no longer need. This cannot be undone — any integrations using that app will stop working.</p>
            </div>
          </li>
          <li className="flex items-start gap-3 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <span className="text-lg">&#10133;</span>
            <div>
              <strong className="text-sm text-zinc-900 dark:text-zinc-100">Create new apps anytime</strong>
              <p className="text-xs text-zinc-500 mt-0.5">No limits on how many apps you can create. Great for development, staging, and production environments.</p>
            </div>
          </li>
        </ul>
      </section>

      <section id="security" className="mb-10 rounded-xl border-2 border-amber-200 bg-amber-50 p-6 dark:border-amber-900/30 dark:bg-amber-950">
        <h2 className="text-xl font-semibold text-amber-900 dark:text-amber-100">Security Tips</h2>
        <ul className="mt-4 space-y-2 text-sm text-amber-800 dark:text-amber-200">
          <li className="flex items-start gap-2">
            <span className="mt-0.5 shrink-0">&#9888;</span>
            <span><strong>Never expose your Client Secret</strong> in client-side code (browser, mobile app). Use a backend server to make API calls.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 shrink-0">&#9888;</span>
            <span><strong>Rotate secrets periodically</strong>. If you suspect a secret is compromised, delete the app and create a new one.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 shrink-0">&#9888;</span>
            <span><strong>Only use HTTPS</strong> for your Redirect URIs in production. Localhost HTTP is fine for development.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 shrink-0">&#9888;</span>
            <span><strong>Validate the ref parameter</strong> on your server to prevent open redirect attacks.</span>
          </li>
        </ul>
      </section>

      <section className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Need More Help?</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Visit the <Link href="/dashboard" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">Dashboard</Link> to manage your OAuth apps, or check the{" "}
          <Link href="/docs/sso-integration" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">Full Integration Guide</Link> for detailed information about all integration methods.
        </p>
      </section>
    </div>
  )
}

function Step({ number, title, children, heading }: { number: string; title: string; children: React.ReactNode; heading?: string }) {
  return (
    <div className="mb-4 rounded-xl border border-violet-200 bg-white p-5 dark:border-violet-800 dark:bg-zinc-900">
      <div className="flex items-start gap-4">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-100 text-sm font-bold text-violet-700 dark:bg-violet-900 dark:text-violet-300">{number}</div>
        <div className="min-w-0 flex-1">
          <h3 className={`font-semibold text-zinc-900 dark:text-zinc-50 ${heading ? "text-base" : ""}`}>{title}</h3>
          <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  )
}
