import {getAnalytics} from "../../api/data";

export const fetchDateAnalytics = async ({apiKey, date}) =>
  getAnalytics({apiKey, dateStart: date, dateEnd: date, interval: "day"});
