<template>
  <section class="w-1/2 max-w-sm mx-auto">
    <h1 class="text-light text-3xl font-bold">Leaderboard</h1>
    <ol class="flex flex-col my-5 border-light border-2">
      <LeaderBoardEntry
        v-for="player in players"
        :key="player.name"
        :name="player.name"
        :score="player.score"/>
    </ol>
    <OrangeButton :onClick="refreshLeaderboard" text="Refresh Leaderboard"/>
  </section>
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