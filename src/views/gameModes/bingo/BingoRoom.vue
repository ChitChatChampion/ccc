<!-- /bingo/:id -->

<template>
  <main class="h-screen bg-gradient-to-b from-ne-light via-ne to-ne-dark">
    <NavBar backLink="/bingo" text="Social Bingo"/>
    <OwnerStarted v-if="isOwner && hasStarted"/>
    <OwnerNotStarted v-else-if="isOwner && !hasStarted"/>
    <PlayerStarted v-else-if="!isOwner && hasStarted"/>
    <PlayerNotStarted v-else :hasSubmitted="hasSubmitted"/>
  </main>
</template>

<script>
import axios from 'axios';
import { getHeader, getUrl } from "@/services";
import OwnerStarted from '@/components/bingo/owner/OwnerStarted.vue';
import OwnerNotStarted from '@/components/bingo/owner/OwnerNotStarted.vue';
import PlayerStarted from '@/components/bingo/player/PlayerStarted.vue';
import PlayerNotStarted from '@/components/bingo/player/PlayerNotStarted.vue';
import NavBar from "@/components/NavBar.vue";

export default {
  name: "BingoRoom",
  created() {
    const roomId = this.$route.params.id;
    const url = getUrl(`bingo/${roomId}`);
    const headers = getHeader();
    const player_name = localStorage.getItem("player_name") || "";
    headers.player_name = player_name;
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
        console.log(data);
      this.isOwner = data.isOwner;
      this.hasStarted = data.hasStarted;
      this.hasSubmitted = data.hasSubmitted;
    })
      .catch(err => {
      console.log(err);
    });
    this.isLoading = false;
  },
  data() {
    return {
      isLoading: true,
      isOwner: false,
      hasStarted: false,
      hasSubmitted: false
    };
  },
  components: { OwnerStarted, OwnerNotStarted, PlayerStarted, PlayerNotStarted, NavBar }
}
</script>