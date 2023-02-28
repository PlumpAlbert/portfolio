import { type NextPage } from "next"
import Image from "next/image"
import Link from "next/link"
// styles
import { sassBuilder } from "@/utils/sass"
import styles from "./PostCards.module.scss"

const x = sassBuilder(styles)

const PostCards: NextPage = () => (
	<main className={x({ root: true })}>
		<Link className={x({ block: true })} href="/postcard/valentine/2023">
			<Image
				className={x({ block__image: true })}
				src="/postcards/valentine/2023/deer.png"
				alt="deer"
				width={128}
				height={128}
			/>
			<div className={x({ block__text: true })}>
				<h6>2023</h6>
				<p>My first ever made e-postcard</p>
			</div>
		</Link>
	</main>
)

export default PostCards
