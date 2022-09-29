import { createContext, trpc } from "@server/index"
import { helloRoute } from "@server/routes"
import { createNextApiHandler } from "@trpc/server/adapters/next"

export const appRouter = trpc.router({
  hello: helloRoute,
})

// export type definition of API
export type AppRouter = typeof appRouter

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext,
})
