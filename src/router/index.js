import {createRouter, createWebHistory} from "vue-router";
import formatISO from "date-fns/formatISO";
import LoginView from "@/views/LoginView.vue";
import DayView from "@/views/DayView/index.vue";
import MonthView from "@/views/MonthView/index.vue";

const today = formatISO(new Date(), {representation: "date"});

export const routes = [
  {path: "/", component: LoginView, label: "home", icon: "home"},
  {
    path: "/day/:date",
    default: "/day/" + today,
    component: DayView,
    label: "statistics",
    icon: "bar_chart",
  },
  {
    path: "/month/:month",
    default: "/month/" + today.split("-").slice(0, 2).join("-"),
    component: MonthView,
    label: "month stats",
    icon: "bar_chart",
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
