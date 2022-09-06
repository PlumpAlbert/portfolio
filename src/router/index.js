import {createRouter, createWebHistory} from "vue-router";
import formatISO from "date-fns/formatISO";
import LoginView from "@/views/LoginView.vue";
import DayView from "@/views/DayView/index.vue";

export const routes = [
  {path: "/", component: LoginView, label: "home", icon: "home"},
  {
    path: "/day/:date",
    default: "/day/" + formatISO(new Date(), {representation: "date"}),
    component: DayView,
    label: "statistics",
    icon: "bar_chart",
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
