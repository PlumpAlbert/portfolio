import { initTRPC, inferAsyncReturnType } from "@trpc/server"
import type { CreateNextContextOptions } from "@trpc/server/adapters/next"

/**
 * Method for creating tRPC context
 *
 * @param opts
 */
export async function createContext(opts?: CreateNextContextOptions) {
  return {}
}

type Context = inferAsyncReturnType<typeof createContext>

export const trpc = initTRPC.context<Context>().create()
