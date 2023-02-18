import Head from "next/head"
import { NextPageWithLayout } from "@/types"
import MainLayout from "@/components/layouts/MainLayout"

const Home: NextPageWithLayout = () => {
	return (
		<>
			<Head>
				<title>Plump Albert</title>
			</Head>
			<p>Hello Next.JS</p>
		</>
	)
}

Home.getLayout = MainLayout

export default Home
