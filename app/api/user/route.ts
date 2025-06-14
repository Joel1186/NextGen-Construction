import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import { getUser } from "@/lib/auth"

const sql = neon(process.env.DATABASE_URL!)

export async function GET() {
  try {
    const user = await getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get user details from database
    const users = await sql`
      SELECT id, name, email, company, phone, address, bio, created_at FROM users WHERE id = ${user.userId}
    `

    if (users.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ user: users[0] })
  } catch (error) {
    console.error("Get user error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const user = await getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { name, company, phone, address, bio } = await request.json()

    if (!name || !company) {
      return NextResponse.json({ error: "Name and company are required" }, { status: 400 })
    }

    const result = await sql`
      UPDATE users 
      SET name = ${name}, company = ${company}, phone = ${phone}, address = ${address}, bio = ${bio}, updated_at = NOW()
      WHERE id = ${user.userId}
      RETURNING id, name, email, company, phone, address, bio, created_at
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ user: result[0] })
  } catch (error) {
    console.error("Update user error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
