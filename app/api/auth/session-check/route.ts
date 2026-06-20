import { auth } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server"

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || ["http://localhost:3000"]

export async function GET(request: NextRequest) {
  const origin = request.headers.get("origin") || ""
  const isAllowed = allowedOrigins.some((o) => origin.includes(o) || o === "*")

  const session = await auth.api.getSession({ headers: request.headers })

  const res = NextResponse.json({
    authenticated: !!session,
    user: session?.user
      ? { id: session.user.id, name: session.user.name, email: session.user.email, image: session.user.image }
      : null,
  })

  if (origin && isAllowed) {
    res.headers.set("Access-Control-Allow-Origin", origin)
    res.headers.set("Access-Control-Allow-Credentials", "true")
  }
  res.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS")

  return res
}

export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get("origin") || ""
  const isAllowed = allowedOrigins.some((o) => origin.includes(o) || o === "*")

  const res = new NextResponse(null, { status: 204 })
  if (origin && isAllowed) {
    res.headers.set("Access-Control-Allow-Origin", origin)
    res.headers.set("Access-Control-Allow-Credentials", "true")
  }
  res.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS")
  res.headers.set("Access-Control-Allow-Headers", "Content-Type, Cookie")
  return res
}
