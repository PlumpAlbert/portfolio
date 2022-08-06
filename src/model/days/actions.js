const TIME_SPENT = 1;
const PRODUCTIVITY_ID = 3;
const PRODUCTIVITY_ENUM = {
  "-2": "veryDistracting",
  "-1": "distracting",
  0: "neutral",
  1: "productive",
  2: "veryProductive",
};
/**
 * @param {Context} context
 * @param {string} date
 */
export const getDateAnalytics = async ({state, actions, effects}, date) => {
  if (!state.days[date]) {
    state.days[date] = {date, isFetching: true};
  } else {
    state.days[date].isFetching = true;
  }
  const response = await effects.days.fetchDateAnalytics({
    apiKey: state.apiKey,
    date,
  });
  /** @type {import('./state').IAnalytics['data']} */
  let data = {
    veryProductive: 0,
    productive: 0,
    neutral: 0,
    distracting: 0,
    veryDistracting: 0,
  };
  response.rows.forEach(row => {
    data[PRODUCTIVITY_ENUM[row[PRODUCTIVITY_ID]]] = row[TIME_SPENT];
  });

  actions.days.setDateAnalytics({date, data});
};

/**
 * @param {Context} context
 * @param {object} value
 * @param {string} value.date
 * @param {import('./state').IAnalytics['data']} value.data
 */
export const setDateAnalytics = ({state}, {date, data}) => {
  if (!state.days[date]) {
    state.days[date] = {date, isFetching: false, data};
  } else {
    state.days[date].isFetching = false;
    state.days[date].data = data;
  }
};

/** @typedef {import('..').AppContext} Context */
