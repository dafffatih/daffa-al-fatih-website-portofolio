
import type { NextAuthConfig } from "next-auth"

export const authConfig = {
    // Ensure consistent secret across Edge and Node environments
    secret: process.env.AUTH_SECRET,
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async authorized({ auth, request }) {
            const { pathname } = request.nextUrl
            const isLoggedIn = !!auth

            // Allow access to login page always
            if (pathname === "/login") {
                return true
            }

            // Protect admin routes
            if (pathname.startsWith("/admin")) {
                return !!auth
            }

            return true
        },
        async session({ session, token }) {
            if (session.user && token.sub) {
                session.user.id = token.sub
            }
            return session
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
            }
            return token
        },
    },
    providers: [], // Providers configured in auth.ts
} satisfies NextAuthConfig
