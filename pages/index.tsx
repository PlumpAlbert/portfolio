import Head from "next/head"
import Image from "next/image"
import { NextPageWithLayout } from "@/types"
import MainLayout from "@/components/layouts/MainLayout"
// styles
import { sassBuilder } from "@/utils/sass"
import styles from "@/styles/pages/index.module.scss"
import Link from "next/link"

const SC = sassBuilder(styles)

const Home: NextPageWithLayout = () => (
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

					<Link target="_blank" href="https://github.com/PlumpAlbert">
						<Image
							className={SC({ github: true })}
							height={40}
							width={40}
							alt="github"
							src="/github.svg"
						/>
					</Link>

					<Link target="_blank" href="mailto:plumpalbert@gmail.com">
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
					<h6 className={SC({ block__header: true })}>About me</h6>
					Lorem ipsum dolor sit amet, officia excepteur ex fugiat
					reprehenderit enim labore culpa sint ad nisi Lorem pariatur
					mollit ex esse exercitation amet. Nisi anim cupidatat
					excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem
					est aliquip amet voluptate voluptate dolor minim nulla est
					proident. Nostrud officia pariatur ut officia. Sit irure
					elit esse ea nulla sunt ex occaecat reprehenderit commodo
					officia dolor Lorem duis laboris cupidatat officia
					voluptate. Culpa proident adipisicing id nulla nisi laboris
					ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit
					commodo ex non excepteur duis sunt velit enim. Voluptate
					laboris sint cupidatat ullamco ut ea consectetur et est
					culpa et culpa duis.
				</div>
			</section>
		</main>
	</>
)

Home.getLayout = MainLayout

export default Home
