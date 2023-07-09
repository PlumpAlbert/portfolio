import { useEffect, useRef, useState } from "react"
import { NextPageWithLayout } from "next"
import Head from "next/head"
import { Lora } from "@next/font/google"
// material
import IconButton from "@mui/material/IconButton"
// icons
import ForwardIcon from "@mui/icons-material/FastForwardRounded"
import RewindIcon from "@mui/icons-material/FastRewindRounded"
import PlayIcon from "@mui/icons-material/PlayArrowRounded"
import PauseIcon from "@mui/icons-material/PauseRounded"

import styles from "./index.module.scss"
import { sassBuilder } from "@/utils/sass"

const SC = sassBuilder(styles)
const lora = Lora({ weight: ["400", "500"] })

const BooksPage: NextPageWithLayout = () => {
	const containerRef = useRef<HTMLDivElement>(null)
	const surferRef =
		useRef<ReturnType<typeof import("wavesurfer.js").create>>()

	const [playing, setPlaying] = useState(false)

	useEffect(() => {
		import("wavesurfer.js").then(async function (module) {
			if (!containerRef.current || surferRef.current) return

			surferRef.current = module.default.create({
				height: 200,
				container: containerRef.current,
				scrollParent: true,
				autoCenter: true,
				cursorWidth: 0,
				barWidth: 2,
				barHeight: 8,
				waveColor: "#ffffff",
				progressColor: "#8E6081",
			})

			surferRef.current.load(
				"/api/get/file?id=1RGgXq-243SF20S8fT8jrW4npZUWWvADP"
			)

			surferRef.current.on("finish", () => setPlaying(false))
			surferRef.current.on("play", () => setPlaying(true))
			surferRef.current.on("pause", () => setPlaying(false))
		})

		return () => {
			surferRef.current?.destroy()
			surferRef.current = undefined
		}
	}, [])

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

				<div
					ref={containerRef}
					id="surfer-container"
					className={SC({ surfer: true })}
				></div>
			</section>

			<footer className={SC({ footer: true })}>
				<IconButton
					size="large"
					className={SC({ button: true })}
					color="inherit"
					onClick={() => surferRef.current?.skipBackward(10)}
				>
					<RewindIcon />
				</IconButton>

				<IconButton
					size="large"
					className={SC({ button: true })}
					color="inherit"
					onClick={() => {
						surferRef.current?.playPause()
						setPlaying(!playing)
					}}
				>
					{playing ? (
						<PauseIcon fontSize="large" />
					) : (
						<PlayIcon fontSize="large" />
					)}
				</IconButton>

				<IconButton
					size="large"
					className={SC({ button: true })}
					color="inherit"
					onClick={() => surferRef.current?.skipForward(10)}
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
