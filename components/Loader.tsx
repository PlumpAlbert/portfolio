import styles from "./Loader.module.scss"
import { sassBuilder } from "@/utils/sass"
import { ComponentType } from "react"

const x = sassBuilder(styles)

const Loader: ComponentType<{ className?: string }> = ({ className = "" }) => (
	<i className={x({ spinner: true }, "msr spinner", className)}>sync</i>
)

export default Loader
