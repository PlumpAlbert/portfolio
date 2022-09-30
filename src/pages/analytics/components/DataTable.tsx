import { useMemo } from "react"
import { intervalToDuration } from "date-fns"

function formatTime(seconds: number) {
  const duration = intervalToDuration({ start: 0, end: seconds * 1000 })
  const minutes =
    (duration.minutes ?? 0) +
    (duration.seconds && duration.seconds > 30 ? 1 : 0)
  return `${(duration.hours ?? 0).toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`
}

const DataTable: React.FC<IProps> = ({ data }) => {
  const tableRows = useMemo(() => {
    if (!data) return
    return Object.values(data).map(row => (
      <tr key={row.date}>
        <th scope="row">{row.date}</th>
        <td className="text-center text-blue-400">{formatTime(row.ranks[ProductivityRank.VERY_PRODUCTIVE] ?? 0)}</td>
        <td className="text-center text-sky-400">{formatTime(row.ranks[ProductivityRank.PRODUCTIVE] ?? 0)}</td>
        <td className="text-center text-neutral-400">{formatTime(row.ranks[ProductivityRank.NEUTRAL] ?? 0)}</td>
        <td className="text-center text-amber-400">{formatTime(row.ranks[ProductivityRank.DISTRACTING] ?? 0)}</td>
        <td className="text-center text-red-400">{formatTime(row.ranks[ProductivityRank.VERY_DISTRACTING] ?? 0)}</td>
      </tr>
    ))
  }, [data])

  return (
    <table className="w-full">
      <thead>
        <tr>
          <th scope="col" className="uppercase">date</th>
          <th scope="col" className="uppercase text-blue-400">very productive</th>
          <th scope="col" className="uppercase text-sky-400">productive</th>
          <th scope="col" className="uppercase text-neutral-400">neutral</th>
          <th scope="col" className="uppercase text-amber-400">distracting</th>
          <th scope="col" className="uppercase text-red-400">very distracting</th>
        </tr>
      </thead>
      <tbody>{tableRows}</tbody>
    </table>
  )
}

export default DataTable

interface IProps {
  data:
    | Record<string, { date: string; ranks: Record<number, number> }>
    | undefined
}

enum ProductivityRank {
  VERY_PRODUCTIVE = 2,
  PRODUCTIVE = 1,
  NEUTRAL = 0,
  DISTRACTING = -1,
  VERY_DISTRACTING = -2,
}
