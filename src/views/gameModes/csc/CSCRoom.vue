<!-- /csc/:id -->

<template>
  <div class="h-screen bg-gradient-to-b from-jr-light via-jr to-jr-dark z-0">
    <!-- Navbar -->
    <div class="flex gap-3 px-5 pt-10">
      <NavBarBackOnly backLink="/csc" />
      <ProgressBar :value="percentage" background="jr" foreground="jr-v-light" class="my-auto" />
    </div>

    <!-- Text and Room ID -->
    <section id="padded" class="flex flex-col mx-5 px-5 gap-2 mt-8">
      <span class="text-2xl text-light font-bold">Conversation Starter Cards</span>
      <div class="flex gap-2 text-light">
        <span>Room ID:</span>
        <span class="font-bold">{{ this.$route.params.id }}</span>
        <button class="ml-2" @click="copyToClipboard">
          <v-icon><font-awesome-icon icon="fa-regular fa-clipboard" /></v-icon>
        </button>
      </div>
    </section>

    <!-- Card Slides -->
    <carousel ref="myCarousel" :items-to-show="1.3" model-value="1" class="mt-16" v-model="currentSlide">
      <slide key="$start$"></slide>
      <slide v-for="card in cards" :key="card">
        <div class="bg-light w-full text-left p-8 h-[22rem] rounded-3xl text-jr-dark text-[20px] font-medium">
          {{ card.text }}
        </div>
      </slide>
      <slide key="$end$"></slide>
    </carousel>

    <!-- Bottom Navigation -->
    <div class="fixed bottom-0 w-full flex justify-between px-10 pb-9 text-light">
      <button @click="prev" :class="currentSlide <= 1 ? 'opacity-0' : 'block'" :disabled="currentSlide <= 1">
        <v-icon><font-awesome-icon icon="fa-solid fa-chevron-left" /></v-icon>
      </button>
      <span>{{ slideNumber }} / {{ cards.length }}</span>
      <button @click="next" :class="currentSlide >= cards.length ? 'opacity-0' : 'block'"
        :disabled="currentSlide >= cards.length">
        <v-icon><font-awesome-icon icon="fa-solid fa-chevron-right" /></v-icon>
      </button>
    </div>
  </div>
</template>

<script>
import NavBarBackOnly from "@/components/NavBarBackOnly.vue"
import useClipboard from "vue-clipboard3"
import ProgressBar from '@/components/ProgressBar.vue';
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide } from 'vue3-carousel'
import { getUrl } from '@/services';
import { gameModeDict } from '../gameModes';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: 'CSCRoom',
  data() {
    return {
      cardIndex: 0,
      cards: [],
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
    },
    percentage() {
      return (this.slideNumber - 1) / (this.cards.length - 1) * 100;
    }
  },
  components: {
    NavBarBackOnly,
    Carousel,
    Slide,
    FontAwesomeIcon,
    ProgressBar,
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