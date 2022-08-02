import useApi from "../utils/hooks/useApi";
const API_URL = "https://cors.plumpalbert.xyz/www.rescuetime.com/anapi";

/**
 *
 * @param {object} params
 * @param {string} params.dateStart
 * @param {string} params.dateEnd
 */
export const getDayAnalytics = ({apiKey, dateStart, dateEnd}) => {
  const {response, request, abort, isFetching} = useApi(`${API_URL}/data`, {
    method: "GET",
    params: {
      key: apiKey,
      format: "json",
      by: "rank",
      interval: "day",
      restrict_begin: dateStart,
      restrict_end: dateEnd,
      restrict_kind: "productivity",
    },
  });
  request();
  return {response, isFetching, abort};
};
