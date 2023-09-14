import { createRouter, createWebHistory } from "vue-router";
import Dashboard from './views/Dashboard';
import Landing from './views/Landing';

const routes = [
  { path: '/', component: Dashboard },
  // { path: '/', component: Landing },
];

const router = createRouter({
  history: createWebHistory(''),
  routes,
});

export default router;