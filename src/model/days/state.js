/** @type {IState} */
export const state = {};

/**
 * @typedef {{[key: string]: DateAnalytics}} IState
 * @typedef {DateAnalyticsFetching<true> | (DateAnalyticsFetching<false> & IAnalytics)} DateAnalytics
 */
/**
 * @template {boolean} T
 * @typedef DateAnalyticsFetching
 * @property {string} date
 * Date in format YYYY-MM-DD
 * @property {T} isFetching
 * Tells if data is fetching
 */
/**@typedef IAnalytics
 * @property {object} data
 * @property {number} data.veryProductive
 * Number of seconds spent on Very Productive activities
 * @property {number} data.productive
 * Number of seconds spent on Productive activities
 * @property {number} data.neutral
 * Number of seconds spent on Neutral activities
 * @property {number} data.distracting
 * Number of seconds spent on Distracting activities
 * @property {number} data.veryDistracting
 * Number of seconds spent on Very Distracting activities
 */
