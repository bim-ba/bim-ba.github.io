import { defineStore } from "pinia";

/** used when user is dragging any square (to paint the body background) */
export const useAnySquareStore = defineStore({
  id: "anySquare",
  state: () => ({ dragging: false, color: "#000000" }),
});
