import NextAuth, {type NextAuthOptions} from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axios, {AxiosError} from "axios";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    session: async ({session, token}) => {
      return {...session, id: token?.id};
    },
    jwt: async ({token, user}) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }

      return token;
    },
  },
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
          const {apiKey} = credentials;
          try {
            const {status} = await axios.get(
              "https://www.rescuetime.com/anapi/daily_summary_feed",
              {params: {key: apiKey}}
            );
            console.debug("> sign in status: ", status);
            if (status !== 400) {
              return {id: apiKey};
            }
          } catch (err) {
            const error = err as AxiosError;
            console.error(
              "# error while signing user: ",
              error.code,
              error.response?.data
            );
            return null;
          }
        }
        return null;
      },
    }),
  ],
};
export default NextAuth(authOptions);
