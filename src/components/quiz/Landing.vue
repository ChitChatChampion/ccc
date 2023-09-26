<template>
  <div class="component-container">
    <div>
      <Stars />
    </div>
    <div v-if="!toggle" class="landing-wrapper">
      <div class="logo-container">
        <img src="@/assets/Kwizz.svg" alt="Kwizz logo" class="logo" />
      </div>
      <div class="player-input-wrapper">
        <input
          type="number"
          v-model="pin"
          placeholder="Kwizz! PIN"
          class="input-user"
        />
        <button @click="handleToggle" class="btn-enter">Enter</button>
      </div>
    </div>
    <div v-else class="landing-wrapper">
      <div class="logo-container">
        <img src="@/assets/Kwizz.svg" alt="Kwizz logo" class="logo" />
      </div>
      <div>
        <input
          type="text"
          v-model="nickname"
          placeholder="Nickname"
          class="input-user"
        />
        <router-link to="/player">
          <button @click="handleGo" class="btn-enter">OK, go!</button>
        </router-link>
      </div>
    </div>
    <div class="logo-host">
      <img src="@/assets/Kwizzard--test-pixel.svg" alt="" class="kwizzard" />
      <div class="btn-host">
        <a id="atag" href="http://localhost:3030/auth">HOST</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Stars from '../animations/Stars.vue';

export default {
  components: {
    Stars,
  },
  data() {
    return {
      pin: '',
      nickname: '',
      toggle: false,
    };
  },
  methods: {
    ...mapActions(['handleNickname', 'selectedPin']),
    handleToggle() {
      this.selectedPin(this.pin);
      this.toggle = true;
    },
    handleGo() {
      this.handleNickname(this.nickname);
    },
  },
};
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
