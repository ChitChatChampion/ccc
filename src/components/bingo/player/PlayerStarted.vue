<template>
  PlayerStarted
  <TextInput
    label="Name"
    ref="name"/>
  <BingoBoard ref="board"/>
  <OrangeButton :onClick="submit"/>
</template>

<script>
import BingoBoard from '../board/BingoBoard.vue';
import OrangeButton from "@/components/buttons/OrangeButton";
import { getUrl } from "@/services";
import axios from 'axios';

export default {
  name: "PlayerStarted",
  components: { BingoBoard, OrangeButton },
  data() {
    return {
      attempts: 5
    }
  },
  methods: {
    submit() {
      if (this.attempts === 0) {
        this.$swal.fire("Oops...", "You have no more attempts left!", "error");
        return;
      }

      let isDone = false;
      this.$swal.fire({
        title: "Are you sure?",
        text: `You have ${this.attempts} attempt${this.attempts === 1 ? '' : 's'} remaining.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#009645',
        cancelButtonColor: '#D42E12',
        confirmButtonText: "Yes, I'm sure!"
      }).then(result => {
        isDone = result.isConfirmed;
      });

      if (!isDone) {
        return;
      }

      const name = this.$refs.name.value;
      if (!name) {
        this.$swal.fire("Oops...", "Please add a valid name!", "error");
      }

      const score = this.$refs.board.evaluate();
      const total_score = this.$refs.board.getTotal();
      const timestamp = Date.now();

      const payload = { name, score, total_score, timestamp };

      const roomId = this.$route.params.id;
      const url = getUrl(`bingo/${roomId}/submit`);
      axios.post(url, payload, {})
        .then(response => {
          switch (response.status) {
            case 200:
            case 201:
              return response.json();
            default:
              throw new Error("Bad method!");
          }
        })
        .catch(err => {
          console.log(err);
          this.$swal.fire("Oops...", "There was something wrong when submitting your results!", "error");
        })
    }
  }
}
</script>