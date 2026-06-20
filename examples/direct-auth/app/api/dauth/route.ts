import { NextRequest, NextResponse } from "next/server"
import * as jose from "jose"

const SSO_URL = "https://auth.oreverse.com"
const JWT_SECRET = new TextEncoder().encode(process.env.BETTER_AUTH_SECRET!)

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token")

  // No token - user is not logged in at SSO, redirect to sign in
  if (!token) {
    return NextResponse.redirect(
      `${SSO_URL}/sign-in?dauth=true&from=${encodeURIComponent(request.nextUrl.origin)}`
    )
  }

  // Verify the JWT token
  try {
    await jose.jwtVerify(token, JWT_SECRET)

    // Token is valid - redirect to SSO to get user data
    return NextResponse.redirect(
      `${SSO_URL}/api/user/login/dauth?ref=${encodeURIComponent(request.nextUrl.origin)}&token=${token}`
    )
  } catch {
    // Invalid or expired token - redirect to sign in
    return NextResponse.redirect(
      `${SSO_URL}/sign-in?dauth=true&from=${encodeURIComponent(request.nextUrl.origin)}`
    )
  }
}
