import "../styles/globals.css"
import type { AppProps } from "next/app"
import { trpc } from "@common/utils/trpc"

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default trpc.withTRPC(MyApp)
