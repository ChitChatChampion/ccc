<template>
  PlayerStarted
  <TextInput
    label="Name"
    name="name"
    ref="name"/>
  <BingoBoard ref="board"/>
  <OrangeButton text="Submit" :onClick="submit"/>
  {{ attempts }}
</template>

<script>
import BingoBoard from '../board/BingoBoard.vue';
import OrangeButton from "@/components/buttons/OrangeButton";
import TextInput from "@/components/inputs/TextInput.vue";
import { getUrl } from "@/services";
import axios from 'axios';

export default {
  name: "PlayerStarted",
  components: { BingoBoard, OrangeButton, TextInput },
  data() {
    return {
      attempts: 5
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
      if (this.attempts === 0) {
        this.$swal.fire("Oops...", "You have no more attempts left!", "error");
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
      const name = this.$refs.name.value;
      if (!name) {
        this.$swal.fire("Oops...", "Please add a valid name!", "error");
      }

      const score = this.$refs.board.evaluate();
      const total_score = this.$refs.board.getTotal();
      const timestamp = Date.now();

      const payload = { name, score, total_score, timestamp };
      console.log(payload);

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
        })
        .catch(err => {
          console.log(err);
          this.$swal.fire("Oops...", "There was something wrong when submitting your guesses!", "error");
        })
    }
  }
}
</script>