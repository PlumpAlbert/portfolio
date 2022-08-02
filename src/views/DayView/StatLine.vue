<script setup>
import { ref } from "vue"
import intervalToDuration from "date-fns/intervalToDuration";

const LABELS = {
  2: 'Very productive',
  1: 'Productive',
  0: 'Neutral',
  '-1': 'Distracting',
  '-2': 'Very distracting',
}

const props = defineProps({
  label: String,
  value: Number,
});

const label = LABELS[props.label];

let color = ref(`var(--${label.toLowerCase().replace(' ', '-')}-color)`);

const duration = intervalToDuration({ start: 0, end: props.value * 1000 });

let time = '';
if (duration.hours > 0) {
  time = `${duration.hours} h ${duration.minutes} m`;
} else if (duration.minutes > 0) {
  time = `${duration.minutes} m ${duration.seconds} s`;
} else {
  time = `${duration.seconds} s`;
}
</script>

<template>
  <p class="flex flex-row gap-2 items-baseline">
    <i class="w-2 h-2 rounded-full" :style="'background-color:' + color"></i>
    <span class="text-base font-medium"> {{ label }} </span>
    <hr class="flex-1 border-dashed border-neutral-100 opacity-40" />
    <span class="text-base font-sans font-normal">
      {{ time }}
    </span>
  </p>
</template>
