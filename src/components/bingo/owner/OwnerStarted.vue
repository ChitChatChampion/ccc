<template>
  <LeaderBoard/>
  <BingoBoard :isPlayer="false"/>
</template>

<script>
import BingoBoard from '../board/BingoBoard.vue';
import LeaderBoard from './LeaderBoard.vue';

export default {
  name: "OwnerStarted",
  components: { LeaderBoard, BingoBoard }
}
</script>