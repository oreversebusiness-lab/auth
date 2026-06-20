import { auth } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server"
import { SignJWT } from "jose/jwt/sign"

const secret = new TextEncoder().encode(process.env.BETTER_AUTH_SECRET || "fallback-secret")

export async function GET(request: NextRequest) {
  const ref = request.nextUrl.searchParams.get("ref")
  if (!ref) return NextResponse.json({ error: "ref parameter required" }, { status: 400 })

  const session = await auth.api.getSession({ headers: request.headers })

  if (!session) {
    const signInUrl = new URL("/sign-in", request.url)
    signInUrl.searchParams.set("dauth", "true")
    signInUrl.searchParams.set("from", ref)
    return NextResponse.redirect(signInUrl)
  }

  const { user } = session
  const token = await new SignJWT({
    sub: user.id,
    name: user.name,
    email: user.email,
    image: user.image,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("5m")
    .setIssuedAt()
    .sign(secret)

  const redirectUrl = new URL("/api/dauth", ref)
  redirectUrl.searchParams.set("token", token)
  return NextResponse.redirect(redirectUrl)
}
