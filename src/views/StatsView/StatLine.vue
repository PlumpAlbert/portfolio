<script setup>
import { ref } from "vue"

const props = defineProps({
  label: String,
  value: String,
});

let color = ref(`var(--${props.label.toLowerCase().replace(' ', '-')}-color)`);
</script>

<template>
  <p class="flex flex-row gap-2 items-baseline">
    <i class="w-2 h-2 rounded-full" :style="'background-color:' + color"></i>
    <span class="text-base font-medium"> {{ props.label }} </span>
    <hr class="flex-1 border-dashed border-neutral-100 opacity-40" />
    <span class="text-base font-sans font-normal">{{ props.value }}</span>
  </p>
</template>
