import NextAuth from "next-auth"
import "next-auth/jwt"

import { createStorage } from "unstorage"
import memoryDriver from "unstorage/drivers/memory"
import vercelKVDriver from "unstorage/drivers/vercel-kv"
import { UnstorageAdapter } from "@auth/unstorage-adapter"

const storage = createStorage({
  driver: process.env.VERCEL
    ? vercelKVDriver({
        url: process.env.AUTH_KV_REST_API_URL,
        token: process.env.AUTH_KV_REST_API_TOKEN,
        env: false,
      })
    : memoryDriver(),
})

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
  debug: !!process.env.AUTH_DEBUG,
  theme: { logo: "https://authjs.dev/img/logo-sm.png" },
  adapter: UnstorageAdapter(storage),
  providers: [
    // highlight-start
    ...(process.env.AUTH_ORY_SDK_URL &&
    process.env.AUTH_ORY_CLIENT_ID &&
    process.env.AUTH_ORY_CLIENT_SECRET
      ? [
          {
            id: "ory",
            name: "Ory",
            type: "oidc" as const,
            style: {
              logo: "/ory.svg",
            },
            issuer: process.env.AUTH_ORY_SDK_URL,
            clientId: process.env.AUTH_ORY_CLIENT_ID,
            clientSecret: process.env.AUTH_ORY_CLIENT_SECRET,
            checks: ["pkce" as never, "state" as never],
            token: {
              idToken: true,
            },
          },
        ]
      : []),
    // highlight-eng
  ],
  basePath: "/auth",
  session: { strategy: "jwt" },
  // highlight-start
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl
      if (pathname === "/middleware-example") return !!auth
      return true
    },
    session({ session, token }) {
      session.sid = token.sid
      session.idToken = token.idToken
      return session
    },
    jwt({ token, account, profile }) {
      if (profile) {
        token.sid = profile.sid
      }
      if (account) {
        token.idToken = account.id_token
      }
      return token
    },
  },
  // highlight-end
  experimental: { enableWebAuthn: true },
})

declare module "next-auth" {
  interface Session {
    accessToken?: string
    // highlight-start
    sid: string
    idToken?: string
    // highlight-end
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string
    // highlight-start
    sid: string
    idToken?: string
    // highlight-end
  }
}

// highlight-start
declare module "next-auth" {
  interface Profile {
    sid: string
  }
}
// highlight-end
