import {defineStore} from "pinia";

export const useApiKeyStore = defineStore("apiKey", {
  state: () => ({apiKey: ""}),
  actions: {
    setApiKey(key) {
      this.apiKey = key;
    },
  },
  persist: {
    storage: localStorage,
    paths: ["apiKey"],
  },
});
