import "../styles/globals.css"
import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import type { AppProps } from "next/app"
import { trpc } from "@common/utils/trpc"

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default trpc.withTRPC(MyApp)
