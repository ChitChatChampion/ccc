<!-- /csc/:id -->

<template>
  <li v-for="card in cards" :key="card">
    {{ card }}
  </li>
</template>

<script>
import { getUrl } from '@/services';

export default {
  name: 'CSCRoom',
  data() {
    return {
      cards: []
    }
  },
  created() {
    const roomId = this.$route.params.id;
    const url = getUrl(`csc/${roomId}`);
    fetch(url)
      .then(response => {
        switch (response.status) {
          case 200:
            return response.json()
          default:
          this.$router.push('.');
          this.$swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Room ID is not found!'
          });
        }
      })
      .then(data => {
        if (!data) return;
        this.cards = data.cards;
      })
  }
}
</script>