import NextAuth from "next-auth"
import { authConfig } from "./auth.config"

export const { auth: middleware } = NextAuth(authConfig)

export const config = {
    // Matcher ensuring /admin and all subpaths are caught
    matcher: ["/admin", "/admin/(.*)"],
}
