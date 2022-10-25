import type { NextPage } from "next"
import { useCallback, useMemo, useState } from "react"
import { addDays, format, intervalToDuration } from "date-fns"
import { enUS } from "date-fns/locale"

import { trpc } from "@common/utils/trpc"
import { ProductivityRank } from "src/types"

function formatTime(seconds: number) {
  const duration = intervalToDuration({ start: 0, end: seconds * 1000 })
  const minutes =
    (duration.minutes ?? 0) +
    (duration.seconds && duration.seconds > 30 ? 1 : 0)
  return `${(duration.hours ?? 0).toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`
}

function rankToString(rank: ProductivityRank) {
  switch (rank) {
    case ProductivityRank.VERY_PRODUCTIVE: {
      return "Very Productive"
    }
    case ProductivityRank.PRODUCTIVE: {
      return "Productive"
    }
    case ProductivityRank.NEUTRAL: {
      return "Neutral"
    }
    case ProductivityRank.DISTRACTING: {
      return "distracting"
    }
    case ProductivityRank.VERY_DISTRACTING: {
      return "Very distracting"
    }
    default:
      return ""
  }
}

const DayView: NextPage = () => {
  const [date, setDate] = useState(new Date())
  const dateString = useMemo(
    () => format(date, "MMMM do", { locale: enUS }),
    [date]
  )

  const handleDateChange = useCallback<
    React.MouseEventHandler<HTMLButtonElement>
  >(e => {
    const { name } = e.currentTarget
    switch (name) {
      case "previous": {
        setDate(date => addDays(date, -1))
        break
      }
      case "next": {
        setDate(date => addDays(date, 1))
        break
      }
      default:
        return
    }
  }, [])

  const { data, isLoading } = trpc.rescueTimeRoute.data.useQuery({
    from: date,
    to: date,
  })

  const productivity = useMemo(
    () =>
      data &&
      Object.keys(data[0].ranks).map(key => {
        const rank = Number(key)
        const value = data[0].ranks[rank]
        return (
          <p key={`productivity-${rank}`} className="flex items-center gap-2">
            <span className="w-4 h-4 bg-blue-400">{value}</span>
            <span> {rankToString(rank)} </span>
            <hr className="flex-1 self-end" />
            <span> {formatTime(value)} </span>
          </p>
        )
      }),
    [data]
  )

  return (
    <main className="w-full flex flex-col">
      <header className="px-4 py-6 flex items-center gap-4">
        <button
          className="icon-button"
          name="previous"
          onClick={handleDateChange}
        >
          <i className="material-symbols-rounded">arrow_back</i>
        </button>
        <h2 className="flex-1 text-xl font-medium text-center uppercase">
          {dateString}
        </h2>
        <button className="icon-button" name="next" onClick={handleDateChange}>
          <i className="material-symbols-rounded">arrow_forward</i>
        </button>
      </header>
      <section className="flex flex-col">
        {isLoading ? (
          <span className="material-symbols-rounded animate-spin">
            autorenew
          </span>
        ) : (
          productivity
        )}
      </section>
    </main>
  )
}

export default DayView
