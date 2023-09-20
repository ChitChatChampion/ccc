<!-- /csc/:id -->

<template>
  <div class="h-screen bg-gradient-to-b from-jr-light via-jr to-jr-dark z-0">
    <NavBar backLink="/csc" text="Conversation Starter Cards" />
    <section id="padded" class="flex flex-col mx-9 px-5 gap-5">
      <div class="flex gap-2 text-light">
        <span>Room ID:</span>
        <span class="font-bold">{{ this.$route.params.id }}</span>
      </div>
      <button v-if="cardIndex > 0" @click="cardIndex--">Previous</button>
      <button v-if="cardIndex < cards.length - 1" @click="next">Next</button>
      <button @click="shuffle">Shuffle</button>
      Card {{ cardIndex + 1 }}: <div v-if="cards[cardIndex]">{{ cards[cardIndex]['text'] }}</div>
    </section>

    <carousel ref="myCarousel" :items-to-show="1.3">
      <slide :key="1">
        <div></div>
      </slide>
      <slide v-for="card in cards" :key="card">
        <div class="bg-light w-full text-left p-8 h-[22rem] rounded-3xl text-jr-dark text-[20px] font-medium">
          {{ card.text }}
        </div>
      </slide>
    </carousel>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue"
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide } from 'vue3-carousel'
import { getUrl } from '@/services';
import { gameModeDict } from '../gameModes';

export default {
  name: 'CSCRoom',
  data() {
    return {
      cardIndex: 0,
      cards: [
        "Tell me about yourself",
        "What is your favorite programming language",
      ],
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
    },
    next() {
      this.$refs.myCarousel.next();
    },
    prev() {
      this.$refs.myCarousel.prev();
    }
  },
  components: {
    NavBar,
    Carousel,
    Slide,
  }
}
</script>


<style scoped>
.carousel__slide {
  padding: 5px;
}

.carousel__viewport {
  perspective: 2000px;
}

.carousel__track {
  transform-style: preserve-3d;
}

.carousel__slide--sliding {
  transition: 0.5s;
}

.carousel__slide {
  opacity: 0.5;
  transform: rotateY(-20deg) scale(0.9);
}

.carousel__slide--active~.carousel__slide {
  transform: rotateY(20deg) scale(0.9);
}

.carousel__slide--prev {
  opacity: 0.5;
  transform: rotateY(-10deg) scale(0.9);
}

.carousel__slide--next {
  opacity: 0.5;
  transform: rotateY(10deg) scale(0.95);
}

.carousel__slide--active {
  opacity: 1;
  transform: rotateY(0) scale(1);
}
</style>
Custom Navig