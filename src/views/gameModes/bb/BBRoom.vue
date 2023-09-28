<!-- /bb/:id -->

<template>
  <div class="fixed h-screen bg-gradient-to-b from-ns-light via-ns to-ns-dark w-full bg-ns -z-1"></div>
  <div class="min-h-screen">
    <div class="absolute w-full h-screen z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-2">
  <!-- <div class="h-screen bg-gradient-to-b from-ns-light via-ns to-ns-dark z-0"> -->
      <div class="flex gap-3 px-5 pt-10">
        <NavBarBackOnly backLink="/bb" />
        <ProgressBar :value="percentage" background="ns" foreground="ns-v-light" class="my-auto" />
      </div>

      <!-- Text and Room ID -->
      <section id="padded" class="flex flex-col mx-5 px-5 gap-2 mt-8">
        <h3 class="text-2xl text-light font-bold">Burning Bridges</h3>
        <div class="flex gap-2 text-light">
          <span>Room ID:</span>
          <span class="font-bold">{{ this.$route.params.id }}</span>
          <button class="ml-2" @click="copyToClipboard">
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path fill="#FFF" d="M280 64h40c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128C0 92.7 28.7 64 64 64h40 9.6C121 27.5 153.3 0 192 0s71 27.5 78.4 64H280zM64 112c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16H320c8.8 0 16-7.2 16-16V128c0-8.8-7.2-16-16-16H304v24c0 13.3-10.7 24-24 24H192 104c-13.3 0-24-10.7-24-24V112H64zm128-8a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"/></svg>
          </button>
        </div>

        <!-- Game: Terminated State -->
        <div v-if="gameState == GAME_STATES.TERMINATED" class="mt-16">
          <div class="w-full text-left px-4 py-8 h-[22rem] rounded-3xl text-light text-[20px] font-medium">
            <span>Game completed. Play again?</span>
          </div>
        </div>

        <!-- Game: Running State -->
        <div v-else>

          <!-- Player: First Player State -->
          <div v-if="playerState == PLAYER_STATES.FIRST_PLAYER_READY" class="mt-16">
            <div class="w-full text-3xl font-bold px-4 py-8 h-[22rem] rounded-3xl text-light mx-auto max-w-md text-center grid place-content-center">
              <span>Please pass the device to the first player</span>
            </div>
          </div>

          <!-- Player: Next player Ready State -->
          <div v-if="playerState == PLAYER_STATES.NEXT_PLAYER_READY" class="mt-16">
            <div class="w-full text-3xl font-bold px-4 py-8 h-[22rem] rounded-3xl text-light mx-auto max-w-md text-center grid place-content-center">
              <span>Please pass the device to the next player</span>
            </div>
          </div>

          <!-- Player: Running State -->
          <div v-if="playerState == PLAYER_STATES.PLAYING" class="mt-16">
            <VueFlip v-model="isCardFlipped">
              <template v-slot:front>
                <div class="bg-light w-full text-center p-8 h-[22rem] rounded-3xl text-ns text-3xl font-medium drop-shadow-xl place-content-center grid max-w-xl mx-auto"
                  @click="flipCard">
                  <h2 class="font-bold">Player {{ cardIndex + 1 }}:</h2>
                  <span>Press to reveal card</span>
                </div>
              </template>
              <template v-slot:back>
                <div class="bg-light w-full text-center p-8 h-[22rem] rounded-3xl text-ns text-3xl font-medium drop-shadow-xl place-content-center grid max-w-xl mx-auto"
                  @click="flipCard">
                  <span>{{ cards[cardIndex].content }}</span>
                </div>
              </template>
            </VueFlip>
          </div>
        </div>
      </section>

      <!-- Bottom Buttons -->
      <div class="fixed bottom-0 w-full flex justify-between px-10 pb-9 text-light">
        <OrangeButton v-if="gameState == GAME_STATES.TERMINATED" :onClick="restartGame" text="Play Again" class="w-full max-w-sm mx-auto" />
        <OrangeButton v-if="playerState == PLAYER_STATES.FIRST_PLAYER_READY" :onClick="showNextPlayerCard"
          text="I am the first player" class="w-full max-w-sm mx-auto" />
        <OrangeButton v-if="playerState == PLAYER_STATES.NEXT_PLAYER_READY" :onClick="showNextPlayerCard"
          text="I am the next player" class="w-full max-w-sm mx-auto" />
        <OrangeButton v-if="playerState == PLAYER_STATES.PLAYING && hasFlipped" :onClick="passToNextPlayer" text="I am done"
          class="w-full max-w-sm mx-auto" />
      </div>
    </div>
  </div>

  <!-- <h1>Burning Bridges</h1>
  <div v-if="gameState == GAME_STATES.READY">
    Room ID: {{ this.$route.params.id }}<br />
    {{ instructions }}
    <button @click="gameState = GAME_STATES.RUNNING">Start Game</button>
  </div>
  <div v-else>
    <h2 v-if="cardState == CARD_STATES.HIDDEN">Ready?</h2>
    <h2 v-if="cardState == CARD_STATES.VISIBLE"><em v-if="!!cards[cardIndex]">{{ cards[cardIndex].text }}</em></h2>
    <h2 v-if="cardState == CARD_STATES.TRANSITION">Pass the phone to the next person!</h2>
    <button v-if="cardState != CARD_STATES.TRANSITION" v-on:mousedown="cardState = CARD_STATES.VISIBLE"
      v-on:mouseup="cardState = CARD_STATES.HIDDEN">Reveal Card</button>
    <button v-if="cardState == CARD_STATES.HIDDEN"
      @click="cardIndex = (cardIndex + 1) % cards.length; cardState = CARD_STATES.TRANSITION">Next Person</button>
    <button v-if="cardState == CARD_STATES.TRANSITION" @click="cardState = CARD_STATES.HIDDEN">Ready?</button>
  </div> -->

  <div class="background-circle-bb bg-ns-v-light"></div>
  <div class="background-diamond-bb bg-ns-v-light"></div>
