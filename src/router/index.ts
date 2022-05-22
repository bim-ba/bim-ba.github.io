import {
  createRouter,
  createWebHashHistory,
  type RouteLocationNormalized,
  type RouteRecordRaw,
} from "vue-router";

import AppMain from "@views/AppMain.vue";
import AppProjects from "@views/AppProjects.vue";
import NotFound from "@views/NotFound.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Main",
    component: AppMain,
    meta: { transition: "scale-bottom-right", title: "Sava Znatnov" },
  },
  {
    path: "/projects",
    name: "Projects",
    component: AppProjects,
    meta: { transition: "scale-bottom-left", title: "Projects" },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
    meta: { transition: "scale-center", title: "Not found" },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
router.afterEach((to: RouteLocationNormalized, from: RouteLocationNormalized) => {
  document.title = to.meta.title;
});

export default router;
