<template>
  <h1>Landing</h1>
  Game Modes:
  <li v-for="gameMode in gameModes" :key="gameMode.abbreviation">
    <GameModePreview :name="gameMode.name" :abbreviation="gameMode.abbreviation"/>
  </li>
</template>

<script>
import GameModePreview from '@/components/GameModePreview';
import { gameModeList } from './gameModes/gameModes';

export default {
  name: 'LandingView',
  data() {
    return {
      gameModes: gameModeList
    }
  },
  components: {
    GameModePreview
  }
}
</script>