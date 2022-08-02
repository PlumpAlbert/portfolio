import {createRouter, createWebHistory} from "vue-router";
import LoginView from "@/views/LoginView.vue";
import DayView from "@/views/DayView/index.vue";

export const routes = [
  {path: "/", component: LoginView, label: "home", icon: "home"},
  {
    path: "/day/:date",
    component: DayView,
    label: "statistics",
    icon: "bar_chart",
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
