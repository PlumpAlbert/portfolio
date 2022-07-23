<script setup>
import {RouterLink, RouterView} from "vue-router";
import {routes} from "./router";
</script>

<template>
  <RouterView class="px-5 py-10" />

  <footer>
    <nav class="flex flex-row gap-4 text-sm ">
      <RouterLink
        v-for="route in routes"
        class="px-3 py-2 flex-1 flex flex-col gap-1 items-center rounded hover:bg-neutral-100/10"
        :to="route.path"
      >
        <i class="material-symbols-rounded">{{ route.icon }}</i>
        <span class="font-sans capitalize">{{ route.label }}</span>
      </RouterLink>
    </nav>
  </footer>
</template>
