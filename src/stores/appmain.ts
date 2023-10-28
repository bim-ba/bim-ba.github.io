import { defineStore } from "pinia";

/** used to know when floppy timeline is ended or not */
export const useTimelineState = defineStore({
  id: "timelineState",
  state: () => ({ state: false }),
  actions: {
    update(state: boolean) {
      this.state = state;
    },
  },
});
