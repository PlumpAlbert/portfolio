import { trpc } from "@server/index"
import { TRPCError } from "@trpc/server"
import { z } from "zod"
import axios from "axios"

const ProductivitySchema = z.object({
  text: z.string(),
  value: z.number(),
})

const ProductivityResponseSchema = z.object({
  veryProductive: ProductivitySchema.nullish(),
  productive: ProductivitySchema.nullish(),
  neutral: ProductivitySchema.nullish(),
  distracting: ProductivitySchema.nullish(),
  veryDistracting: ProductivitySchema.nullish(),
})

function getISODate(date: string) {
  return date.split("T")[0]
}

const router = trpc.router({
  data: trpc.procedure
    .input(
      z.object({
        from: z.string(),
        to: z.optional(z.string()),
      })
    )
    .query(async ({ input, ctx }) => {
      if (!ctx.session) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You must be authorized to invoke this method",
        })
      }
      const { from, to = from } = input
      console.debug("from = %s, to = %s", from, to)

      try {
        const response: any = await axios.get(
          "https://www.rescuetime.com/anapi/data",
          {
            params: {
              key: ctx.session.id,
              format: "json",
              by: "rank",
              interval: "day",
              restrict_begin: getISODate(from),
              restrict_end: getISODate(to),
              restrict_kind: "productivity",
            },
          }
        )

        console.debug("> response: ", response)
        return response.data
      } catch (err) {
        console.error("# error: ", err)
        return err
      }
    }),
})

export default router
