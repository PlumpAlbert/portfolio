<script setup>
import {ref} from "vue";
import StatLine from "./StatLine.vue";

const date = ref(new Date());
const stats = [
  {label: "Very Productive", value: "3h 10m"},
  {label: "Productive", value: "13m 45s"},
  {label: "Neutral", value: "3m 18s"},
  {label: "Distracting", value: "0s"},
  {label: "Very Distracting", value: "5m 2s"},
];
</script>

<template>
  <main class="flex flex-col gap-16 pb-12">
    <div class="flex flex-row justify-between align-center">
      <button
        class="flex items-center justify-center p-2 rounded-full text-neutral-400 hover:bg-neutral-100/10"
      >
        <i class="material-symbols-rounded">chevron_left</i>
      </button>
      <h3
        class="text-xl font-semibold font-sans text-uppercase flex items-center"
      >
        {{ date.toLocaleDateString() }}
      </h3>
      <button
        class="flex items-center justify-center p-2 rounded-full text-neutral-400 hover:bg-neutral-100/10"
      >
        <i class="material-symbols-rounded">chevron_right</i>
      </button>
    </div>

    <div class="chart self-center w-[250px] h-[250px] bg-teal-900"></div>

    <section class="flex flex-col gap-5">
      <StatLine v-for="stat in stats" :label="stat.label" :value="stat.value" />
    </section>
  </main>
</template>
