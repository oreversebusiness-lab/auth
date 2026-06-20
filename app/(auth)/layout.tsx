import Link from "next/link"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex items-center justify-center px-6 py-5">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-indigo-600 text-xs font-bold text-white">O</div>
          <span className="text-sm font-semibold">OreVerse SSO</span>
        </Link>
      </div>
      <div className="flex flex-1 items-center justify-center px-4 py-8">
        {children}
      </div>
    </div>
  )
}
