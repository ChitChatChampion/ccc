<template>
  <div class="w-full min-h-screen">
    <div class="absolute w-full h-screen z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-2">
      <NavBar backLink="/bingo" text="Social Bingo"/>
      <PlayersComponent/>
      <div class="max-w-3xl mx-auto p-4">
        <OrangeButton
          class="me-5"
          text="Generate Bingo Board"
          :onClick="generate"/>
        <OrangeButton
          text="Start Game"
          :onClick="startGame"/>
      </div>
      <BingoBoard ref="board" :isPlayer="false"/>
    </div>
  </div>
  <div class="background-circle-bingo bg-ne-v-light"></div>
  <div class="background-diamond-bingo bg-ne-v-light"></div>
</template>

<script>
import axios from 'axios';
import BingoBoard from '../board/BingoBoard.vue';
import PlayersComponent from './PlayersComponent.vue';
import OrangeButton from "@/components/buttons/OrangeButton.vue";
import { getHeader, getUrl } from "@/services";
import NavBar from "@/components/NavBar.vue";

export default {
  name: "OwnerNotStarted",
  components: { BingoBoard, PlayersComponent, OrangeButton, NavBar },
  methods: {
    generate() {
      this.$swal.fire({
        title: "Generating Bingo Board...",
        didOpen: () => {
          this.$swal.showLoading();
        }
      });
      const roomId = this.$route.params.id;
      const url = getUrl(`bingo/${roomId}/generate`);
      const headers = getHeader();
      axios.post(url, {}, { headers })
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
          this.$swal.close();
          this.$refs.board.getSquares();
        })
        .catch(err => {
          console.log(err);
          this.$swal.fire("Oops...", "Error in generating your bingo board!", "error");
        })
    },
    startGame() {
      this.$swal.fire({
        title: "Starting Game...",
        didOpen: () => {
          this.$swal.showLoading();
        }
      });
      const roomId = this.$route.params.id;
      const headers = getHeader();
      const url = getUrl(`bingo/${roomId}/start`);
      axios.post(url, {}, { headers })
        .then(response => {
          switch (response.status) {
            case 200:
            case 201:
              return response;
            default:
              throw new Error("Bad method!");
          }
        })
        .then(() => {
          this.$swal.close();
          this.$router.push(`/bingo/${roomId}`);
        })
        .catch(err => {
          console.log(err);
          this.$swal.fire("Oops...", "Something went wrong when starting the game!", "error");
        });
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