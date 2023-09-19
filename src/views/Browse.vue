<!-- /browse -->

<template>
  <div class="h-screen bg-dt">
    <NavBar backLink="/" text="Chit Chat Champion"/>
    <section id='browse-game-modes' class="px-10 py-10 rounded-t-3xl bg-lrt-background h-5/6">
      <h1 class="font-bold text-3xl text-dt pb-10">Game Modes</h1>
      <ul id="game-modes" class="grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
        <li v-for="gameMode in gameModes" :key="gameMode.key">
          <GameModePreview v-bind="gameMode"/>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import { gameModeList } from './gameModes/gameModes';
import GameModePreview from '@/components/GameModePreview.vue';

export default {
  name: 'BrowseView',
  data() {
    return {
      gameModes: gameModeList
    }
  },
  components: {
    NavBar,
    GameModePreview,
}
}
</script>