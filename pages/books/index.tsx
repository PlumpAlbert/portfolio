import { NextPageWithLayout } from "next"
import Head from "next/head"
import { Lora } from "@next/font/google"
// material
import IconButton from "@mui/material/IconButton"
// icons
import ForwardIcon from "@mui/icons-material/FastForwardRounded"
import RewindIcon from "@mui/icons-material/FastRewindRounded"
import PlayIcon from "@mui/icons-material/PlayArrowRounded"

import styles from "./index.module.scss"
import { sassBuilder } from "@/utils/sass"

const SC = sassBuilder(styles)
const lora = Lora({ weight: ["400", "500"] })

const BooksPage: NextPageWithLayout = props => {
	return (
		<main className={SC({ root: true })}>
			<header className={SC({ header: true })}>
				<h1 className={SC({ heading: true }, lora.className)}>
					Plump Albert
				</h1>
			</header>

			<section className={SC({ content: true })}>
				<h2 className={SC({ content__header: true }, lora.className)}>
					The Book
				</h2>
			</section>

			<footer className={SC({ footer: true })}>
				<IconButton
					size="large"
					className={SC({ button: true })}
					color="inherit"
				>
					<RewindIcon />
				</IconButton>

				<IconButton
					size="large"
					className={SC({ button: true })}
					color="inherit"
				>
					<PlayIcon fontSize="large" />
				</IconButton>

				<IconButton
					size="large"
					className={SC({ button: true })}
					color="inherit"
				>
					<ForwardIcon />
				</IconButton>
			</footer>
		</main>
	)
}

BooksPage.getLayout = page => (
	<>
		<Head>
			<title>PlumpBooks</title>
		</Head>
		{page}
	</>
)

export default BooksPage
