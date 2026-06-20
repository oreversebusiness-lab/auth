import { auth } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const ref = request.nextUrl.searchParams.get("ref")
  if (!ref) return NextResponse.json({ error: "ref parameter required" }, { status: 400 })

  const session = await auth.api.getSession({ headers: request.headers })
  if (!session) return NextResponse.json({ error: "Not authenticated" }, { status: 401 })

  const { user } = session

  const projectUrl = new URL("/api/login/dauth", ref)
  const res = await fetch(projectUrl.toString(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: user.name,
      email: user.email,
      image: user.image,
    }),
  })

  if (!res.ok) {
    return NextResponse.json({ error: "Project login failed" }, { status: 502 })
  }

  return NextResponse.redirect(ref)
}
