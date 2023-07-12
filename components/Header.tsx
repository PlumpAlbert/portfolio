import { ComponentType, useRef, useState } from "react"
// next
import Image from "next/image"
import Link from "next/link"
// mui
import useScrollTrigger from "@mui/material/useScrollTrigger"
import AppBar from "@mui/material/AppBar"
// imports
import menuItems from "@/utils/menu"
// styles
import styles from "./Header.module.scss"
import { sassBuilder } from "@/utils/sass"

const x = sassBuilder(styles)

const Header: ComponentType<{ className?: string }> = ({ className = "" }) => {
	const rootRef = useRef<HTMLDivElement>(null)
	const [showMenu, setShowMenu] = useState(false)

	const scrolled = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0,
	})

	return (
		<AppBar
			ref={rootRef}
			component="header"
			position="sticky"
			color="transparent"
			elevation={0}
			classes={{
				root: x(
					{
						header: true,
						"header--scrolled": scrolled,
					},
					className
				),
			}}
		>
			<div className={x({ wrapper: true }, className)}>
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
						<i className={x({ icon: true, menu: true }, "msr")}>
							menu
						</i>
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
			</div>
		</AppBar>
	)
}

export default Header
