import axios from "axios";
const API_URL = "https://cors.plumpalbert.xyz/www.rescuetime.com/anapi";

export const fetchDateAnalytics = async ({apiKey, date}) => {
  if (!apiKey) {
    throw "API key must be provided!";
  }
  if (!date) {
    throw "Date must be provided!";
  }
  const response = await axios.get(`${API_URL}/data`, {
    params: {
      key: apiKey,
      format: "json",
      by: "rank",
      interval: "day",
      restrict_begin: date,
      restrict_end: date,
      restrict_kind: "productivity",
    },
  });
  if (response.status !== 200) throw response;
  return response.data;
};
