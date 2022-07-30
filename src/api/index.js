import axios from "axios";
const API_URL = "https://cors.plumpalbert.xyz/www.rescuetime.com/anapi";

/**
 *
 * @param {Date} date
 */
export const getDayAnalytics = async date => {
  const [day, _] = date.toISOString().split("T");
  window.abortController = new AbortController();
  const response = await axios.get(`${API_URL}/data`, {
    signal: window.abortController.signal,
    params: {
      key: "B63f6zjOfHA8RJYaNGoqUtTltscviAzDz7vocBKN",
      format: "json",
      by: "rank",
      interval: "day",
      restrict_begin: day,
      restrict_end: day,
      restrict_kind: "productivity",
    },
  });
  window.abortController = undefined;
  if (response.status !== 200) throw response;
  return response.data;
};
