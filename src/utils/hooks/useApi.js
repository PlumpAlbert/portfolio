import axios from "axios";
import {ref} from "vue";

/**
 * Custom hook to use API calls
 *
 * @template {any} T
 * @param {string} uri URL to fetch
 * @param {Omit<import("axios").AxiosRequestConfig<any>, 'signal'|'url'>} options
 * @returns {UseApiReturnType<T>}
 */
export default function (uri, options) {
  const response = ref();
  const isFetching = ref(false);
  const abortController = new AbortController();
  const request = async () => {
    isFetching.value = true;
    const result = await axios({
      ...options,
      url: uri,
      signal: abortController.signal,
    });
    if (result.status !== 200) {
      isFetching.value = false;
      throw result;
    }
    response.value = result.data;
    isFetching.value = false;
  };
  return {response, request, isFetching, abort: abortController.abort};
}
/** @template T
 * @typedef UseApiReturnType
 * @property {import('vue').Ref<T>} response
 * Object which will contain server's response
 * @property {import('vue').Ref<boolean>} isFetching
 * Boolean value which represents current state of request
 * @property {AbortController['abort']} abort
 * Method for aborting pending request
 * @property {() => Promise<void>} request
 * Method to trigger API request
 */
