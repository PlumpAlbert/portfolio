import { trpc } from "@server/index"
import { TRPCError } from "@trpc/server"
import { z } from "zod"
import axios from "axios"

function getISODate(date: Date | string) {
  if (typeof date === "string") {
    return date.split("T")[0]
  }
  return date.toISOString().split("T")[0]
}

const router = trpc.router({
  data: trpc.procedure
    .input(
      z.object({
        from: z.date(),
        to: z.optional(z.date()),
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
        const { data } = await axios.get<{
          notes: string
          row_headers: string[]
          rows: Array<[string, number, number, number]>
        }>("https://www.rescuetime.com/anapi/data", {
          params: {
            key: ctx.session.id,
            format: "json",
            by: "interval",
            interval: "day",
            restrict_kind: "productivity",
            restrict_begin: getISODate(from),
            restrict_end: getISODate(to),
          },
        })
        const dates: Record<
          string,
          { date: string; ranks: Record<number, number> }
        > = {}

        data.rows.forEach(row => {
          const date = getISODate(row[AnalyticDataIndexes.DATE])
          dates[date] = {
            date,
            ranks: {
              ...dates[date]?.ranks,
              [row[AnalyticDataIndexes.PRODUCTIVITY]]:
                row[AnalyticDataIndexes.TIME_SPENT],
            },
          }
        })

        return dates
      } catch (err) {
        console.error("# error: ", err)
        return
      }
    }),
})

enum AnalyticDataIndexes {
  DATE = 0,
  TIME_SPENT = 1,
  NUMBER_OF_PEOPLE = 2,
  PRODUCTIVITY = 3,
}

export default router
