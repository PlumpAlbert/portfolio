<script setup>
import {ref} from "vue";
import addDate from "date-fns/add";
import isSameDay from "date-fns/isSameDay";
import StatLine from "./StatLine.vue";
import {getDayAnalytics} from "@/api";

const date = ref(new Date());
const stats = [
  {label: "Very Productive", value: "3h 10m"},
  {label: "Productive", value: "13m 45s"},
  {label: "Neutral", value: "3m 18s"},
  {label: "Distracting", value: "0s"},
  {label: "Very Distracting", value: "5m 2s"},
];

const data = ref();
const disableNextButton = ref(true);
const fetchingData = ref(false);

const updateData = () => {
  fetchingData.value = true;
  getDayAnalytics(date.value).then(d => {
    data.value = d;
    fetchingData.value = false;
  });
};

const dateChange = e => {
  const type = e.currentTarget.name;
  let action = undefined;
  switch (type) {
    case "prev": {
      action = {days: -1};
      break;
    }
    case "next": {
      action = {days: 1};
      break;
    }
    default:
      return;
  }
  date.value = addDate(date.value, action);
  if (window.abortController) window.abortController.abort();
  updateData();
  if (isSameDay(date.value, new Date())) {
    disableNextButton.value = true;
    return;
  } else if (disableNextButton.value) {
    disableNextButton.value = false;
  }
};

updateData();
</script>

<template>
  <main class="flex flex-col gap-16 pb-12">
    <div class="flex flex-row justify-between align-center">
      <button
        class="flex items-center justify-center p-2 rounded-full text-neutral-400 hover:bg-neutral-100/10"
        name="prev"
        @click="dateChange"
      >
        <i class="material-symbols-rounded">chevron_left</i>
      </button>
      <h3
        class="text-xl font-semibold font-sans text-uppercase flex items-center"
      >
        {{ date.toLocaleDateString() }}
      </h3>
      <button
        class="flex items-center justify-center p-2 rounded-full text-neutral-400 hover:bg-neutral-100/10 disabled:hover:bg-transparent disabled:text-neutral-600"
        :disabled="disableNextButton"
        name="next"
        @click="dateChange"
      >
        <i class="material-symbols-rounded">chevron_right</i>
      </button>
    </div>

    <div class="chart self-center w-[250px] h-[250px] bg-teal-900"></div>

    <section class="flex flex-col gap-5">
      <i v-if="fetchingData" class="material-symbols-rounded self-center animate-spin">cached</i>
      <StatLine v-if="data && !fetchingData" v-for="row in data.rows" :label="row.at(-1).toString()" :value="row[1]" />
      <p v-if="(!data || data && !data.rows.length) && !fetchingData" class="self-center m-0 text-base">
        No stats for this day!
      </p>
    </section>
  </main>
</template>
