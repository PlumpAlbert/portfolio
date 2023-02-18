import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { NextPageWithLayout } from "@/types"

type AppPropsWithLayout = AppProps & { Component: NextPageWithLayout }

export default function App({ Component, pageProps }: AppPropsWithLayout) {
	if (typeof Component.getLayout === "function") {
		return Component.getLayout(<Component {...pageProps} />)
	}
	return <Component {...pageProps} />
}
