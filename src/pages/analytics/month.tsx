import type { NextPage } from "next"
import Head from "next/head"
import { trpc } from "@common/utils/trpc"
import { useMemo } from "react"

import DataTable from "./components/DataTable"

const MonthView: NextPage = () => {
  const now = useMemo(() => new Date(), [])
  const from = useMemo(() => new Date(now.getFullYear(), now.getMonth()), [now])

  const { data } = trpc.rescueTimeRoute.data.useQuery({ from, to: now })

  return (
    <main className="m-auto px-8 py-16 flex flex-col flex-1 gap-8">
      <Head>
        <title>RescueTime Dashboard</title>
      </Head>

      <DataTable data={data} />
    </main>
  )
}

export default MonthView
