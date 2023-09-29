<template>
  <section class="max-w-3xl mx-auto w-full p-4 z-10 bg-ne-dark bg-opacity-50 rounded-lg">
    <h1 class="text-light text-3xl font-bold">Waiting for players...</h1>
    <ol v-if="players.length" class="flex flex-row flex-wrap mt-5 gap-4  w-xl">
      <PlayerPreview
        v-for="(player, index) in players"
        :key="player"
        :name="player"
        :index="index"/>
    </ol>
    <OrangeButton :onClick="getPlayers" text="Refresh Players List" class="mt-5 z-10"/>
  </section>
</template>

<script>
import { getHeader, getUrl } from "@/services";
import axios from "axios";
import PlayerPreview from "./PlayerPreview.vue";
import OrangeButton from "@/components/buttons/OrangeButton.vue";

export default {
  name: "PlayersComponent",
  data() {
    return {
      players: [],
      bingoWs: null
    };
  },
  props: {
    ws: Object
  },
  mounted() {
    this.getPlayers();
    this.ws.onPlayerJoin(() => {
      this.getPlayers();
    });
  },
  components: { PlayerPreview, OrangeButton },
  methods: {
    getPlayers() {
      this.$swal.fire({
        title: "Retrieiving Player Information...",
        didOpen: () => {
          this.$swal.showLoading();
        }
      });
      const roomId = this.$route.params.id;
      const headers = getHeader();
      const url = getUrl(`bingo/${roomId}/players`);
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
        this.$swal.fire("Oops...", "Could not retrieve player data!", "error");
      });
    }
  }
}
</script>