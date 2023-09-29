<template>
  <section class="w-1/2 max-w-sm mx-auto p-4 bg-ne-dark rounded-lg bg-opacity-50">
    <h1 class="text-light text-3xl font-bold">Leaderboard</h1>
    <ol v-if="players.length" class="flex flex-col mt-5">
      <LeaderBoardEntry
        v-for="player in players"
        :key="player.name"
        :name="player.name"
        :score="player.score"/>
    </ol>
    <OrangeButton :onClick="refreshLeaderboard" text="Refresh Leaderboard" class="mt-5"/>
  </section>
</template>

<script>
import { getHeader, getUrl } from "@/services";
import axios from "axios";
import LeaderBoardEntry from "./LeaderBoardEntry.vue";
import { BingoWebSocket } from '@/services/websockets';
import OrangeButton from "@/components/buttons/OrangeButton.vue";
import loginToGoogle from "@/components/loginToGoogle";

export default {
  name: "LeaderBoard",
  data() {
    return {
      players: []
    };
  },
  mounted() {
    this.refreshLeaderboard();
    // TODO: remove event listeners on unmount
    this.bingoWs = new BingoWebSocket().onPlayerGainPoints(() => {
      this.refreshLeaderboard();
    });
  },
  components: { LeaderBoardEntry, OrangeButton },
  methods: {
    refreshLeaderboard() {
      if (localStorage.getItem('expiry') < Date.now()) {
        this.$swal.fire({
          icon: 'warning',
          title: 'Please log in to Google to check the leaderboard!',
          showCancelButton: true,
          confirmButtonText: 'Log In'
        }).then(result => {
          if (result.isDismissed) {
            return;
          }
          loginToGoogle({ fn: this.refreshLeaderboardProcess });
        });
      } else {
        this.refreshLeaderboardProcess();
      }
    },
    refreshLeaderboardProcess() {
      this.$swal.fire({
        title: "Retrieving Leaderboard...",
        didOpen: () => {
          this.$swal.showLoading();
        }
      });
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
        this.$swal.close();
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