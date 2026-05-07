import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import axios from "axios"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await axios.post(
            "https://ecommerce.routemisr.com/api/v1/auth/signin",
            {
              email: credentials?.email,
              password: credentials?.password,
            }
          )

          const { user, token } = res.data

          if (user && token) {
            return {
              id: user.email,
              name: user.name,
              email: user.email,
              role: user.role,
              token,
            }
          }

          return null
        } catch {
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as any).token
        token.role = (user as any).role
      }
      return token
    },
    async session({ session, token }) {
    (session.user as any).role = token.role;
    (session.user as any).token = token.accessToken
    return session
}  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }