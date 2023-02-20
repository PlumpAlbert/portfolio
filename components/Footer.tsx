import { sassBuilder } from "@/utils/sass"
import { body } from "@/utils/fonts"
import styles from "./Footer.module.scss"

const SC = sassBuilder(styles)

const Footer = () => (
	<footer className={SC({ footer: true })}>
		<span className={body.className}>
			&copy; {new Date().getFullYear()} Plump Albert
		</span>
		<span>Powered by Vercel</span>
	</footer>
)

export default Footer
