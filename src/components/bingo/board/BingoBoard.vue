<template>
  BingoBoard
  <ol class="grid gap-4 mx-auto">
    <BingoSquare
      v-for="(square, index) in squares"
      :name="square.name"
      :title="square.title"
      :description="square.description"
      :allNames="names"
      :index="index"
      :ref="square.name"
      :key="square.name"/>
  </ol>
</template>

<script>
import { getUrl } from "@/services";
import BingoSquare from "./BingoSquare.vue";

export default {
  name: "BingoBoard",
  mounted() {
    this.getSquares();
  },
  data() {
    return {
      squares: [],
      totalScore: 0,
      names: []
    };
  },
  components: { BingoSquare },
  methods: {
    evaluate() {
      let score = 0;
      for (let square of this.squares) {
        const name = square.name;
        score += this.$refs[name][0].evaluate();
      }
      return score;
    },
    getTotal() {
      return this.totalScore;
    },
    getSquares() {
      const roomId = this.$route.params.id;
      const url = getUrl(`/bingo/${roomId}/squares`);
      fetch(url)
        .then(response => {
        switch (response.status) {
          case 200:
          case 201:
            return response.json();
          default:
            throw new Error("Bad method!");
        }
      })
      .then(data => {
        console.log(data);
        this.squares = data.squares;
        // this.squares = [...this.squares, ...this.squares, ...this.squares, ...this.squares]
        this.totalScore = data.squares.length;
        this.names = data.squares.map(square => square.name);
      })
        .catch(err => {
        this.$swal.fire('Oops...', 'Something went wrong went retrieving your Bingo!', 'error');
        console.log(err);
      });
    }
  }
}
</script>