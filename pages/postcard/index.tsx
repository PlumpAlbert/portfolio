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
				<h6>Valentine 2023</h6>
				<p>My first ever made e-postcard</p>
			</div>
		</Link>
		<Link className={x({ block: true })} href="/postcard/women-day-2023">
			<Image
				className={x({ block__image: true })}
				src="/postcards/valentine/2023/deer.png"
				alt="deer"
				width={128}
				height={128}
			/>
			<div className={x({ block__text: true })}>
				<h6>Women&apos;s day 2023</h6>
				<p>
					Women&apos;s day postcard for 2023. Contains cover to a Foo
					Fighters song &quot;Everlong&quot;
				</p>
			</div>
		</Link>
	</main>
)

export default PostCards
