import styles from "./Header.module.scss"
import { sassBuilder } from "@/utils/sass"

const x = sassBuilder(styles)

const Header = () => (
	<header className={x({ header: true })}>
		<i className={x({icon: true, logo: true}, "msr")}>person</i>
		<h1 className={x({ "header-title": true })}>Plump Albert</h1>
		<i className={x({icon: true, menu: true}, "msr")}>menu</i>
	</header>
)

export default Header
