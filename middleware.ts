import NextAuth from "next-auth"
import { authConfig } from "./auth.config"
import { NextRequest } from "next/server"

const { auth } = NextAuth(authConfig)

export function middleware(request: NextRequest) {
  return auth(request as any)
}

export const config = {
  matcher: ["/admin", "/admin/(.*)"],
}
