import { auth } from "@/lib/auth"
import { db } from "@/db"
import { user } from "@/auth-schema"
import { eq } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({ headers: request.headers })
  const userRole = (session?.user as { role?: string }).role
  if (!session || userRole !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  const body = await request.json()
  const { userId, role } = body
  if (!userId || !role) {
    return NextResponse.json({ error: "userId and role required" }, { status: 400 })
  }

  await db.update(user).set({ role }).where(eq(user.id, userId))
  return NextResponse.json({ success: true })
}
