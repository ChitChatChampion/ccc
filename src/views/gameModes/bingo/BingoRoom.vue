<!-- /bingo/:id -->

<template>
  <div class="fixed h-screen bg-gradient-to-b from-ne-light via-ne to-ne-dark w-full bg-ne -z-1"></div>
  <main class="h-screen bg-gradient-to-b from-ne-light via-ne to-ne-dark p-2">
    <OwnerStarted v-if="isOwner && hasStarted"/>
    <OwnerNotStarted :ws="bingoWs" v-else-if="isOwner && !hasStarted"/>
    <PlayerStarted v-else-if="!isOwner && hasStarted"/>
    <PlayerNotStarted v-else :hasSubmitted="hasSubmitted"/>
    <!-- <div class="background-circle-bingo bg-ne-v-light"></div>
    <div class="background-diamond-bingo bg-ne-v-light"></div> -->
  </main>
</template>

<script>
import axios from 'axios';
import { getHeader, getUrl } from "@/services";
import OwnerStarted from '@/components/bingo/owner/OwnerStarted.vue';
import OwnerNotStarted from '@/components/bingo/owner/OwnerNotStarted.vue';
import PlayerStarted from '@/components/bingo/player/PlayerStarted.vue';
import PlayerNotStarted from '@/components/bingo/player/PlayerNotStarted.vue';
import { RoomWebSocket, BingoWebSocket } from '@/services/websockets';
import { useGameStateStore } from '../../../store'; // Import the store
import { computed } from 'vue';

export default {
  name: "BingoRoom",
  setup() {
          const gameStateStore = useGameStateStore(); // Use the store
          const storeHasStarted = computed(() => gameStateStore.getGameState);
          console.log(storeHasStarted)
          // this.hasStarted = storeHasStarted;
  },
  created() {
    const ws = new RoomWebSocket();
    const bingoWs = new BingoWebSocket();

    this.bingoWs = bingoWs;
    this.ws = ws
    this.$swal.fire({
      title: "Retrieving Room Information...",
      didOpen: () => {
        this.$swal.showLoading();
      }
    });
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
        // Notify owner when room joined
        bingoWs.bingoEnterRoom(roomId, data.isOwner);

        // Kicking out players when room close
        if (!data.isOwner) {
          ws.enterRoom(roomId);
          ws.onRoomClose(() => {
            this.$swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Room has been closed by the owner!'
            });
            this.$router.push('.');
          })
        }

        this.isOwner = data.isOwner;
        this.hasStarted = data.hasStarted;
        this.hasSubmitted = data.hasSubmitted;
        if (!data.hasSubmitted) {
          const attemptsDict = JSON.parse(localStorage.getItem("attempts")) || {};
          attemptsDict[roomId] = 5;
          localStorage.setItem("attempts", JSON.stringify(attemptsDict));
        }
        this.$swal.close();
      })
      .catch(err => {
        console.log(err);
        this.$swal.fire("Oops...", "Something went wrong when retrieving room information!", "error");
      })
      // .finally(() => {
      //   if (!this.hasStarted) {
      //     const gameStateStore = useGameStateStore(); // Use the store
      //     const storeHasStarted = computed(() => gameStateStore.getGameState);
      //     console.log(storeHasStarted)
      //     // this.hasStarted = storeHasStarted;
      //   }
      // });


    this.isLoading = false;
  },
  data() {
    return {
      isLoading: true,
      isOwner: false,
      hasStarted: false,
      hasSubmitted: false,
      ws: null,
      bingoWs: null
    };
  },
  components: { OwnerStarted, OwnerNotStarted, PlayerStarted, PlayerNotStarted }
}
</script>

<style scoped>
.background-circle-bingo {
  position: absolute;
  top: 65%;
  left: 100%;
  transform: translate(-100%, -50%);
  width: 30vh;
  /* Adjust the size of the circle as needed */
  height: 60vh;
  /* The width and height should be equal for a circle */
  border-top-left-radius: 60vh;
  border-bottom-left-radius: 60vh;
  z-index: 0;
  /* Place the circle behind other content */
  opacity: 20%;
}

.background-diamond-bingo {
  position: absolute;
  top: 20%;
  left: 0%;
  transform: translate(-50%, -50%) rotate(45deg);
  width: 50vmax;
  /* Adjust the size of the circle as needed */
  height: 50vmax;
  /* The width and height should be equal for a circle */
  border-radius: 4rem;
  /* Creates a circle by setting border-radius to 50% */
  z-index: 0;
  /* Place the circle behind other content */
  opacity: 20%;
}</style>