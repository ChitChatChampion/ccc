<!-- /csc/:id -->

<template>
  <h1>Conversation Starter Cards</h1>
  Room ID: {{ this.$route.params.id }}<br/>
  {{ instructions }}
  <button v-if="cardIndex > 0" @click="cardIndex--">Previous</button>
  <button v-if="cardIndex < cards.length - 1" @click="cardIndex++">Next</button>
  <button @click="shuffle">Shuffle</button>
  Card {{ cardIndex+1 }}: <div v-if="cards[cardIndex]">{{ cards[cardIndex]['text'] }}</div>
</template>

<script>
import { getUrl } from '@/services';
import { gameModeDict } from '../gameModes';

export default {
  name: 'CSCRoom',
  data() {
    return {
      cardIndex: 0,
      cards: [],
      instructions: gameModeDict.csc.instructions
    }
  },
  created() {
    const roomId = this.$route.params.id;
    const url = getUrl(`csc/${roomId}`);
    fetch(url)
      .then(response => {
        switch (response.status) {
          case 200:
            return response.json()
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