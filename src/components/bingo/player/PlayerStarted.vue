<template>
  <div class="w-full">
    <div class="absolute w-full z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-2">
      <NavBar backLink="/bingo" text="Social Bingo"/>
      <div class="p-4">
        <h1 class="w-full max-w-3xl mx-auto text-light text-3xl font-bold mb-2">How to play</h1>
        <p class="w-full max-w-3xl mx-auto text-light">Each tile in the bingo board contains the description of a particular player. Your goal is to go around and figure out who that player is! Note that sometimes, there are descriptions that can apply to several players. However, based on what your responses were for the form, there is only one perfect answer!</p>
      </div>
      <BingoBoard ref="board" :isPlayer="true"/>
      <div class="w-full max-w-3xl mx-auto p-4">
        <div class="w-full max-w-xs text-light">
          Name: <span class="font-bold text-xl text-cc">{{ player_name }}</span>
        </div>
      </div>
      <div class="flex flex-row items-center justify-between px-4 pb-4 max-w-3xl mx-auto">
        <div class="text-light">Score: <span class="text-cc font-bold text-xl">{{ score }}<span v-if="total_score">/{{ total_score }}</span></span></div>
        <div class="text-light">Remaining Attempts: <span class="text-cc font-bold text-xl">{{ attempts }}</span></div>
        <OrangeButton text="Submit Guesses" :onClick="submit"/>
      </div>
    </div>
  </div>

  <div class="background-circle-bingo bg-ne-v-light"></div>
  <div class="background-diamond-bingo bg-ne-v-light"></div>
</template>

<script>
import BingoBoard from '../board/BingoBoard.vue';
import OrangeButton from "@/components/buttons/OrangeButton";
import { getUrl } from "@/services";
import axios from 'axios';
import NavBar from "@/components/NavBar.vue";

export default {
  name: "PlayerStarted",
  components: { BingoBoard, OrangeButton, NavBar },
  data() {
    return {
      attempts: 5,
      score: 0,
      total_score: 0,
      player_name: localStorage.getItem("player_name") || ""
    }
  },
  mounted() {
    const roomId = this.$route.params.id;
    const attemptsDict = JSON.parse(localStorage.getItem("attempts")) || {};
    const attempts = attemptsDict[roomId];
    this.attempts = attempts === undefined ? 5 : attempts;
  },
  methods: {
    submit() {
      if (this.attempts <= 0) {
        this.$swal.fire("Oops...", "You have no more attempts left!", "error");
        this.attempts = 0;
        return;
      }

      this.$swal.fire({
        title: "Are you sure?",
        text: `You have ${this.attempts} attempt${this.attempts === 1 ? '' : 's'} remaining.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#009645',
        cancelButtonColor: '#D42E12',
        confirmButtonText: "Yes, I'm sure!"
      }).then(result => {
        if (result.isConfirmed) {
          this.sendPayload();
        }
      });
    },
    sendPayload() {
      this.$swal.fire({
        title: "Submitting Guesses...",
        didOpen: () => {
          this.$swal.showLoading();
        }
      });
      const name = this.$refs.name.value;
      if (!name) {
        this.$swal.fire("Oops...", "Please add a valid name!", "error");
      }

      const score = this.$refs.board.evaluate();
      this.score = score;
      const total_score = this.$refs.board.getTotal();
      this.total_score = total_score;
      const timestamp = Date.now();

      const payload = { name, score, total_score, timestamp };

      const roomId = this.$route.params.id;
      const url = getUrl(`bingo/${roomId}/submit`);
      axios.post(url, payload, {})
        .then(response => {
          switch (response.status) {
            case 200:
            case 201:
              return response.data;
            default:
              throw new Error("Bad method!");
          }
        })
        .then(() => {
          const attempts = JSON.parse(localStorage.getItem("attempts")) || {};
          attempts[roomId] = this.attempts - 1;
          localStorage.setItem("attempts", JSON.stringify(attempts));
          this.attempts -= 1;
          this.$swal.close();
        })
        .catch(err => {
          console.log(err);
          this.$swal.fire("Oops...", "There was something wrong when submitting your guesses!", "error");
        })
    }
  }
}
</script>

<style scoped>
.background-circle-bingo {
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

.background-diamond-bingo {
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