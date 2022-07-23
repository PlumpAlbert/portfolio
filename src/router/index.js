import {createRouter, createWebHistory} from 'vue-router';
import StatsView from '../views/StatsView/index.vue';

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: StatsView }
  ]
})
