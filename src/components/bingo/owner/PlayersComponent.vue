<template>
  Players
  <PlayerPreview
    v-for="(player, index) in players"
    :key="player"
    :name="player"
    :index="index"/>
  <OrangeButton
    text="Refresh"
    :onClick="getPlayers"/>
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
      players: []
    };
  },
  mounted() {
    this.getPlayers();
  },
  components: { PlayerPreview, OrangeButton },
  methods: {
    getPlayers() {
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