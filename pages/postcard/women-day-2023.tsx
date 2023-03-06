import { useEffect, useRef } from "react"
import type { NextPageWithLayout } from "@/types"
import Head from "next/head"
import PostcardLayout from "@/components/layouts/Postcard"
// imports
import PhoneSvg from "@/public/postcards/women-day-2023/phone.svg"
// styles
import styles from "./women-day-2023.module.scss"
import { sassBuilder } from "@/utils/sass"

const x = sassBuilder(styles)

const Page: NextPageWithLayout = () => {
	const audioTypeRef = useRef<"voicemail" | "song">("voicemail")

	//#region audio refs
	const introRef: React.MutableRefObject<HTMLAudioElement | null> =
		useRef(null)
	const songRef: React.MutableRefObject<HTMLAudioElement | null> =
		useRef(null)
	const voiceMailRef: React.MutableRefObject<HTMLAudioElement | null> =
		useRef(null)
	//#endregion

	//#region button refs
	const playButtonRef: React.MutableRefObject<SVGRectElement | null> =
		useRef(null)
	const pauseButtonRef: React.MutableRefObject<SVGRectElement | null> =
		useRef(null)
	const stopButtonRef: React.MutableRefObject<SVGRectElement | null> =
		useRef(null)
	const buttonOneRef: React.MutableRefObject<SVGRectElement | null> =
		useRef(null)
	//#endregion

	useEffect(() => {
		//#region find buttons
		playButtonRef.current = document.querySelector(
			"#phone_svg__button_play"
		)
		pauseButtonRef.current = document.querySelector(
			"#phone_svg__button_pause"
		)
		stopButtonRef.current = document.querySelector(
			"#phone_svg__button_stop"
		)
		buttonOneRef.current = document.querySelector("#phone_svg__button_1")
		//#endregion

		playButtonRef.current?.classList.add(
			x({ "play-button--inactive": true })
		)
		document.querySelectorAll("[id^=phone_svg__button]").forEach(el => {
			if (el.id === "phone_svg__buttons") return
			el.classList.add(x({ "playback-button": true }))
		})

		//#region callbacks
		function handlePlayClick() {
			if (audioTypeRef.current === "voicemail") {
				voiceMailRef.current?.play()
				introRef.current?.play()
				return
			}
			songRef.current?.play()
			voiceMailRef.current?.pause()
			introRef.current?.pause()
		}
		function handlePauseClick() {
			songRef.current?.pause()
			if (voiceMailRef.current) {
				voiceMailRef.current.pause()
				voiceMailRef.current.currentTime = 0
			}
			if (introRef.current) {
				introRef.current.pause()
				introRef.current.currentTime = 0
			}
		}
		function handleStopClick() {
			if (
				!songRef.current ||
				!voiceMailRef.current ||
				!introRef.current
			) {
				return
			}
			if (audioTypeRef.current === "voicemail") {
				voiceMailRef.current.pause()
				voiceMailRef.current.currentTime = 0
				introRef.current.pause()
				introRef.current.currentTime = 0
				return
			}
			songRef.current.pause()
			songRef.current.currentTime = 0
			audioTypeRef.current = "voicemail"
		}
		function handleButtonOneClick() {
			// do nothing if user did not pressed play button
			if (introRef.current?.paused) {
				debugger
				return
			}
			if (voiceMailRef.current) {
				voiceMailRef.current.pause()
				voiceMailRef.current.currentTime = 0
			}
			if (introRef.current) {
				introRef.current.pause()
				introRef.current.currentTime = 0
			}
			songRef.current?.play()
			audioTypeRef.current = "song"
		}
		//#endregion

		//#region add event listeners
		playButtonRef.current?.addEventListener("click", handlePlayClick)
		pauseButtonRef.current?.addEventListener("click", handlePauseClick)
		stopButtonRef.current?.addEventListener("click", handleStopClick)
		buttonOneRef.current?.addEventListener("click", handleButtonOneClick)
		//#endregion

		return () => {
			playButtonRef.current?.removeEventListener("click", handlePlayClick)
			pauseButtonRef.current?.removeEventListener(
				"click",
				handlePauseClick
			)
			stopButtonRef.current?.removeEventListener("click", handleStopClick)
			buttonOneRef.current?.removeEventListener(
				"click",
				handleButtonOneClick
			)
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
			<Head>
				<title>Happy Women&apos;s Day</title>
			</Head>
			<PhoneSvg className={x({ svg: true })} />
			<audio ref={songRef} className={x({ audio: true })}>
				<source src="https://docs.google.com/uc?authuser=0&export=download&id=1yPZAzC4qbJ1x-V8-KFPglU0JCRKVqe3c" />
			</audio>
			<audio ref={introRef} loop>
				<source src="https://docs.google.com/uc?authuser=0&export=download&id=1RGgXq-243SF20S8fT8jrW4npZUWWvADP" />
			</audio>
			<audio ref={voiceMailRef}>
				<source src="https://docs.google.com/uc?authuser=0&export=download&id=1pP-jjMVt3-7YRTDwHt50kdnl_FoyVZ2t" />
			</audio>
		</main>
	)
}

Page.getLayout = PostcardLayout

export default Page
