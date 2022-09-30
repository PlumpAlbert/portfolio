import { createContext, trpc } from "@server/index"
import { createNextApiHandler } from "@trpc/server/adapters/next"
import * as routes from "@server/routes"

export const appRouter = trpc.router(routes)

// export type definition of API
export type AppRouter = typeof appRouter

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext,
})
