import { createRouter, createWebHistory } from "vue-router";
import LandingView from './views/Landing';
import NotFoundView from './views/NotFound';

const routes = [
  { path: '/', component: LandingView },
  { path: '/:pathMatch(.*)*', component: NotFoundView }
];

const router = createRouter({
  routes,
  history: createWebHistory('')
});

export default router;