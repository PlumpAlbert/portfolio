import { createRouter, createWebHistory } from "vue-router";
import DayView from "../views/DayView/index.vue";

export const routes = [
  { path: "/day/:date", component: DayView, label: "statistics", icon: "bar_chart" },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
