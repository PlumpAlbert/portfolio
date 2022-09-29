import NextAuth, { type NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import axios from "axios"

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "API key",
      credentials: {
        apiKey: {
          label: "ApiKey",
          type: "text",
          placeholder: "abcdef0123456789",
        },
      },
      async authorize(credentials) {
        if (credentials?.apiKey) {
          // Make an API call to RescueTime to check if key is valid
          const { apiKey } = credentials
          const { status } = await axios.get(
            "https://www.rescuetime.com/anapi/daily_summary_feed",
            { params: { key: apiKey } }
          )
          if (status !== 400) {
            return { id: apiKey }
          }
        }
        return null
      },
    }),
  ],
}
export default NextAuth(authOptions)
