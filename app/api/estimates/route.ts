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

    const estimates = await sql`
      SELECT 
        id, client_name, client_email, job_type, description,
        estimated_cost, status, valid_until, created_at, updated_at
      FROM estimates 
      WHERE user_id = ${user.userId}
      ORDER BY created_at DESC
    `

    return NextResponse.json({ estimates })
  } catch (error) {
    console.error("Get estimates error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const user = await getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { client_name, client_email, job_type, description, estimated_cost, valid_until, items } =
      await request.json()

    if (!client_name || !job_type || !estimated_cost) {
      return NextResponse.json({ error: "Client name, job type, and estimated cost are required" }, { status: 400 })
    }

    // Create estimate
    const estimateResult = await sql`
      INSERT INTO estimates (
        user_id, client_name, client_email, job_type, description,
        estimated_cost, status, valid_until, created_at, updated_at
      )
      VALUES (
        ${user.userId}, ${client_name}, ${client_email}, ${job_type}, ${description},
        ${estimated_cost}, 'pending', ${valid_until}, NOW(), NOW()
      )
      RETURNING *
    `

    const estimate = estimateResult[0]

    // Create estimate items
    if (items && items.length > 0) {
      for (const item of items) {
        await sql`
          INSERT INTO estimate_items (
            estimate_id, description, quantity, unit_price, total_price, created_at
          )
          VALUES (
            ${estimate.id}, ${item.description}, ${item.quantity}, 
            ${item.unit_price}, ${item.total_price}, NOW()
          )
        `
      }
    }

    return NextResponse.json({ estimate }, { status: 201 })
  } catch (error) {
    console.error("Create estimate error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
