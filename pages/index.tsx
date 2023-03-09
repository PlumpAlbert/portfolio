import { useCallback } from "react"
// nextjs
import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
// global
import { useQuery } from "react-query"
import { intervalToDuration, formatDuration } from "date-fns"
import axios from "axios"
// chart
import { Chart, ArcElement, Tooltip, Legend, TooltipItem } from "chart.js"
import { Doughnut } from "react-chartjs-2"
// page
import { body } from "@/utils/fonts"
// api
import { Productivity } from "@/pages/api/stats/rescuetime/month"
// styles
import { sassBuilder } from "@/utils/sass"
import styles from "./index.module.scss"
import Loader from "@/components/Loader"

const SC = sassBuilder(styles)

Chart.register(ArcElement, Tooltip, Legend)

const Home: NextPage = () => {
	const { data, isLoading } = useQuery("rescuetime-data", async function () {
		const { data } = await axios.get<{
			data: Record<string, Productivity>
		}>("/api/stats/rescuetime/month", {
			params: { date: new Date() },
		})

		const result = [0, 0, 0, 0, 0]
		Object.values(data.data ?? {}).forEach(day => {
			result[0] += day.veryProductive ?? 0
			result[1] += day.productive ?? 0
			result[2] += day.neutral ?? 0
			result[3] += day.distracting ?? 0
			result[4] += day.veryDistracting ?? 0
		})

		return result
	})

	const chartLabel = useCallback<(ctx: TooltipItem<"doughnut">) => string>(
		({ parsed, dataset }) => {
			const label = dataset.label || ""
			const duration = intervalToDuration({
				start: 0,
				end: parsed * 1000,
			})
			return `${label}: ${formatDuration(duration, {
				format: ["hours", "minutes"],
				zero: false,
			})}`
		},
		[]
	)

	return (
		<>
			<Head>
				<title>Plump Albert</title>
			</Head>
			<main className={SC({ root: true })}>
				<aside className={SC({ avatar: true })}>
					<Image
						className={SC({ avatar_image: true })}
						height={256}
						width={256}
						quality={100}
						alt="avatar"
						src="/avatar.jpg"
					/>
					<h2 className={SC({ avatar_title: true })}>Plump Albert</h2>
					<div className={SC({ socials: true })}>
						<Link target="_blank" href="https://t.me/plump_albert">
							<Image
								className={SC({ telegram: true })}
								height={40}
								width={40}
								alt="telegram"
								src="/telegram-app.svg"
							/>
						</Link>

						<Link
							target="_blank"
							href="https://github.com/PlumpAlbert"
						>
							<Image
								className={SC({ github: true })}
								height={40}
								width={40}
								alt="github"
								src="/github.svg"
							/>
						</Link>

						<Link
							target="_blank"
							href="mailto:plumpalbert@gmail.com"
						>
							<Image
								className={SC({ gmail: true })}
								height={40}
								width={40}
								alt="gmail"
								src="/gmail.svg"
							/>
						</Link>
					</div>
				</aside>
				<section className={SC({ content: true })}>
					<div className={SC({ block: true })}>
						<h6 className={SC({ block__header: true })}>
							About me
						</h6>
						<div className={SC({ about: true })}>
							Hello! My name is Matthew. I am a web-developer. I
							have a bachelor degree in computer science, 2 years
							of enterprise expirience in React development.
							<br />
							<br />I have a great knowledge of:
							<ul className={SC({ list: true })}>
								<li className={SC({ item: true })}>
									ECMAScript 6+
								</li>
								<li className={SC({ item: true })}>
									TypeScript
								</li>
								<li className={SC({ item: true })}>
									CSS, Sass, Scss
								</li>
								<li className={SC({ item: true })}>HTML</li>
								<li className={SC({ item: true })}>Linux</li>
								<li className={SC({ item: true })}>
									shell (bash, zsh)
								</li>
							</ul>
							<br />I also worked with:
							<ul className={SC({ list: true })}>
								<li className={SC({ item: true })}>Docker</li>
								<li className={SC({ item: true })}>
									Github Actions
								</li>
								<li className={SC({ item: true })}>PHP</li>
								<li className={SC({ item: true })}>Python</li>
							</ul>
							<br />I can describe myself as hardworking, diligent
							and dutiful.
						</div>
					</div>
					<div className={SC({ block: true })}>
						<h6 className={SC({ block__header: true })}>
							Statistics
						</h6>
						<div className={SC({ chart: true })}>
							<p className={SC({ "chart-text": true })}>
								<Link
									href="https://rescuetime.com"
									target="_blank"
									className={SC({ link: true })}
								>
									RescueTime
								</Link>
								<br />
								Total amount of time spent on work during this
								month.
							</p>
							<div className={SC({ "chart-wrapper": true })}>
								{isLoading ? (
									<Loader className={SC({spinner: true})} />
								) : (
									<Doughnut
										className={SC({ chart: true })}
										redraw
										width="100%"
										height={320}
										options={{
											font: {
												family: body.style.fontFamily,
											},
											maintainAspectRatio: false,
											responsive: true,
											normalized: true,
											plugins: {
												legend: {
													position: "right",
													labels: {
														font: {
															weight: "400",
															family: body.style
																.fontFamily,
														},
														color: "hsl(200, 4%, 44%)",
														boxWidth: 24,
														borderRadius: 4,
														boxHeight: 12,
														padding: 16,
													},
												},
												tooltip: {
													callbacks: {
														label: chartLabel,
													},
												},
											},
										}}
										data={{
											labels: [
												"Very productive",
												"Productive",
												"Neutral",
												"Distracting",
												"Very distracting",
											],
											datasets: [
												{
													normalized: true,
													spacing: 2,
													label: "Time spent",
													backgroundColor: [
														"#8EABE6",
														"#87EEBB",
														"#D9D9D9",
														"#E9E463",
														"#FF8766",
													],
													borderJoinStyle: "round",
													borderRadius: 4,
													borderWidth: 0,
													data,
												},
											],
										}}
									/>
								)}
							</div>
						</div>
					</div>
				</section>
			</main>
		</>
	)
}

export default Home
