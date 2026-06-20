import { auth } from "@/lib/auth"
import { db } from "@/db"
import { oauthApp } from "@/db/schema"
import { eq, and } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"
import { generateId } from "@better-auth/core/utils/id"

export async function GET(request: NextRequest) {
  const session = await auth.api.getSession({ headers: request.headers })
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const apps = await db.select().from(oauthApp).where(eq(oauthApp.userId, session.user.id))
  return NextResponse.json(apps.map((a) => ({
    id: a.id,
    name: a.name,
    clientId: a.clientId,
    redirectUris: a.redirectUris.split(","),
    scopes: a.scopes,
    createdAt: a.createdAt,
  })))
}

export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({ headers: request.headers })
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await request.json()
  const { name, redirectUris } = body
  if (!name || !redirectUris) {
    return NextResponse.json({ error: "name and redirectUris required" }, { status: 400 })
  }

  const clientId = generateId()
  const clientSecret = generateId() + generateId()

  const app = await db.insert(oauthApp).values({
    id: generateId(),
    name,
    clientId,
    clientSecret,
    userId: session.user.id,
    redirectUris: Array.isArray(redirectUris) ? redirectUris.join(",") : redirectUris,
  }).returning()

  return NextResponse.json({
    id: app[0].id,
    name: app[0].name,
    clientId: app[0].clientId,
    clientSecret: app[0].clientSecret,
    redirectUris: app[0].redirectUris.split(","),
    scopes: app[0].scopes,
  })
}

export async function PATCH(request: NextRequest) {
  const session = await auth.api.getSession({ headers: request.headers })
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const id = request.nextUrl.searchParams.get("id")
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 })

  const existing = await db.select().from(oauthApp).where(and(eq(oauthApp.id, id), eq(oauthApp.userId, session.user.id)))
  if (existing.length === 0) return NextResponse.json({ error: "App not found" }, { status: 404 })

  const newSecret = generateId() + generateId()
  await db.update(oauthApp).set({ clientSecret: newSecret }).where(eq(oauthApp.id, id))

  return NextResponse.json({ id, clientSecret: newSecret })
}

export async function DELETE(request: NextRequest) {
  const session = await auth.api.getSession({ headers: request.headers })
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const id = request.nextUrl.searchParams.get("id")
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 })

  await db.delete(oauthApp).where(and(eq(oauthApp.id, id), eq(oauthApp.userId, session.user.id)))
  return NextResponse.json({ success: true })
}
