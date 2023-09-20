import { createRouter, createWebHistory } from "vue-router";
import LandingView from "./views/Landing.vue";
import BrowseView from './views/Browse.vue';
import NotFoundView from './views/NotFound';
import { gameModeList } from "./views/gameModes/gameModes";

const routes = [
  {
    path: '/',
    component: LandingView
  },
  {
    path: '/browse',
    component: BrowseView
  },
  ...gameModeList.map(gm => ({
    path: `/${gm.abbr}`,
    component: gm.landing
  })),
  ...gameModeList.map(gm => ({
    path: `/${gm.abbr}/create`,
    component: gm.create
  })),
  ...gameModeList.map(gm => ({
    path: `/${gm.abbr}/:id`,
    component: gm.room
  })),
  {
    path: '/:pathMatch(.*)*',
    component: NotFoundView
  }
];

const router = createRouter({
  routes,
  history: createWebHistory('')
});

export default router;