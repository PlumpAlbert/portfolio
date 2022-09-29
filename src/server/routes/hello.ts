import { trpc } from "@server/index"
import { z } from "zod"

const HelloSchema = z
  .object({
    text: z.string().nullish(),
  })
  .nullish()

const helloRoute = trpc.router({
  greet: trpc.procedure.input(HelloSchema).query(({ input }) => {
    return { greeting: `hello ${input?.text ?? "world"}` }
  }),
})

export default helloRoute
