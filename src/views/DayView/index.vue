<script setup>
import { addDays, format, isSameDay, parse } from "date-fns";
// vue libraries
import { computed } from "@vue/reactivity";
import { useRouter, useRoute } from "vue-router";
// custom components
import StatLine from "./StatLine.vue";
// overmind
import { useState, useActions } from "../../utils/hooks/useOvermind";

const router = useRouter();
const route = useRoute();
const date = computed(() => route.params.date);

//#region Data fetching

const { value: analytics } = useState(state => state.days[date.value]);
const getDateAnalytics = useActions(actions => actions.days.getDateAnalytics);
if (!analytics || (!analytics.data && !analytics.isFetching)) {
  getDateAnalytics(date.value)
    .then(body => {
      console.log(body);
      debugger;
    })
    .catch(() => {
      router.replace({ path: "/" });
    });
}
//#endregion

//#region Computed properties

const JSDate = computed(() => parse(date.value, "yyyy-MM-dd", new Date()));
const disableNextButton = computed(() => isSameDay(JSDate.value, new Date()));

//#endregion

//#region Callbacks
const dateChange = e => {
  const type = e.currentTarget.name;
  let newDate = undefined;
  switch (type) {
    case "next": {
      newDate = addDays(JSDate.value, 1);
      break;
    }
    case "prev": {
      newDate = addDays(JSDate.value, -1);
      break;
    }
    default:
      return;
  }
  router.push({ path: "/day/" + format(newDate, "yyyy-MM-dd") });
};
//#endregion
</script>

<template>
  <main class="flex flex-col gap-16 pb-12">
    <div class="flex flex-row justify-between align-center">
      <button class="flex items-center justify-center p-2 rounded-full text-neutral-400 hover:bg-neutral-100/10"
        name="prev" @click="dateChange">
        <i class="material-symbols-rounded">chevron_left</i>
      </button>
      <h3 class="text-xl font-semibold font-sans text-uppercase flex items-center">
        {{ JSDate.toLocaleDateString() }}
      </h3>
      <button
        class="flex items-center justify-center p-2 rounded-full text-neutral-400 hover:bg-neutral-100/10 disabled:hover:bg-transparent disabled:text-neutral-600"
        :disabled="disableNextButton" name="next" @click="dateChange">
        <i class="material-symbols-rounded">chevron_right</i>
      </button>
    </div>

    <div class="chart self-center w-[250px] h-[250px] bg-teal-900"></div>

    <section v-if="analytics" class="flex flex-col gap-5">
      <i v-if="analytics.isFetching" class="material-symbols-rounded self-center animate-spin">cached</i>
      <StatLine v-if="analytics.data && !analytics.isFetching" v-for="key in Object.keys(analytics.data)" :label="key"
        :value="analytics.data[key]" />
      <p v-if="
        (!analytics.data ||
          (analytics.data &&
            Object.values(analytics.data).every(d => d === 0))) &&
        !analytics.isFetching
      " class="self-center m-0 text-base">
        No stats for this day!
      </p>
    </section>
  </main>
</template>
