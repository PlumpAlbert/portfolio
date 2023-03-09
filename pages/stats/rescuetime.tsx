import type { NextPage } from "next"
import Head from "next/head"
import { useState } from "react"
import { useQuery } from "react-query"
import axios from "axios"
import intervalToDuration from "date-fns/intervalToDuration"
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

	const { isLoading, data } = useQuery("analytics", async function () {
		const { data } = await axios.get<{
			data: Record<string, Productivity>
		}>("/api/stats/rescuetime/month", {
			params: { date: date.toISOString() },
		})
		return data.data
	})

	/**
	 * @param date
	 * @param productivity
	 */
	const printRow = (date: string, productivity: Productivity) => {
		const d = new Date(date)
		return (
			<div key={date} className={x({ row: true })}>
				<p className={x({ cell: true, date: true })}>
					{d.toLocaleDateString()}
				</p>
				<p className={x({ cell: true, "very-productive": true })}>
					{getDuration(productivity.veryProductive)}
				</p>
				<p className={x({ cell: true, productive: true })}>
					{getDuration(productivity.productive)}
				</p>
				<p className={x({ cell: true, neutral: true })}>
					{getDuration(productivity.neutral)}
				</p>
				<p className={x({ cell: true, distracting: true })}>
					{getDuration(productivity.distracting)}
				</p>
				<p className={x({ cell: true, "very-distracting": true })}>
					{getDuration(productivity.veryDistracting)}
				</p>
			</div>
		)
	}

	return (
		<>
			<Head>
				<title>RescueTime stats</title>
			</Head>
			<main className={x({ root: true })}>
				{isLoading && (
					<div className={x({ "spinner-wrapper": true })}>
						<i className={x({ spinner: true }, "msr")}>sync</i>
					</div>
				)}
				<div className={x({ table: true })}>
					<div className={x({ head: true })}>
						<div className={x({ row: true })}>
							<p
								className={x({
									cell: true,
									header: true,
									date: true,
								})}
							>
								<i className="msr">calendar_month</i>
							</p>
							<p
								className={x({
									cell: true,
									header: true,
									"very-productive": true,
								})}
							>
								<i className="msr">keyboard_double_arrow_up</i>
							</p>
							<p
								className={x({
									cell: true,
									header: true,
									productive: true,
								})}
							>
								<i className="msr">expand_less</i>
							</p>
							<p
								className={x({
									cell: true,
									header: true,
									neutral: true,
								})}
							>
								<i className="msr">remove</i>
							</p>
							<p
								className={x({
									cell: true,
									header: true,
									distracting: true,
								})}
							>
								<i className="msr">expand_more</i>
							</p>
							<p
								className={x({
									cell: true,
									header: true,
									"very-distracting": true,
								})}
							>
								<i className="msr">
									keyboard_double_arrow_down
								</i>
							</p>
						</div>
					</div>
					<div className={x({ body: true })}>
						{data &&
							Object.keys(data).map(key =>
								printRow(key, data[key])
							)}
					</div>
				</div>
			</main>
		</>
	)
}

export default RescueTimePage
