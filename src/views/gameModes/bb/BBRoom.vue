<!-- /bb/:id -->

<template>
  <h1>Burning Bridges</h1>
  <div v-if="gameState == GAME_STATES.READY">
    Room ID: {{ this.$route.params.id }}<br/>
    {{ instructions }}
    <button @click="gameState = GAME_STATES.RUNNING">Start Game</button>
  </div>
  <div v-else>
    <h2 v-if="cardState == CARD_STATES.HIDDEN">Ready?</h2>
    <h2 v-if="cardState == CARD_STATES.VISIBLE"><em v-if="!!cards[cardIndex]">{{ cards[cardIndex].text }}</em></h2>
    <h2 v-if="cardState == CARD_STATES.TRANSITION">Pass the phone to the next person!</h2>
    <button
      v-if="cardState != CARD_STATES.TRANSITION"
      v-on:mousedown="cardState = CARD_STATES.VISIBLE"
      v-on:mouseup="cardState = CARD_STATES.HIDDEN"
      >Reveal Card</button>
    <button
      v-if="cardState == CARD_STATES.HIDDEN"
      @click="cardIndex = (cardIndex+1) % cards.length; cardState = CARD_STATES.TRANSITION">Next Person</button>
    <button
      v-if="cardState == CARD_STATES.TRANSITION"
      @click="cardState = CARD_STATES.HIDDEN">Ready?</button>
  </div>
</template>

<script>
import { getUrl } from '@/services';
import { gameModeDict } from '../gameModes';

export default {
  name: 'BBRoom',
  data() {
    return {
      GAME_STATES: {
        READY: 0,
        RUNNING: 1
      },
      CARD_STATES: {
        HIDDEN: 0,
        VISIBLE: 1,
        TRANSITION: 2
      },
      gameState: 0,
      cardIndex: 0,
      cards: [],
      cardState: 0,
      instructions: gameModeDict.bb.instructions
    }
  },
  created() {
    const roomId = this.$route.params.id;
    const url = getUrl(`bb/${roomId}`);
    fetch(url)
      .then(response => {
        switch (response.status) {
          case 200:
            return response.data
          default:
            this.$router.push('.');
            this.$swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Room ID is not found!'
            });
        }
      })
      .then(data => {
        if (!data) return;
        this.cards = data.cards;
      })
  },
  methods: {
    shuffle() {
      this.cards = this.cards.sort(() => Math.random() - 0.5);
    }
  }
}
</script>