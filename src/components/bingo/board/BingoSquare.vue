<template>
  <button
    class="bg-ne-light text-light aspect-square p-2"
    @click="showPopup">
    <h1 class="bold">{{ title }}</h1>
    {{ guess }}
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
    }
  },
  data() {
    return {
      guess: ""
    }
  },
  methods: {
    evaluate() {
      if (this.guess === this.name) {
        return 1;
      }
      return 0;
    },
    showPopup() {
      const options = {};
      for (let name of this.allNames) {
        options[name] = name;
      }

      if (!this.isPlayer) return;

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