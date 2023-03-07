import "@/styles/globals.scss"
import { QueryClient, QueryClientProvider } from "react-query"
import { body, heading, mono } from "@/utils/fonts"
import type { AppProps } from "next/app"
import { NextPageWithLayout } from "@/types"
import MainLayout from "@/components/layouts/MainLayout"

type AppPropsWithLayout = AppProps & { Component: NextPageWithLayout }

const client = new QueryClient()

export default function App({ Component, pageProps }: AppPropsWithLayout) {
	let child =
		typeof Component.getLayout === "function"
			? Component.getLayout(<Component {...pageProps} />)
			: MainLayout(<Component {...pageProps} />)

	return (
		<QueryClientProvider client={client}>
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
		</QueryClientProvider>
	)
}
