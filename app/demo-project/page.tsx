import Link from "next/link"

const SSO_URL = process.env.BETTER_AUTH_URL || "http://localhost:3000"

export default function DemoProjectPage() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-zinc-950">
      <header className="border-b border-zinc-200 bg-white px-6 py-4 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-sm font-bold text-white">D</div>
            <span className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Demo Project</span>
          </div>
          <Link href="/docs/sso-integration" className="text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">Integration Guide &rarr;</Link>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-6 py-12">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            Live SSO Demo
          </div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">Demo Project</h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            This page has the OreVerse SSO widget embedded. Look at the top-right corner — if you&apos;re logged in, you&apos;ll see your profile. Otherwise, you&apos;ll see a sign-in button.
          </p>
        </div>

        <div className="mt-12 grid w-full gap-6 sm:grid-cols-2">
          {[
            { title: "Dashboard", desc: "View your analytics and data" },
            { title: "Settings", desc: "Manage your preferences" },
            { title: "Reports", desc: "Download detailed reports" },
            { title: "Support", desc: "Get help from our team" },
          ].map((f) => (
            <div key={f.title} className="rounded-xl border border-zinc-200 bg-white p-6 text-left opacity-50 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">{f.title}</h3>
              <p className="mt-1 text-sm text-zinc-500">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 space-y-6">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Integration Code Examples</h2>

          <div className="rounded-xl border border-indigo-200 bg-white p-6 dark:border-indigo-900/30 dark:bg-zinc-900">
            <div className="mb-2 flex items-center gap-2">
              <span className="rounded bg-indigo-600 px-2 py-0.5 text-xs font-bold text-white">WIDGET</span>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Drop-in Script (Recommended)</h3>
            </div>
            <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4 text-xs text-zinc-100">{`<script src="${SSO_URL}/sso/widget" data-project="Demo Project" async></script>`}</pre>
          </div>

          <div className="rounded-xl border border-emerald-200 bg-white p-6 dark:border-emerald-900/30 dark:bg-zinc-900">
            <div className="mb-2 flex items-center gap-2">
              <span className="rounded bg-emerald-600 px-2 py-0.5 text-xs font-bold text-white">DIRECT AUTH</span>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Button + Backend Flow</h3>
            </div>
            <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4 text-xs text-zinc-100">{`<a href="${SSO_URL}/api/dauth?ref=https://your-project.com">Sign in with OreVerse</a>`}</pre>
          </div>

          <div className="rounded-xl border border-violet-200 bg-white p-6 dark:border-violet-900/30 dark:bg-zinc-900">
            <div className="mb-2 flex items-center gap-2">
              <span className="rounded bg-violet-600 px-2 py-0.5 text-xs font-bold text-white">OAUTH</span>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Registered OAuth App</h3>
            </div>
            <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4 text-xs text-zinc-100">{`${SSO_URL}/sign-in?ref=https://your-project.com`}</pre>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/docs/sso-integration" className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-medium text-white hover:bg-indigo-500 transition-colors">
            Read Full Integration Guide &rarr;
          </Link>
        </div>
      </main>
    </div>
  )
}
