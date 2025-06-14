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

    // Get unique clients with aggregated data
    const clients = await sql`
      SELECT 
        DISTINCT ON (p.client_name, p.client_email) 
        p.client_name as name,
        p.client_email as email,
        p.client_phone as phone,
        p.address,
        COUNT(p.id) OVER (PARTITION BY p.client_name, p.client_email) as project_count,
        COALESCE(SUM(p.estimated_value) OVER (PARTITION BY p.client_name, p.client_email), 0) as total_value,
        MAX(p.created_at) OVER (PARTITION BY p.client_name, p.client_email) as last_project_date,
        ROW_NUMBER() OVER (PARTITION BY p.client_name, p.client_email ORDER BY p.created_at DESC) as rn
      FROM projects p
      WHERE p.user_id = ${user.userId}
      ORDER BY p.client_name, p.client_email, p.created_at DESC
    `

    // Filter to get only the most recent record for each client
    const uniqueClients = clients.filter((client: any) => client.rn === 1)

    return NextResponse.json({ clients: uniqueClients })
  } catch (error) {
    console.error("Get clients error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
