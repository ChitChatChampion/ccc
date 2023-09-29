import { defineStore } from "pinia";

// Define the store
export const useGameStateStore = defineStore({
  id: "gameState",
  state: () => ({
    gameState: "NOT_SUBMITTED", // NOT_SUBMITTED, SUBMITTED, STARTED
  }),
  getters: {
    getGameState() {
      return this.gameState;
    },
  },
  actions: {
    setGameState(state) {
      this.gameState = state;
    },
  },
});
