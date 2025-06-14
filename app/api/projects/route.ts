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

    const projects = await sql`
      SELECT 
        id, name, description, client_name, client_email, client_phone,
        address, status, estimated_value, actual_cost, start_date, end_date,
        created_at, updated_at
      FROM projects 
      WHERE user_id = ${user.userId}
      ORDER BY created_at DESC
    `

    return NextResponse.json({ projects })
  } catch (error) {
    console.error("Get projects error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const user = await getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const {
      name,
      description,
      client_name,
      client_email,
      client_phone,
      address,
      estimated_value,
      start_date,
      end_date,
    } = await request.json()

    if (!name || !client_name) {
      return NextResponse.json({ error: "Name and client name are required" }, { status: 400 })
    }

    const result = await sql`
      INSERT INTO projects (
        user_id, name, description, client_name, client_email, client_phone,
        address, estimated_value, start_date, end_date, created_at, updated_at
      )
      VALUES (
        ${user.userId}, ${name}, ${description}, ${client_name}, ${client_email}, ${client_phone},
        ${address}, ${estimated_value}, ${start_date}, ${end_date}, NOW(), NOW()
      )
      RETURNING *
    `

    return NextResponse.json({ project: result[0] }, { status: 201 })
  } catch (error) {
    console.error("Create project error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
