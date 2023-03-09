import { endOfMonth, parseISO, startOfMonth } from "date-fns"
import { z } from "zod"
import { NextApiHandler } from "next"
import { formatError } from "@/utils/zod"
import axios from "axios"

const RequestParamsSchema = z.object({
	date: z.string().datetime({ offset: true }),
})

export type Productivity = {
	veryProductive?: number
	productive?: number
	neutral?: number
	distracting?: number
	veryDistracting?: number
}

export const getData = async (month: Date) => {
	const params = {
		restrict_begin: startOfMonth(month),
		restrict_end: endOfMonth(month),
		format: "csv",
		by: "interval",
		interval: "day",
		restrict_kind: "productivity",
		key: process.env.RESCUETIME_KEY,
	}

	const { data, status } = await axios.get<string>(
		"https://www.rescuetime.com/anapi/data",
		{ params }
	)

	if (status !== 200) {
		throw data
	}

	const ranks: Record<string, Productivity> = {}
	data.split("\n")
		.slice(1, -1)
		.forEach(line => {
			const [date, time, , kind] = line.split(",")

			if (!ranks[date]) {
				ranks[date] = {
					veryProductive: 0,
					productive: 0,
					neutral: 0,
					distracting: 0,
					veryDistracting: 0,
				}
			}

			switch (kind) {
				case "-2": {
					ranks[date].veryDistracting = Number(time)
					break
				}
				case "-1": {
					ranks[date].distracting = Number(time)
					break
				}
				case "0": {
					ranks[date].neutral = Number(time)
					break
				}
				case "1": {
					ranks[date].productive = Number(time)
					break
				}
				case "2": {
					ranks[date].veryProductive = Number(time)
					break
				}
			}
		})

	return ranks
}

const handler: NextApiHandler = async (req, res) => {
	if (req.method !== "GET") {
		return res.status(405).json({
			error: true,
			message: "Method is not allowed",
		})
	}

	const result = RequestParamsSchema.safeParse(req.query)
	if (!result.success) {
		return res.status(400).json({
			error: true,
			message: formatError(result.error),
		})
	}
	const date = parseISO(result.data.date)

	return res.status(200).json({
		error: false,
		data: await getData(date),
	})
}

export default handler
