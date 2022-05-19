import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

import AppMain from "@views/AppMain.vue";
import AppProjects from "@views/AppProjects.vue";
import NotFound from "@views/NotFound.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Main",
    component: AppMain,
    meta: { transition: "scale-bottom-right" },
  },
  {
    path: "/projects",
    name: "Projects",
    component: AppProjects,
    meta: { transition: "scale-bottom-left" },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
    meta: { transition: "scale-center" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
