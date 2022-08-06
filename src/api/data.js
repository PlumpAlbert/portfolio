import axios from "axios";
import format from "date-fns/format";
import {API_URL} from ".";

/** @param {IProps} props */
export const getAnalytics = async ({
  apiKey,
  dateStart,
  dateEnd,
  interval = "day",
}) => {
  if (!apiKey) {
    throw "`apiKey` must be provided!";
  }
  if (!dateStart) {
    throw "`dateStart` must be provided!";
  }
  if (!dateEnd) {
    dateEnd = format(new Date(), "yyyy-MM-dd");
  }
  /** @type {import("axios").AxiosResponse<Response>} */
  const response = await axios.get(`${API_URL}/data`, {
    params: {
      key: apiKey,
      format: "json",
      by: "rank",
      interval,
      restrict_begin: dateStart,
      restrict_end: dateEnd,
      restrict_kind: "productivity",
    },
  });
  if (response.status !== 200) throw response;
  return response.data;
};
/** @typedef IProps
 * @property {string} apiKey
 * @property {string} dateStart
 * @property {string} [dateEnd]
 * @property {"day"|"week"|"month"} [interval]
 */
/** @typedef Response
 * @property {string} notes
 * @property {string[]} row_headers
 * @property {number[][]} rows
 */
