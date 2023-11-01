import { createApp } from "vue";
import { createHead } from "@vueuse/head";
import { GesturePlugin } from "@vueuse/gesture";

import App from "@/App.vue";
import router from "@/router";

import { utilKey, mainPageKey, projectsPageKey, contactsPageKey } from "@injection-keys";

import {
  utilData,
  mainPageData,
  projectsPageDate,
  contactsPageData,
} from "@common/constructed-data";

const app = createApp(App);

// global providings
app
  .provide(utilKey, utilData)
  .provide(mainPageKey, mainPageData)
  .provide(projectsPageKey, projectsPageDate)
  .provide(contactsPageKey, contactsPageData);

// plugins
app.use(router).use(createHead()).use(GesturePlugin);

app.mount("#app");
