import { NextPageWithLayout } from "@/types"
import Head from "next/head"
import Image from "next/image"
import { Kaushan_Script } from "@next/font/google"
// styles
import { sassBuilder } from "@/utils/sass"
import styles from "./2023.module.scss"

const SC = sassBuilder(styles)

const font = Kaushan_Script({ weight: "400", subsets: ["latin", "latin-ext"] })

const Valentine: NextPageWithLayout = ({}) => {
	return (
		<main className={SC({ root: true })}>
			<style jsx global>
				{`
					body {
						background: #484653;
					}
				`}
			</style>
			<Head>
				<title>Happy Valentine&apos;s Day</title>
			</Head>
			<h1
				className={SC({ header: true })}
				style={{ ...font.style, color: "#F6C1C1" }}
			>
				Happy
				<br /> Valentine&apos;s Day
			</h1>

			<div className={SC({ "image-wrapper": true })}>
				<div className={SC({ image: true })}>
					<Image
						style={{ borderRadius: 8 }}
						fill
						alt="valentine.png"
						src="/postcards/valentine/2023/deer.png"
						quality="100"
					/>
				</div>
				<audio controls className={SC({ audio: true })}>
					<source src="https://docs.google.com/uc?authuser=0&export=download&id=1P_6rhoM0AYxPfytNBAV9IdowbQIdyZ_u" />
				</audio>
			</div>
		</main>
	)
}

Valentine.getLayout = page => page

export default Valentine
