import { defineStore } from "pinia";

export const useAnySquareStore = defineStore({
  id: "anySquare",
  state: () => ({ dragging: false, color: "#000000" }),
});
