import { MouseEventHandler, useCallback, useState } from "react"
import { useQuery, useQueryClient } from "react-query"
// next
import axios from "axios"
import type { NextPage } from "next"
import Head from "next/head"
// date-fns
import { intervalToDuration, format, addMonths, isSameMonth } from "date-fns"
// imports
import { Productivity } from "@/pages/api/stats/rescuetime/month"
// styles
import styles from "./rescuetime.module.scss"
import { sassBuilder } from "@/utils/sass"

const x = sassBuilder(styles)

function getDuration(time?: number) {
	const duration = intervalToDuration({ start: 0, end: (time ?? 0) * 1000 })
	return `${duration.hours?.toString().padStart(2, "0")}:${duration.minutes
		?.toString()
		.padStart(2, "0")}`
}

const RescueTimePage: NextPage = () => {
	const [date, setDate] = useState(new Date())
	const client = useQueryClient()

	const { isLoading, data } = useQuery(
		["analytics", date] as const,
		async function ({ queryKey }) {
			const [, date] = queryKey
			const { data } = await axios.get<{
				data: Record<string, Productivity>
			}>("/api/stats/rescuetime/month", {
				params: { date: date.toISOString() },
			})
			return data.data
		}
	)

	const handleForwardClick = useCallback<MouseEventHandler>(e => {
		e.stopPropagation()
		setDate(old => addMonths(old, 1))
	}, [])

	const handleBackClick = useCallback<MouseEventHandler>(e => {
		e.stopPropagation()
		setDate(old => addMonths(old, -1))
	}, [])

	/**
	 * @param date
	 * @param productivity
	 */
	const printRow = (date: string, productivity: Productivity) => {
		const d = new Date(date)
		return (
			<tr key={date} className={x({ row: true })}>
				<td className={x({ cell: true, date: true })}>
					{d.toLocaleDateString()}
				</td>
				<td className={x({ cell: true, "very-productive": true })}>
					{getDuration(productivity.veryProductive)}
				</td>
				<td className={x({ cell: true, productive: true })}>
					{getDuration(productivity.productive)}
				</td>
				<td className={x({ cell: true, neutral: true })}>
					{getDuration(productivity.neutral)}
				</td>
				<td className={x({ cell: true, distracting: true })}>
					{getDuration(productivity.distracting)}
				</td>
				<td className={x({ cell: true, "very-distracting": true })}>
					{getDuration(productivity.veryDistracting)}
				</td>
			</tr>
		)
	}

	return (
		<>
			<Head>
				<title>RescueTime stats</title>
			</Head>
			<main className={x({ root: true })}>
				<header className={x({ header: true })}>
					<button
						className={x({ "icon-button": true }, "icon-button")}
						onClick={handleBackClick}
					>
						<i className="msr">arrow_back_ios</i>
					</button>
					<h2 className={x({ header__title: true })}>
						{format(date, "MMMM, yyyy")}
					</h2>
					<button
						disabled={isSameMonth(new Date(), date)}
						className={x({ "icon-button": true }, "icon-button")}
						onClick={handleForwardClick}
					>
						<i className="msr">arrow_forward_ios</i>
					</button>
				</header>
				{isLoading && (
					<div className={x({ "spinner-wrapper": true })}>
						<i className={x({ spinner: true }, "msr")}>sync</i>
					</div>
				)}
				<table className={x({ table: true })}>
					<thead className={x({ head: true })}>
						<tr className={x({ row: true })}>
							<th
								className={x({
									cell: true,
									head: true,
									date: true,
								})}
							>
								<i className="msr">calendar_month</i>
							</th>
							<th
								className={x({
									cell: true,
									head: true,
									"very-productive": true,
								})}
							>
								<i className="msr">keyboard_double_arrow_up</i>
							</th>
							<th
								className={x({
									cell: true,
									head: true,
									productive: true,
								})}
							>
								<i className="msr">expand_less</i>
							</th>
							<th
								className={x({
									cell: true,
									head: true,
									neutral: true,
								})}
							>
								<i className="msr">remove</i>
							</th>
							<th
								className={x({
									cell: true,
									head: true,
									distracting: true,
								})}
							>
								<i className="msr">expand_more</i>
							</th>
							<th
								className={x({
									cell: true,
									head: true,
									"very-distracting": true,
								})}
							>
								<i className="msr">
									keyboard_double_arrow_down
								</i>
							</th>
						</tr>
					</thead>
					<tbody className={x({ body: true })}>
						{data &&
							Object.keys(data).map(key =>
								printRow(key, data[key])
							)}
					</tbody>
				</table>
			</main>
		</>
	)
}

export default RescueTimePage
