import { initTRPC, inferAsyncReturnType } from "@trpc/server"
import type { CreateNextContextOptions } from "@trpc/server/adapters/next"
import superjson from "superjson"
import { unstable_getServerSession } from "next-auth"
import { authOptions } from "@pages/api/auth/[...nextauth]"

/**
 * Method for creating tRPC context
 *
 * @param opts
 */
export async function createContext(opts?: CreateNextContextOptions) {
  const req = opts?.req
  const res = opts?.res
  const session =
    req && res && (await unstable_getServerSession(req, res, authOptions))
  return { req, res, session }
}

type Context = inferAsyncReturnType<typeof createContext>

export const trpc = initTRPC.context<Context>().create({
  transformer: superjson,
})
