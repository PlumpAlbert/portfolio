import Image from "next/image"
import SadgeImage from "@/public/sadge.png"
// styles
import styles from "./404.module.scss"
import { sassBuilder } from "@/utils/sass"

const SC = sassBuilder(styles)

export default function Page404() {
	return (
		<main className={SC({ root: true })}>
			<div className={SC({ "image-wrapper": true })}>
				<Image
					fill
					className={SC({ image: true })}
					alt="sadge"
					src={SadgeImage}
					placeholder="blur"
					quality={100}
				/>
			</div>
			<div className={SC({ text: true })}>
				<h2
					className={SC({ text__header: true })}
					style={{
						fontSize: "2rem",
						fontFamily: "var(--font-heading)",
					}}
				>
					Oh, snap!
				</h2>
				<p className={SC({ text__content: true })}>
					The required page was not found
				</p>
			</div>
		</main>
	)
}
