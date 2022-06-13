import { createRouter, createWebHashHistory, type RouteRecordRaw } from "vue-router";

import AppMain from "@views/AppMain.vue";
import AppProjects from "@views/AppProjects.vue";
import AppContacts from "@views/AppContacts.vue";
import NotFound from "@views/NotFound.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Main",
    component: AppMain,
    meta: { order: 0, transition: "scale-center", title: "Eduard Metelkin" },
  },
  {
    path: "/projects",
    name: "Projects",
    component: AppProjects,
    meta: { order: 1, transition: "scale-center", title: "Projects" },
  },
  {
    path: "/about",
    name: "Contacts",
    component: AppContacts,
    meta: { order: 2, transition: "scale-center", title: "Contacts & About" },
    // TODO: normalize per-route transition (corners)
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
    meta: { order: 0, transition: "scale-center", title: "Not found" },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

// used to normalize per route transitions
router.beforeEach((to, from, next) => {
  to.meta.order > from.meta.order
    ? (to.meta.transition = "scale-bottom-right")
    : (to.meta.transition = "scale-bottom-left");
  next();
});

export default router;
