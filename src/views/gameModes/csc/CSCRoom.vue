<!-- /csc/:id -->

<template>
  <div class="h-screen bg-gradient-to-b from-jr to-jr-dark z-0">
    <NavBar backLink="/csc" text="Conversation Starter Cards" />
    <section id="padded" class="flex flex-col mx-9 px-5 gap-5">
      <div class="flex gap-2 text-light">
        <span>Room ID:</span>
        <span class="font-bold">{{ this.$route.params.id }}</span>
      </div>
    </section>

    <carousel ref="myCarousel" :items-to-show="1.3" model-value="1" class="mt-20" v-model="currentSlide">
      <slide key="$start$"></slide>
      <slide v-for="card in cards" :key="card">
        <div class="bg-light w-full text-left p-8 h-[22rem] rounded-3xl text-jr-dark text-[20px] font-medium">
          {{ card.text }}
        </div>
      </slide>
      <slide key="$end$"></slide>
    </carousel>

    <section id="padded" class="flex flex-col mx-9 px-5 gap-5">
      <span>{{ slideNumber }}</span>
      <button @click="prev">Previous</button>
      <button @click="next">Next</button>
    </section>
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
      instructions: gameModeDict.csc.instructions,
      currentSlide: 1,
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
  watch: {
    currentSlide: {
      handler() {
        if (this.currentSlide === 0) {
          this.$refs.myCarousel.slideTo(1);
        } else if (this.currentSlide === this.cards.length + 1) {
          this.$refs.myCarousel.slideTo(this.cards.length);
        }
      }
    }
  },
  computed: {
    slideNumber() {
      return this.currentSlide <= 0 ? 1 : this.currentSlide > this.cards.length ? this.cards.length : this.currentSlide;
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