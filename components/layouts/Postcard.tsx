import type { ILayout } from "@/types"
import Header from "@/components/Header"
import styles from "./Postcard.module.scss"

const PostcardLayout: ILayout = page => (
	<div className={styles.root}>
		<Header className={styles.header} />
		{page}
	</div>
)

export default PostcardLayout
