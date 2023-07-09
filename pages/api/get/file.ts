import axios from "axios"
import type { NextApiRequest, NextApiResponse } from "next"
import { Stream } from "stream"

export default async function getMusic(
	req: NextApiRequest,
	res: NextApiResponse<unknown>
) {
	const file = await axios<Stream>({
		url: "https://drive.google.com/uc",
		method: "GET",
		responseType: "stream",
		params: { id: req.query["id"] },
	})

	res.status(file.status)
	res.setHeader("Content-Type", file.headers["content-type"] as string)
	res.setHeader("Content-Length", file.headers["content-length"] as string)
	// file.arrayBuffer().then(buf => {
	// 	res.send(buf)
	// })
	file.data.pipe(res)
}
