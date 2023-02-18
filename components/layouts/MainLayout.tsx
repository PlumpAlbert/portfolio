import { ILayout } from "@/types"
import Footer from "@/components/Footer"
import Header from "@/components/Header"

const MainLayout: ILayout = page => {
	return (
		<>
			<Header />
			{page}
			<Footer />
		</>
	)
}

export default MainLayout
