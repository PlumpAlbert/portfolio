import type { NextPage } from "next"
import Head from "next/head"
import { format, addMonths, lastDayOfMonth, isSameMonth } from "date-fns"
import { trpc } from "@common/utils/trpc"
import { useCallback, useMemo, useState } from "react"

import DataTable from "@features/analytics/month/components/DataTable"

const MonthView: NextPage = () => {
  const [currentMonth, setMonth] = useState(lastDayOfMonth(new Date()))
  const from = useMemo(() => {
    const date = new Date(currentMonth)
    date.setUTCFullYear(date.getFullYear(), date.getMonth(), 1)
    return date
  }, [currentMonth])

  const { data, isLoading } = trpc.rescueTimeRoute.data.useQuery({
    from,
    to: currentMonth,
  })

  const handleBeforeClick = useCallback(() => {
    const newMonth = addMonths(currentMonth, -1)
    setMonth(lastDayOfMonth(newMonth))
  }, [currentMonth])

  const handleNextClick = useCallback(() => {
    const newMonth = addMonths(currentMonth, 1)
    if (isSameMonth(newMonth, new Date())) {
      setMonth(lastDayOfMonth(new Date()))
      return
    }
    setMonth(newMonth)
  }, [currentMonth])

  const disableNextButton = useMemo(
    () => isSameMonth(currentMonth, new Date()),
    [currentMonth]
  )

  return (
    <main className="max-w-6xl mx-auto px-4 py-16 flex flex-col flex-1 gap-8">
      <Head>
        <title>RescueTime Dashboard</title>
      </Head>

      <div className="flex gap-4 items-center">
        <button className="icon-button" onClick={handleBeforeClick}>
          <span className="material-symbols-rounded">navigate_before</span>
        </button>
        <span className="flex-1 text-center">{format(from, "MMMM yyyy")}</span>
        <button
          disabled={disableNextButton}
          className="icon-button"
          onClick={handleNextClick}
        >
          <span className="material-symbols-rounded">navigate_next</span>
        </button>
      </div>

      <DataTable data={data} isLoading={isLoading} />
    </main>
  )
}

export default MonthView
