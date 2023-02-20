import { useCallback } from "react"
import type { GetServerSideProps, InferGetServerSidePropsType } from "next"
import Head from "next/head"
import Image from "next/image"
import { intervalToDuration, formatDuration } from "date-fns"
// chart
import { Chart, ArcElement, Tooltip, Legend, TooltipItem } from "chart.js"
import { Doughnut } from "react-chartjs-2"
// page
import { NextPageWithLayout } from "@/types"
import { body } from "@/utils/fonts"
import MainLayout from "@/components/layouts/MainLayout"
// api
import {
	type Productivity,
	getData,
} from "@/pages/api/analytics/rescuetime/month"
// styles
import { sassBuilder } from "@/utils/sass"
import styles from "@/styles/pages/index.module.scss"
import Link from "next/link"

const SC = sassBuilder(styles)

Chart.register(ArcElement, Tooltip, Legend)

const Home: NextPageWithLayout<
	InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ chartData }) => {
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
						Lorem ipsum dolor sit amet, officia excepteur ex fugiat
						reprehenderit enim labore culpa sint ad nisi Lorem
						pariatur mollit ex esse exercitation amet. Nisi anim
						cupidatat excepteur officia. Reprehenderit nostrud
						nostrud ipsum Lorem est aliquip amet voluptate voluptate
						dolor minim nulla est proident. Nostrud officia pariatur
						ut officia. Sit irure elit esse ea nulla sunt ex
						occaecat reprehenderit commodo officia dolor Lorem duis
						laboris cupidatat officia voluptate. Culpa proident
						adipisicing id nulla nisi laboris ex in Lorem sunt duis
						officia eiusmod. Aliqua reprehenderit commodo ex non
						excepteur duis sunt velit enim. Voluptate laboris sint
						cupidatat ullamco ut ea consectetur et est culpa et
						culpa duis.
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
								<Doughnut
									className={SC({ chart: true })}
									redraw
									width="100%"
									height={320}
									options={{
										font: { family: body.style.fontFamily },
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
												data: chartData,
											},
										],
									}}
								/>
							</div>
						</div>
					</div>
				</section>
			</main>
		</>
	)
}

export const getServerSideProps: GetServerSideProps<{
	chartData: [number, number, number, number, number]
}> = async ({ res }) => {
	res.setHeader(
		"Cache-Control",
		"public,s-maxage=10,stale-while-revalidate=59"
	)
	const data = await getData(new Date())
	const chartData: [number, number, number, number, number] = new Array(
		5
	).fill(0)
	Object.values(data).forEach(day => {
		chartData[0] += day.veryProductive
		chartData[1] += day.productive
		chartData[2] += day.neutral
		chartData[3] += day.distracting
		chartData[4] += day.veryDistracting
	})
	return { props: { chartData } }
}

Home.getLayout = MainLayout

export default Home
