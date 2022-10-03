import { useMemo } from "react"
import { intervalToDuration, format } from "date-fns"

function formatTime(seconds: number) {
  const duration = intervalToDuration({ start: 0, end: seconds * 1000 })
  const minutes =
    (duration.minutes ?? 0) +
    (duration.seconds && duration.seconds > 30 ? 1 : 0)
  return `${(duration.hours ?? 0).toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`
}

const DataTable: React.FC<IProps> = ({ data, isLoading }) => {
  const tableRows = useMemo(() => {
    if (!data) return
    return Object.values(data).map(row => (
      <tr key={row.date}>
        <th scope="row">{format(Date.parse(row.date), "MMM d")}</th>
        <td className="text-center text-blue-400">
          {formatTime(row.ranks[ProductivityRank.VERY_PRODUCTIVE] ?? 0)}
        </td>
        <td className="text-center text-sky-400">
          {formatTime(row.ranks[ProductivityRank.PRODUCTIVE] ?? 0)}
        </td>
        <td className="text-center text-neutral-400">
          {formatTime(row.ranks[ProductivityRank.NEUTRAL] ?? 0)}
        </td>
        <td className="text-center text-amber-400">
          {formatTime(row.ranks[ProductivityRank.DISTRACTING] ?? 0)}
        </td>
        <td className="text-center text-red-400">
          {formatTime(row.ranks[ProductivityRank.VERY_DISTRACTING] ?? 0)}
        </td>
      </tr>
    ))
  }, [data])

  return (
    <table className="w-full">
      <thead>
        <tr>
          <th scope="col" className="uppercase">
            <span className="material-symbols-rounded md:hidden">
              calendar_month
            </span>
            <span className="hidden md:inline">date</span>
          </th>
          <th scope="col" className="uppercase text-blue-400">
            <span className="material-symbols-rounded md:hidden">
              keyboard_double_arrow_up
            </span>
            <span className="hidden md:inline">very productive</span>
          </th>
          <th scope="col" className="uppercase text-sky-400">
            <span className="material-symbols-rounded md:hidden">
              keyboard_arrow_up
            </span>
            <span className="hidden md:inline">productive</span>
          </th>
          <th scope="col" className="uppercase text-neutral-400">
            <span className="material-symbols-rounded md:hidden">remove</span>
            <span className="hidden md:inline">neutral</span>
          </th>
          <th scope="col" className="uppercase text-amber-400">
            <span className="material-symbols-rounded md:hidden">
              keyboard_arrow_down
            </span>
            <span className="hidden md:inline">distracting</span>
          </th>
          <th scope="col" className="uppercase text-red-400">
            <span className="material-symbols-rounded md:hidden">
              keyboard_double_arrow_down
            </span>
            <span className="hidden md:inline">very distracting</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {isLoading ? (
          <tr>
            <th colSpan={6}>
              <span className="material-symbols-rounded animate-spin">
                autorenew
              </span>
            </th>
          </tr>
        ) : (
          tableRows
        )}
      </tbody>
    </table>
  )
}

export default DataTable

interface IProps {
  data:
    | Record<string, { date: string; ranks: Record<number, number> }>
    | undefined
  isLoading: boolean
}

enum ProductivityRank {
  VERY_PRODUCTIVE = 2,
  PRODUCTIVE = 1,
  NEUTRAL = 0,
  DISTRACTING = -1,
  VERY_DISTRACTING = -2,
}
