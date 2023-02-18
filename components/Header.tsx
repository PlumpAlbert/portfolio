import Image from "next/image"
import styles from "./Header.module.scss"
import { sassBuilder } from "@/utils/sass"

const x = sassBuilder(styles)

const Header = () => (
	<header className={x({ header: true })}>
		<Image
			className={x({ icon: true, logo: true })}
			src="/deer.png"
			height={32}
			width={32}
			alt="deer"
		/>
		<h1 className={x({ "header-title": true })}>Plump Albert</h1>
		<i className={x({ icon: true, menu: true }, "msr")}>menu</i>
	</header>
)

export default Header
