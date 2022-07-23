import { createRouter, createWebHistory } from "vue-router";
import StatsView from "../views/StatsView/index.vue";

export const routes = [
  { path: "/", component: StatsView, label: "statistics", icon: "bar_chart" },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
