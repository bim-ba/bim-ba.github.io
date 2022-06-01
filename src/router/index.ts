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
    meta: { transition: "scale-bottom-left", title: "Sava Znatnov" },
  },
  {
    path: "/projects",
    name: "Projects",
    component: AppProjects,
    meta: { transition: "scale-bottom-right", title: "Projects" },
  },
  {
    path: "/about",
    name: "Contacts",
    component: AppContacts,
    meta: { transition: "scale-bottom-right", title: "Contacts & About" },
    // TODO: normalize per-route transition (corners)
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

router.afterEach((to, from) => console.log(to, from));

export default router;
