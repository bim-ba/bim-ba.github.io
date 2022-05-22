import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";

import VueFinalModalPlugin from "vue-final-modal";

import { contentKey, footerCoordinatesKey, squaresKey, projectsKey } from "@injection-keys";

import {
  content,
  projects,
  coordinates,
  footerSquares,
  backgroundSquares,
} from "@common/constructed-data";

const app = createApp(App);

app
  .provide(contentKey, content)
  .provide(footerCoordinatesKey, coordinates)
  .provide(squaresKey, {
    backgroundSquares: backgroundSquares,
    footerSquares: footerSquares,
  })
  .provide(projectsKey, projects);

// reactive providers
app.config.unwrapInjectedRef = true;

app.use(router);
app.use(VueFinalModalPlugin, {
  key: "$vfm",
  componentName: "VueFinalModal",
  dynamicContainerName: "ModalsContainer",
});

app.mount("#app");
