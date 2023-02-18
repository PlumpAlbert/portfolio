import type { ReactElement, ReactNode } from "react"
import type { NextPage } from "next"

export interface ILayout {
	(page: ReactElement): ReactNode
}

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: ILayout
}
