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
  actions.days.setDateAnalytics({
    date,
    data: await effects.days.fetchDateAnalytics({
      apiKey: state.apiKey,
      date,
    }),
  });
};

/**
 * @param {Context} context
 * @param {object} value
 * @param {string} value.date
 * @param {import('./state').IAnalytics['data']} value.data
 */
export const setDateAnalytics = ({state}, {date, data}) => {
  if (!state[date]) {
    state[date] = {date, isFetching: false, data};
  } else {
    state[date].isFetching = false;
    state[date].data = data;
  }
};

/** @typedef {import('..').AppContext} Context */
