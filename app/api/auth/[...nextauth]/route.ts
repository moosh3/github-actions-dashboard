import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

// Add this type declaration
declare module "next-auth" {
  interface Session {
    accessToken?: string
  }
}

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: 'Iv23liK9zwGGrdIuHUIF', //process.env.GITHUB_CLIENT_ID as string,
      clientSecret: '5ee7c05703da8ac060163eff9343e9390d40de97', //process.env.GITHUB_CLIENTSECRET as string,
    }),
  ],
  debug: process.env.NODE_ENV === 'development',
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string
      return session
    },
  },
})

export { handler as GET, handler as POST }
