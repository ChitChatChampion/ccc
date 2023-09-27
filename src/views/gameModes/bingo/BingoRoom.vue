<!-- /bingo/:id -->

<template>
  <h1>Hi</h1>
  <OwnerStarted v-if="isOwner && hasStarted"/>
  <OwnerNotStarted v-else-if="isOwner && !hasStarted"/>
  <PlayerStarted v-else-if="!isOwner && hasStarted"/>
  <PlayerNotStarted v-else/>
</template>

<script>
import axios from 'axios';
import { getHeader, getUrl } from "@/services";
import OwnerStarted from '@/components/bingo/owner/OwnerStarted.vue';
import OwnerNotStarted from '@/components/bingo/owner/OwnerNotStarted.vue';
import PlayerStarted from '@/components/bingo/player/PlayerStarted.vue';
import PlayerNotStarted from '@/components/bingo/player/PlayerNotStarted.vue';

export default {
  name: "BingoRoom",
  created() {
    const roomId = this.$route.params.id;
    const url = getUrl(`bingo/${roomId}`);
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
      this.isOwner = data.isOwner;
      this.hasStarted = data.hasStarted;
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
      hasStarted: false
    };
  },
  components: { OwnerStarted, OwnerNotStarted, PlayerStarted, PlayerNotStarted }
}
</script>