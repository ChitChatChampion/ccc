import { createRouter, createWebHistory } from "vue-router";
import { gameModeList } from "./views/gameModes/gameModes";

const routes = [
  {
    path: '/',
    component: () => import("./views/LandingPage.vue")
  },
  {
    path: '/browse',
    component: () => import('./views/Browse.vue')
  },
  {
    path: '/play',
    component: () => import('./views/GameLanding.vue')
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
    component: () => import('./views/NotFound')
  }
];

const router = createRouter({
  routes,
  history: createWebHistory('')
});

export default router;