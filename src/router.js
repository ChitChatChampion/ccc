import { createRouter, createWebHistory } from "vue-router";
// import LandingView from './views/Landing';
import LandingGuestView from "./views/LandingGuest.vue"
import NotFoundView from './views/NotFound';
import { gameModeList } from "./views/gameModes/gameModes";

const routes = [
  { path: '/', component: LandingGuestView },
  ...gameModeList.map(gm => ({ path: `/${gm.abbreviation}`, component: gm.view })),
  ...gameModeList.map(gm => ({ path: `/${gm.abbreviation}/:id`, component: gm.room })),
  { path: '/:pathMatch(.*)*', component: NotFoundView }
];

const router = createRouter({
  routes,
  history: createWebHistory('')
});

export default router;