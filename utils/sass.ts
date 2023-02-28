export const sass = (
	styles: Record<string, string>,
	obj: Record<string, boolean>,
	...classNames: string[]
) => {
	const classes = Object.keys(obj).map(key => {
		if (!obj[key]) {
			return ""
		}
		return styles[key] ?? ""
	})

	return classes.concat(classNames).join(" ")
}

export const sassBuilder =
	(styles: Record<string, string>) =>
	(obj: Record<string, boolean>, ...classNames: string[]) =>
		sass(styles, obj, ...classNames)
