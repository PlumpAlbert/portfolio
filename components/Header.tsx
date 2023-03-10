import { useRef, useState } from "react"
// next
import Image from "next/image"
import Link from "next/link"
// imports
import menuItems from "@/utils/menu"
// styles
import styles from "./Header.module.scss"
import { sassBuilder } from "@/utils/sass"

const x = sassBuilder(styles)

const Header = () => {
	const rootRef = useRef<HTMLElement>(null)
	const [showMenu, setShowMenu] = useState(false)

	return (
		<header ref={rootRef} className={x({ header: true })}>
			<div className={x({ text: true })}>
				<Link className={x({ "home-link": true })} href="/">
					<Image
						className={x({ icon: true, logo: true })}
						src="/deer.png"
						height={32}
						width={32}
						alt="deer"
					/>
					<h1 className={x({ "header-title": true })}>
						Plump Albert
					</h1>
				</Link>
				<button
					className={x({ "icon-button": true })}
					onClick={() => setShowMenu(!showMenu)}
					onBlur={({ relatedTarget }) => {
						if (rootRef.current?.contains(relatedTarget)) {
							return
						}
						setShowMenu(false)
					}}
				>
					<i className={x({ icon: true, menu: true }, "msr")}>menu</i>
				</button>
			</div>
			<ul className={x({ "menu-wrapper": true, hidden: !showMenu })}>
				{menuItems.map(item => (
					<Link
						href={item.href}
						key={item.href}
						className={x({ "menu-item": true })}
						onClick={e => {
							e.stopPropagation()
							setShowMenu(false)
						}}
					>
						{item.label}
					</Link>
				))}
			</ul>
		</header>
	)
}

export default Header
