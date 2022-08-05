/**
 * Action for changing api key
 * @param {{state: IState}} context
 * @param {string} apiKey
 */
export const setApiKey = ({state}, apiKey) => {
  state.apiKey = apiKey;
};

/** @typedef {import('./state').IState} IState */
