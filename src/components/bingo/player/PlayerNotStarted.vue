<template>
  PlayerNotStarted
  <PlayerSubmitted v-if="hasSubmitted"/>
  <PlayerNotSubmitted v-else/>
</template>

<script>
import PlayerNotSubmitted from './PlayerNotSubmitted.vue';
import PlayerSubmitted from './PlayerSubmitted.vue';

export default {
  name: "PlayerNotStarted",
  props: {
    hasSubmitted: {
      type: Boolean,
    }
  },
  components: { PlayerSubmitted, PlayerNotSubmitted }
}
</script>