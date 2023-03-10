import { MouseEventHandler, useCallback, useMemo, useState } from "react"
import { useQuery } from "react-query"
// chart
import { Chart, ArcElement, Tooltip, Legend, type TooltipItem } from "chart.js"
import { Doughnut } from "react-chartjs-2"
// next
import axios from "axios"
import type { NextPage } from "next"
import Head from "next/head"
// date-fns
import {
	intervalToDuration,
	format,
	addMonths,
	isSameMonth,
	formatDuration,
} from "date-fns"
// imports
import { Productivity } from "@/pages/api/stats/rescuetime/month"
import { body } from "@/utils/fonts"
// styles
import styles from "./rescuetime.module.scss"
import { sassBuilder } from "@/utils/sass"

Chart.register(ArcElement, Tooltip, Legend)

const x = sassBuilder(styles)

function getDuration(time?: number) {
	const duration = intervalToDuration({ start: 0, end: (time ?? 0) * 1000 })
	return `${duration.hours?.toString().padStart(2, "0")}:${duration.minutes
		?.toString()
		.padStart(2, "0")}`
}

function getSummary(
	data: Record<string, Productivity>,
	key: keyof Productivity
) {
	return Object.values(data).reduce((totalSum, row) => {
		return totalSum + (row[key] ?? 0)
	}, 0)
}

function normalization(items: number[]) {
	const min = Math.min(...items)
	const max = Math.max(...items)

	return items.map(item => 0.03 + (item - min) / (max - min))
}

const RescueTimePage: NextPage = () => {
	const isDarkTheme =
		typeof window === "object" &&
		window.matchMedia("(prefers-color-scheme: dark)").matches

	const isMobile = typeof window === "object" && window.innerWidth < 1024

	const COLORS = isDarkTheme
		? ["#8EABE6", "#87EEBB", "#D9D9D9", "#E9E463", "#FF8766"]
		: ["#628bdd", "#17a35d", "hsl(200, 8%, 56%)", "#e89e61", "#e8616a"]

	const [date, setDate] = useState(new Date())

	const { isLoading, data } = useQuery(
		["analytics", date] as const,
		async function ({ queryKey }) {
			const [, date] = queryKey
			const { data } = await axios.get<{
				data: Record<string, Productivity>
			}>("/api/stats/rescuetime/month", {
				params: { date },
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
				<td className={x({ cell: true, date: true })}>{d.getDate()}</td>
				<td
					className={x({
						cell: true,
						"very-productive": true,
						dim: productivity.veryProductive === 0,
					})}
				>
					{getDuration(productivity.veryProductive)}
				</td>
				<td
					className={x({
						cell: true,
						productive: true,
						dim: productivity.productive === 0,
					})}
				>
					{getDuration(productivity.productive)}
				</td>
				<td
					className={x({
						cell: true,
						neutral: true,
						dim: productivity.neutral === 0,
					})}
				>
					{getDuration(productivity.neutral)}
				</td>
				<td
					className={x({
						cell: true,
						distracting: true,
						dim: productivity.distracting === 0,
					})}
				>
					{getDuration(productivity.distracting)}
				</td>
				<td
					className={x({
						cell: true,
						"very-distracting": true,
						dim: productivity.veryDistracting === 0,
					})}
				>
					{getDuration(productivity.veryDistracting)}
				</td>
			</tr>
		)
	}

	const summary = useMemo(() => {
		if (!data) return [0, 0, 0, 0, 0]
		return [
			getSummary(data, "veryProductive"),
			getSummary(data, "productive"),
			getSummary(data, "neutral"),
			getSummary(data, "distracting"),
			getSummary(data, "veryDistracting"),
		]
	}, [data])

	const displayChartLabel = useCallback(
		(item: TooltipItem<"doughnut">) => {
			const index = item.dataIndex
			return ` Time spent: ${getDuration(summary[index])}`
		},
		[summary]
	)

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
				{isLoading ? (
					<div className={x({ "spinner-wrapper": true })}>
						<i className={x({ spinner: true }, "msr")}>sync</i>
					</div>
				) : (
					data && (
						<div className={x({ content: true })}>
							<div className={x({ "chart-wrapper": true })}>
								<Doughnut
									className={x({ chart: true })}
									width={isMobile ? undefined : 480}
									height={isMobile ? 240 : 480}
									options={{
										font: { family: body.style.fontFamily },
										maintainAspectRatio: false,
										responsive: true,
										radius: "100%",
										cutout: "75%",
										plugins: {
											legend: {
												position: "bottom",
												display: !isMobile,
												labels: {
													font: {
														weight: "400",
														family: body.style
															.fontFamily,
														size: 12,
													},
													color: isDarkTheme
														? "#ccc"
														: "#444",
													boxWidth: 24,
													borderRadius: 6,
													boxHeight: 12,
													padding: 16,
												},
											},
											tooltip: {
												callbacks: {
													label: displayChartLabel,
												},
											},
										},
									}}
									data={{
										labels: [
											"Very Productive",
											"Productive",
											"Neutral",
											"Distracting",
											"Very Distracting",
										],
										datasets: [
											{
												normalized: true,
												spacing: 4,
												borderJoinStyle: "round",
												borderRadius: 4,
												borderWidth: 0,
												data: normalization(summary),
												backgroundColor: COLORS,
											},
										],
									}}
								/>
							</div>
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
											<i className="msr">
												calendar_month
											</i>
										</th>
										<th
											className={x({
												cell: true,
												head: true,
												"very-productive": true,
											})}
										>
											<i className="msr">
												keyboard_double_arrow_up
											</i>
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
								<tfoot className={x({ footer: true })}>
									<tr className={x({ row: true })}>
										<td
											className={x({
												cell: true,
												date: true,
											})}
										>
											Total
										</td>
										<td
											className={x({
												cell: true,
												"very-productive": true,
											})}
										>
											{getDuration(summary[0])}
										</td>
										<td
											className={x({
												cell: true,
												productive: true,
											})}
										>
											{getDuration(summary[1])}
										</td>
										<td
											className={x({
												cell: true,
												neutral: true,
											})}
										>
											{getDuration(summary[2])}
										</td>
										<td
											className={x({
												cell: true,
												distracting: true,
											})}
										>
											{getDuration(summary[3])}
										</td>
										<td
											className={x({
												cell: true,
												"very-distracting": true,
											})}
										>
											{getDuration(summary[4])}
										</td>
									</tr>
								</tfoot>
							</table>
						</div>
					)
				)}
			</main>
		</>
	)
}

export default RescueTimePage
