import { createApp } from "vue";
import { createHead } from "@vueuse/head";
import { createPinia } from "pinia";

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

// reactive providers
app.config.unwrapInjectedRef = true;

// plugins
app.use(router);

app.use(createHead());
app.use(createPinia());

app.mount("#app");
