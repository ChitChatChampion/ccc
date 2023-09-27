<template>
  OwnerNotStarted
  <BingoBoard/>
  <PlayersComponent/>
</template>

<script>
import BingoBoard from '../board/BingoBoard.vue';
import PlayersComponent from './PlayersComponent.vue';

export default {
  name: "OwnerNotStarted",
  components: { BingoBoard, PlayersComponent }
}
</script>