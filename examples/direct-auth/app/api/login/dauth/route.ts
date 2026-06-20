import { NextRequest, NextResponse } from "next/server"
import * as jose from "jose"

const JWT_SECRET = new TextEncoder().encode(process.env.BETTER_AUTH_SECRET!)

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { token } = body

  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 })
  }

  try {
    // Verify the JWT to ensure authenticity
    await jose.jwtVerify(token, JWT_SECRET)

    // Create or find the user in your database
    // const user = await db
    //   .insert(users)
    //   .values({ name, email, avatar: image })
    //   .onConflictDoUpdate({ target: users.email, set: { name, avatar: image } })
    //   .returning()

    // Create a session token (simplified - use your own session mechanism)
    const sessionToken = crypto.randomUUID()

    // Set the session cookie and redirect to your app
    const response = NextResponse.redirect(new URL("/dashboard", request.nextUrl.origin))
    response.cookies.set("session_token", sessionToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 })
  }
}
