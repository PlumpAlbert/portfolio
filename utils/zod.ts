import type { ZodError } from "zod"

export function formatError(err: ZodError) {
	return err.errors
		.map(({ code, message, path }) => {
			return `[${code.toUpperCase()}] "${path}" ${message.toLowerCase()}`
		})
		.join("\n")
}
