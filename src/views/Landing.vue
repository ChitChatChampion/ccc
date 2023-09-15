<template>
  Landing
  Game Modes:
  <li v-for="gameMode in gameModes" :key="gameMode.abbreviation">
    <GameModePreview :name="gameMode.name" :abbreviation="gameMode.abbreviation"/>
  </li>
</template>

<script>
import GameModePreview from '@/components/GameModePreview';

export default {
  name: 'LandingView',
  data() {
    return {
      gameModes: [
        { name: 'Conversation Starter Cards', abbreviation: 'csc' },
      ]
    }
  },
  components: {
    GameModePreview
  }
}
</script>