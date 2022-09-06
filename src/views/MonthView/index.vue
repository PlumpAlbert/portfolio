<script setup>
// vue
import {computed, watch, ref} from "vue";
import {useRouter, useRoute} from "vue-router";
//
import {lastDayOfMonth, format, parse, isSameMonth, addMonths} from "date-fns";
import {getDayAnalytics} from "../../services";
import {useApiKeyStore} from "../../store/apiKey";

const router = useRouter();
const route = useRoute();
const apiKeyStore = useApiKeyStore();
const monthString = computed(() => route.params.month);

//#region Data fetching
const statsResponse = ref({response: undefined});
watch(monthString, newMonth => {
  const date = parse(newMonth, "yyyy-MM", new Date());
  statsResponse.value = getDayAnalytics({
    apiKey: apiKeyStore.apiKey,
    dateStart: `${newMonth}-01`,
    dateEnd: `${newMonth}-${lastDayOfMonth(date).getDate()}`,
  });
});
//#endregion

//#region Computed properties
const currentMonth = computed(() =>
  parse(monthString.value, "yyyy-MM", new Date())
);
const disableNextButton = computed(() =>
  isSameMonth(currentMonth.value, new Date())
);
//#endregion

const dateChange = e => {
  const type = e.currentTarget.name;
  let newDate = undefined;
  switch (type) {
    case "next": {
      newDate = addMonths(currentMonth.value, 1);
      break;
    }
    case "prev": {
      newDate = addMonths(currentMonth.value, -1);
      break;
    }
    default:
      return;
  }
  router.push({path: "/month/" + format(newDate, "yyyy-MM")});
};
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
        {{ format(currentMonth, "LLLL yyyy") }}
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
      <i
        v-if="statsResponse.isFetching"
        class="material-symbols-rounded self-center animate-spin"
      >
        cached
      </i>
      <!-- <StatLine -->
      <!--   v-if="statsResponse.response && !statsResponse.isFetching" -->
      <!--   v-for="row in statsResponse.response.rows" -->
      <!--   :label="row.at(-1).toString()" -->
      <!--   :value="row[1]" -->
      <!-- /> -->
      <p
        v-if="
          (!statsResponse.response ||
            (statsResponse.response && !statsResponse.response.rows.length)) &&
          !statsResponse.isFetching
        "
        class="self-center m-0 text-base"
      >
        No stats for this day!
      </p>
    </section>
  </main>
</template>
