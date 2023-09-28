<template>
  <button
    class="bg-ne-light text-light aspect-square p-2 border-4"
    :class="{ 'border-ew': hasSubmitted && isCorrect, 'border-cc': !hasSubmitted, 'border-ns': hasSubmitted && !isCorrect }"
    @click="showPopup">
    <h1 class="font-bold">{{ title }}</h1>
    <p v-if="isPlayer">Guess: {{ guess }}</p>
    <p>
      <span v-if="hasSubmitted && !isCorrect" class="text-ns font-bold">Wrong!</span>
      <span v-else-if="hasSubmitted && isCorrect" class="text-ew font-bold">Correct!</span>
    </p>
  </button>
</template>

<script>
export default {
  name: "BingoSquare",
  props: {
    name: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    allNames: {},
    index: {
      type: Number
    },
    isPlayer: {
      type: Boolean,
      required: true
    },
  },
  data() {
    return {
      guess: "??",
      isCorrect: false,
      hasSubmitted: false
    }
  },
  methods: {
    evaluate() {
      this.hasSubmitted = true;
      if (this.guess === this.name) {
        this.isCorrect = true;
        return 1;
      }
      return 0;
    },
    showPopup() {
      const options = {};
      for (let name of this.allNames) {
        options[name] = name;
      }

      if (!this.isPlayer) {
        this.$swal.fire("Oops...", "As the game host, you are not supposed to submit your answers here! Use another device if you want to play!", "info");
        return;
      }

      this.$swal.fire({
        title: this.title,
        text: this.description,
        input: 'select',
        inputOptions: options,
        inputPlaceholder: 'Who fits this description?',
        showCancelButton: true,
        confirmButtonText: "Confirm"
      }).then(result => {
        this.guess = result.value;
      });
    }
  }
}
</script>