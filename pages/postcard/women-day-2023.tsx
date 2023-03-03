import { useCallback, useEffect, useRef } from "react"
import type { NextPageWithLayout } from "@/types"
// imports
import PhoneSvg from "@/public/postcards/women-day-2023/phone.svg"
// styles
import styles from "./women-day-2023.module.scss"
import { sassBuilder } from "@/utils/sass"

const x = sassBuilder(styles)

const Page: NextPageWithLayout = () => {
	const audioRef: React.MutableRefObject<HTMLAudioElement | null> =
		useRef(null)
	const playButtonRef: React.MutableRefObject<SVGRectElement | null> =
		useRef(null)
	const pauseButtonRef: React.MutableRefObject<SVGRectElement | null> =
		useRef(null)
	const stopButtonRef: React.MutableRefObject<SVGRectElement | null> =
		useRef(null)

	useEffect(() => {
		playButtonRef.current = document.querySelector(
			"#phone_svg__button_play"
		)
		pauseButtonRef.current = document.querySelector(
			"#phone_svg__button_pause"
		)
		stopButtonRef.current = document.querySelector(
			"#phone_svg__button_stop"
		)
		playButtonRef.current?.classList.add(
			x({ "play-button--inactive": true })
		)
		pauseButtonRef.current?.classList.add(x({ "playback-button": true }))
		stopButtonRef.current?.classList.add(x({ "playback-button": true }))

		function handlePlayClick() {
			audioRef.current?.play()
		}
		function handlePauseClick() {
			audioRef.current?.pause()
		}
		function handleStopClick() {
			if (!audioRef.current) return
			audioRef.current.pause()
			audioRef.current.currentTime = 0
		}
		playButtonRef.current?.addEventListener("click", handlePlayClick)
		pauseButtonRef.current?.addEventListener("click", handlePauseClick)
		stopButtonRef.current?.addEventListener("click", handleStopClick)

		return () => {
			playButtonRef.current?.removeEventListener("click", handlePlayClick)
			pauseButtonRef.current?.removeEventListener(
				"click",
				handlePauseClick
			)
			stopButtonRef.current?.removeEventListener("click", handleStopClick)
		}
	}, [])

	return (
		<main className={x({ root: true })}>
			<style jsx global>
				{`
					body {
						background: radial-gradient(
								circle at center,
								transparent,
								transparent 64%,
								rgba(33, 33, 66, 0.3)
							),
							#b2b6dc;
					}
				`}
			</style>
			<PhoneSvg className={x({ svg: true })} />
			<audio ref={audioRef} className={x({ audio: true })}>
				<source src="https://docs.google.com/uc?authuser=0&export=download&id=1P_6rhoM0AYxPfytNBAV9IdowbQIdyZ_u" />
			</audio>
		</main>
	)
}

Page.getLayout = page => page

export default Page
