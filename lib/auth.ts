import { jwtVerify } from "jose"
import { cookies } from "next/headers"

export async function getUser() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value

    if (!token) {
      return null
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET!)
    const { payload } = await jwtVerify(token, secret)

    return {
      userId: payload.userId as number,
      email: payload.email as string,
    }
  } catch (error) {
    console.error("Auth verification error:", error)
    return null
  }
}

export async function requireAuth() {
  const user = await getUser()
  if (!user) {
    throw new Error("Authentication required")
  }
  return user
}
