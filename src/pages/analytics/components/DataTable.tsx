import { useMemo } from "react"

const DataTable: React.FC<IProps> = ({ data }) => {
  const tableRows = useMemo(() => {
    if (!data) return
    return Object.values(data).map(row => (
      <tr key={row.date}>
        <th>{row.date}</th>
        <td>{row.ranks[ProductivityRank.VERY_PRODUCTIVE] ?? 0}</td>
        <td>{row.ranks[ProductivityRank.PRODUCTIVE] ?? 0}</td>
        <td>{row.ranks[ProductivityRank.NEUTRAL] ?? 0}</td>
        <td>{row.ranks[ProductivityRank.DISTRACTING] ?? 0}</td>
        <td>{row.ranks[ProductivityRank.VERY_DISTRACTING] ?? 0}</td>
      </tr>
    ))
  }, [data])

  return (
    <table>
      <thead>
        <tr>
          <th>date</th>
          <th>very productive</th>
          <th>productive</th>
          <th>neutral</th>
          <th>distracting</th>
          <th>very distracting</th>
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
