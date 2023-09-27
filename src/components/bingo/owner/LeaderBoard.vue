<template>
  LeaderBoard
  <LeaderBoardEntry
    v-for="player in players"
    :key="player.name"
    :name="player.name"
    :score="player.score"/>
  <OrangeButton :onClick="refreshLeaderboard" text="Refresh Leaderboard"/>
</template>

<script>
import { getHeader, getUrl } from "@/services";
import axios from "axios";
import LeaderBoardEntry from "./LeaderBoardEntry.vue";
import OrangeButton from "@/components/buttons/OrangeButton.vue";

export default {
  name: "LeaderBoard",
  data() {
    return {
      players: []
    };
  },
  mounted() {
    this.refreshLeaderboard();
  },
  components: { LeaderBoardEntry, OrangeButton },
  methods: {
    refreshLeaderboard() {
      const roomId = this.$route.params.id;
      const url = getUrl(`bingo/${roomId}/leaderboard`);
      const headers = getHeader();
      axios.get(url, { headers })
        .then(response => {
        switch (response.status) {
          case 200:
          case 201:
            return response.data;
          default:
            throw new Error("Bad method!");
        }
      })
        .then(data => {
        this.players = data.players;
      })
        .catch(err => {
        console.log(err); 
        this.$swal.fire("Oops...", "Something went wrong when getting leaderboard!", "error");
      });
    }
  }
}
</script>