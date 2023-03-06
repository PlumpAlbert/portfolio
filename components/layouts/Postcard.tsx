import type { ILayout } from "@/types"
import Header from "@/components/Header"
import styles from "./Postcard.module.scss"

const PostcardLayout: ILayout = page => (
	<div className={styles.root}>
		<Header />
		{page}
	</div>
)

export default PostcardLayout
