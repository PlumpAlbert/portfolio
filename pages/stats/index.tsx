import { type NextPage } from "next"
import Image from "next/image"
import Link from "next/link"
// styles
import { sassBuilder } from "@/utils/sass"
import styles from "./stats.module.scss"

const x = sassBuilder(styles)

const StatsPage: NextPage = () => (
	<main className={x({ root: true })}>
		<Link className={x({ block: true })} href="/stats/rescuetime">
			<Image
				className={x({ block__image: true })}
				src="/rescue-time-icon.png"
				alt="rescuetime"
				width={128}
				height={128}
			/>
			<div className={x({ block__text: true })}>
				<h6>RescueTime</h6>
				<p>Custom dashboard for RescueTime&copy;</p>
			</div>
		</Link>
	</main>
)

export default StatsPage
