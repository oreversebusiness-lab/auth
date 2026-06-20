import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="flex items-center justify-between px-6 py-4 sm:px-12">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white">O</div>
          <span className="text-lg font-semibold tracking-tight">OreVerse SSO</span>
        </div>
        <nav className="flex items-center gap-4">
          <Link href="/docs/sso-integration" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">Docs</Link>
          <Link href="/sign-in" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">Sign In</Link>
          <Link href="/sign-up" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition-colors">Get Started</Link>
        </nav>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700 dark:border-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
            <span className="h-2 w-2 rounded-full bg-indigo-500" />
            Centralized Auth for OreVerse Ecosystem
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-6xl dark:text-zinc-50">
            One Account.
            <br />
            <span className="text-indigo-600 dark:text-indigo-400">All OreVerse Projects.</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Sign in once and access every OreVerse project — seamless, secure, and fast.
            No more repeated sign-ups. Your identity, your ecosystem.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link href="/sign-up" className="rounded-xl bg-indigo-600 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors">
              Create Free Account
            </Link>
            <Link href="/sign-in" className="rounded-xl border border-zinc-300 bg-white px-8 py-3 text-sm font-semibold text-zinc-900 shadow-sm hover:bg-zinc-50 transition-colors dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700">
              Sign In
            </Link>
          </div>
        </div>

        <div className="mt-24 grid w-full max-w-4xl gap-6 sm:grid-cols-3">
          {[
            { title: "Unified Identity", desc: "One profile across all OreVerse tools and services." },
            { title: "Social Login", desc: "Sign in with Google or GitHub — no extra passwords." },
            { title: "Secure by Default", desc: "Built on industry-standard OAuth 2.0 and OpenID Connect." },
          ].map((f) => (
            <div key={f.title} className="rounded-xl border border-zinc-200 bg-white p-6 text-left dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">{f.title}</h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="border-t border-zinc-200 px-6 py-6 text-center text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-500">
        &copy; {new Date().getFullYear()} OreVerse. All rights reserved.
      </footer>
    </div>
  )
}
