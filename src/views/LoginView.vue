<script setup>
import format from "date-fns/format";
import { watchEffect } from "vue";
import { useRouter } from "vue-router";
import { useApiKeyStore } from "../store/apiKey.js";

const router = useRouter();
const apiKeyStore = useApiKeyStore();

watchEffect(() => {
  if (apiKeyStore.apiKey) {
    router.push("/day/" + format(new Date(), "yyyy-MM-dd"));
  }
});

const handleFormSubmit = e => {
  e.preventDefault();
  const input = e.target["apiKey"];
  apiKeyStore.setApiKey(input.value);
  router.push("/day/" + format(new Date(), "yyyy-MM-dd"));
};
</script>

<template>
  <main class="flex flex-col gap-8 items-center">
    <h1 class="text-4xl uppercase text-white">RescueTime<br />Dashboard</h1>
    <form class="flex flex-col gap-4" action="" @submit="handleFormSubmit">
      <label for="apiKey" class="text-base">To see your progress enter your API key below:</label>
      <input id="apiKey" type="text"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
      <input type="submit" value="Go"
        class="uppercase font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" />
    </form>
  </main>
</template>
