<script setup>
import { addDays, format, isSameDay, parse } from "date-fns";
// vue libraries
import { computed } from "@vue/reactivity";
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
// custom components
import StatLine from './StatLine.vue';
// custom imports
import { getDayAnalytics } from "../../api/index.js";

const router = useRouter();
const route = useRoute();

const date = computed(() => route.params.date);

//#region Data fetching

const statsResponse = ref({response: undefined});
watch(
  () => date.value,
  newDate =>{
    statsResponse.value = getDayAnalytics({ dateStart: newDate, dateEnd: newDate })
  }
);

//#endregion

//#region Computed properties

const currentDate = computed(() => parse(date.value, "yyyy-MM-dd", new Date()));
const disableNextButton = computed(() =>
  isSameDay(currentDate.value, new Date())
);

//#endregion

const dateChange = e => {
  const type = e.currentTarget.name;
  let newDate = undefined;
  switch (type) {
    case "next": {
      newDate = addDays(currentDate.value, 1);
      break;
    }
    case "prev": {
      newDate = addDays(currentDate.value, -1);
      break;
    }
    default:
      return;
  }
  router.push({ path: "/day/" + format(newDate, "yyyy-MM-dd") });
};
</script>

<template>
  <main class="flex flex-col gap-16 pb-12">
    <div class="flex flex-row justify-between align-center">
      <button class="flex items-center justify-center p-2 rounded-full text-neutral-400 hover:bg-neutral-100/10"
        name="prev" @click="dateChange">
        <i class="material-symbols-rounded">chevron_left</i>
      </button>
      <h3 class="text-xl font-semibold font-sans text-uppercase flex items-center">
        {{ currentDate.toLocaleDateString() }}
      </h3>
      <button
        class="flex items-center justify-center p-2 rounded-full text-neutral-400 hover:bg-neutral-100/10 disabled:hover:bg-transparent disabled:text-neutral-600"
        :disabled="disableNextButton" name="next" @click="dateChange">
        <i class="material-symbols-rounded">chevron_right</i>
      </button>
    </div>

    <div class="chart self-center w-[250px] h-[250px] bg-teal-900"></div>

    <section class="flex flex-col gap-5">
      <i v-if="statsResponse.isFetching" class="material-symbols-rounded self-center animate-spin">cached</i>
      <StatLine v-if="statsResponse.response && !statsResponse.isFetching" v-for="row in statsResponse.response.rows" :label="row.at(-1).toString()" :value="row[1]" />
      <p v-if="(!statsResponse.response || (statsResponse.response && !statsResponse.response.rows.length)) && !statsResponse.isFetching" class="self-center m-0 text-base">
        No stats for this day!
      </p>
    </section>
  </main>
</template>
