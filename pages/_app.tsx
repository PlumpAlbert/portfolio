import "@/styles/globals.scss"
import { body, heading, mono } from "@/utils/fonts"
import type { AppProps } from "next/app"
import { NextPageWithLayout } from "@/types"

type AppPropsWithLayout = AppProps & { Component: NextPageWithLayout }

export default function App({ Component, pageProps }: AppPropsWithLayout) {
	let child: any = <Component {...pageProps} />
	if (typeof Component.getLayout === "function") {
		child = Component.getLayout(<Component {...pageProps} />)
	}

	return (
		<>
			<style jsx global>{`
				:root {
					--font-sans: ${body.style.fontFamily}, ui-sans, Helvetica,
						"SF Pro", "Segoe UI", Arial, sans-serif;
					--font-heading: ${heading.style.fontFamily},
						${body.style.fontFamily}, ui-sans, Helvetica, "SF Pro",
						"Segoe UI", Arial, sans-serif;
					--font-mono: ${mono.style.fontFamily}, ui-monospace, Menlo,
						Monaco, "Cascadia Mono", "Roboto Mono",
						"Ubuntu Monospace", "Courier New", monospace;
				}

				h1,
				h2,
				h3,
				h4,
				h5,
				h6 {
					font-family: var(--font-heading);
					font-weight: 500;
				}

				.sans {
					font-family: var(--font-sans);
				}

				code {
					font-family: var(--font-mono);
				}
			`}</style>
			{child}
		</>
	)
}
