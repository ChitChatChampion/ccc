<template>
  OwnerNotStarted
  <BingoBoard ref="board"/>
  <PlayersComponent/>
  <OrangeButton
    text="Generate Bingo Board"
    :onClick="generate"/>
  <OrangeButton
    text="Start Game"
    :onClick="startGame"/>
</template>

<script>
import axios from 'axios';
import BingoBoard from '../board/BingoBoard.vue';
import PlayersComponent from './PlayersComponent.vue';
import OrangeButton from "@/components/buttons/OrangeButton.vue";
import { getHeader, getUrl } from "@/services";

export default {
  name: "OwnerNotStarted",
  components: { BingoBoard, PlayersComponent, OrangeButton },
  methods: {
    generate() {
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
          this.$refs.board.getSquares();
        })
        .catch(err => {
          console.log(err);
          this.$swal.fire("Oops...", "Error in generating your bingo board!", "error");
        })
    },
    startGame() {
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
          this.$forceUpdate();
        })
        .catch(err => {
          console.log(err);
          this.$swal.fire("Oops...", "Something went wrong when starting the game!", "error");
        });
    }
  }
}
</script>