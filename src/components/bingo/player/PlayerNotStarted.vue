<template>
  <PlayerSubmitted v-if="hasSubmitted"/>
  <PlayerNotSubmitted v-else/>
</template>

<script>
import PlayerNotSubmitted from './PlayerNotSubmitted.vue';
import PlayerSubmitted from './PlayerSubmitted.vue';
import { computed } from 'vue';
import { useGameStateStore } from '../../../store'; // Import the store

export default {
  name: "PlayerNotStarted",
  setup() {
    const gameStateStore = useGameStateStore(); // Use the store
    const hasSubmitted = computed(() => gameStateStore.getGameState === "SUBMITTED"); // Get the value from the store
    return { hasSubmitted };
  },
  components: { PlayerSubmitted, PlayerNotSubmitted }
}
</script>