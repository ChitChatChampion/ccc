import { createRouter, createWebHistory } from "vue-router";
import LandingView from './views/Landing';
import NotFoundView from './views/NotFound';
import { gameModeList } from "./views/gameModes/gameModes";

const routes = [
  { path: '/', component: LandingView },
  ...gameModeList.map(gm => ({ path: '/' + gm.abbreviation, component: gm.view })),
  { path: '/:pathMatch(.*)*', component: NotFoundView }
];

const router = createRouter({
  routes,
  history: createWebHistory('')
});

export default router;