import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";

import VueFinalModalPlugin, { type VfmOptions } from "vue-final-modal";

import { placeholder } from "@common/placeholder";
import { contentKey, footerCoordinatesKey, squaresKey, projectsKey } from "@injection-keys";

const app = createApp(App);

app
  .provide(contentKey, {
    firstname: "Sava",
    lastname: "Znatnov",
    description: "creative designer\n currently based in Moscow",
  })
  .provide(footerCoordinatesKey, {
    coordinates: {
      north: {
        degrees: 55,
        minutes: 49,
      },
      east: {
        degrees: 37,
        minutes: 48,
      },
    },
    area: {
      city: "Moscow",
      distrinct: "Golyanovo",
    },
  })
  .provide(squaresKey, {
    backgroundSquares: [
      { color: "black", breakLinesBefore: 2 },
      { color: "#00b4d8", offset: 4 },
      { color: "#ffea00" },
      { color: "#f20089", offset: 8, breakLinesAfter: 2 },

      { color: "black" },
      { color: "#f20089", offset: 2 },
      { color: "#00b4d8" },
      { color: "#ffea00", offset: 2 },
      { color: "black", offset: 12, breakLinesAfter: 1 },

      { color: "black", offset: 2 },
      { color: "#00b4d8", offset: 4 },
      { color: "#ffea00" },
      { color: "#f20089", offset: 5, breakLinesAfter: 2 },
    ],
    footerSquares: [
      { color: "lightgray" },
      { color: "lightgray", offset: 7 },
      { color: "lightgray" },
      { color: "lightgray", offset: 5 },
      { color: "lightgray" },
      { color: "lightgray", offset: 3 },
      { color: "lightgray", offset: 4 },
      { color: "cornflowerblue", offset: 6 },
      { color: "darkslateblue" },
      { color: "mediumseagreen", offset: 5 },
      { color: "gold", offset: 2 },
      { color: "indigo" },
      { color: "darkorange", offset: 9 },
      { color: "lightgray", offset: 7 },
      { color: "black", offset: 2 },
      { color: "white" },
      { color: "lightgray", offset: 3 },
      { color: "lightgray", offset: 8 },
      { color: "lightgray" },
      { color: "lightgray", offset: 5 },
      { color: "lightgray" },
    ],
  })
  .provide(projectsKey, [
    {
      title: "VERY LONG NAMED PROJECT",
      description: placeholder,
      date: { year: 2021, quarters: [2] },
      images: [
        { source: "/src/assets/projects/mafia/1.png" },
        { source: "/src/assets/projects/mafia/2.jpg", primary: true },
        { source: "/src/assets/projects/mafia/main.jpg" },
      ],
      style: {
        color: "#564592",
      },
    },
    {
      title: "PROJECT BOMB",
      description: placeholder,
      date: { year: 2020, quarters: [1, 3] },
      images: [
        { source: "/src/assets/projects/mafia/1.png" },
        { source: "/src/assets/projects/mafia/2.jpg" },
        { source: "/src/assets/projects/mafia/main.jpg", primary: true },
      ],
      style: {
        color: "#FC6A03",
        primary: true,
      },
    },
    {
      title: "PROJECT SOME BOMB DA BABEPIZZA",
      description: placeholder,
      date: { year: 2021, quarters: [3, 4] },
      images: [
        { source: "/src/assets/projects/mafia/1.png", primary: true },
        { source: "/src/assets/projects/mafia/2.jpg" },
        { source: "/src/assets/projects/mafia/main.jpg" },
      ],
      style: {
        color: "#FCAE1E",
      },
    },
  ]);

// reactive providers
app.config.unwrapInjectedRef = true;

app.use(router);
app.use(VueFinalModalPlugin, {
  key: "$vfm",
  componentName: "VueFinalModal",
  dynamicContainerName: "ModalsContainer",
} as VfmOptions);

app.mount("#app");