</template>

<script>
import { useMeta } from 'vue-meta';
import { getUrl } from '@/services';
import { gameModeDict } from '../gameModes';
import useClipboard from "vue-clipboard3"
import NavBarBackOnly from '@/components/NavBarBackOnly.vue';
import ProgressBar from '@/components/ProgressBar.vue';
import OrangeButton from '@/components/buttons/OrangeButton.vue';
import { VueFlip } from 'vue-flip';

export default {
  name: 'BBRoom',
  setup() {
    useMeta({
      title: 'Burning Bridges',
      description: "A single phone is passed around among players for their turns. They can press and hold a button to reveal the card's description secretly, then point to the person who fits the description and play scissors-paper-stone. If they lose, they must reveal the description to everyone. Afterward, they press the 'next person' button and pass the phone to the next player, continuing the game."
    })
  },
  data() {
    return {
      GAME_STATES: {
        READY: 0,
        RUNNING: 1,
        TERMINATED: 2,
      },
      PLAYER_STATES: {
        FIRST_PLAYER_READY: 0,
        NEXT_PLAYER_READY: 1,
        PLAYING: 2,
        ENDED: 3,
      },
      gameState: 0,
      playerState: 0,
      cardIndex: 0,
      cards: [],
      instructions: gameModeDict.bb.instructions,
      hasFlipped: false,
      isCardFlipped: false,
    }
  },
  created() {
    this.$swal.fire({
      title: "Retrieving Room Information...",
      didOpen: () => {
        this.$swal.showLoading();
      }
    });
    const roomId = this.$route.params.id;
    const url = getUrl(`room/${roomId}`);
    fetch(url)
      .then(response => {
        switch (response.status) {
          case 200:
          case 201:
            return response.json();
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
        this.cards = data.questions;
        this.$swal.close();
      })
  },
  methods: {
    shuffle() {
      this.cards = this.cards.sort(() => Math.random() - 0.5);
    },
    passToNextPlayer() {
      this.cardIndex++;
      if (this.cardIndex >= this.cards.length) {
        this.gameState = this.GAME_STATES.TERMINATED;
        this.playerState = this.PLAYER_STATES.ENDED;
      } else {
        this.playerState = this.PLAYER_STATES.NEXT_PLAYER_READY;
      }
    },
    showNextPlayerCard() {
      this.playerState = this.PLAYER_STATES.PLAYING;
      this.isCardFlipped = false;
      this.hasFlipped = false;
    },
    flipCard() {
      this.isCardFlipped = !this.isCardFlipped;
      this.hasFlipped = true;
    },
    restartGame() {
      this.gameState = this.GAME_STATES.RUNNING;
      this.playerState = this.PLAYER_STATES.FIRST_PLAYER_READY;
      this.cardIndex = 0;
    },
    copyToClipboard() {
      const { toClipboard } = useClipboard();
      try {
        toClipboard(this.$route.params.id);
        this.$swal.fire({
          toast: true,
          position: 'bottom',
          icon: 'success',
          title: 'Room ID Copied!',
          showConfirmButton: false,
          timer: 1500
        });
      } catch (e) {
        console.error(e);
      }
    }
  },
  computed: {
    percentage() {
      return (this.cardIndex / this.cards.length) * 100;
    }
  },
  components: {
    NavBarBackOnly,
    ProgressBar,
    OrangeButton,
    VueFlip
  }
}
</script>

<style scoped>
.cardBack {
  transform: perspective(1000px) rotateY(180deg);
}

.cardBack.flipped {
  transform: perspective(1000px) rotateY(0deg);
}

.cardFront {
  transform: perspective(1000px) rotateY(0deg);
}

.cardFront.flipped {
  transform: perspective(1000px) rotateY(-180deg);
}
</style>

<style scoped>
.background-circle-bb {
  position: absolute;
  top: 65%;
  left: 100%;
  transform: translate(-100%, -50%);
  width: 30vh;
  /* Adjust the size of the circle as needed */
  height: 60vh;
  /* The width and height should be equal for a circle */
  border-top-left-radius: 60vh;
  border-bottom-left-radius: 60vh;
  /* z-index: 0; */
  /* Place the circle behind other content */
  opacity: 20%;
}

.background-diamond-bb {
  position: absolute;
  top: 20%;
  left: 0%;
  transform: translate(-50%, -50%) rotate(45deg);
  width: 50vmax;
  /* Adjust the size of the circle as needed */
  height: 50vmax;
  /* The width and height should be equal for a circle */
  border-radius: 4rem;
  /* Creates a circle by setting border-radius to 50% */
  /* z-index: 0; */
  /* Place the circle behind other content */
  opacity: 20%;
}</style>