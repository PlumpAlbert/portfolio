import Image from "next/image"
import styles from "./Header.module.scss"
import { sassBuilder } from "@/utils/sass"
import menuItems from "@/utils/menu"
import Link from "next/link"
import { useState } from "react"

const x = sassBuilder(styles)

const Header = () => {
	const [showMenu, setShowMenu] = useState(false)

	return (
		<header className={x({ header: true })}>
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
					onBlur={() => setShowMenu(false)}
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
					>
						{item.label}
					</Link>
				))}
			</ul>
		</header>
	)
}

export default Header
