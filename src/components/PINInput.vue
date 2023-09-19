<template>
  <form class="rounded-3xl gap-5 z-10 max-w-sm" :class="{ flex: isHorizontal, grid: !isHorizontal, 'bg-light': !isHorizontal, 'p-5': !isHorizontal }">
    <input
      v-model="roomId"
      class="font-sans font-bold rounded-xl border-lrt border-2"
      :class="{ 'p-2': isHorizontal, 'p-3': !isHorizontal }"
      placeholder="Game ID"/>
    <OrangeButton :onClick="submitPIN" text="Join Game"/>
  </form>
</template>

<script>
import { getUrl } from '@/services';
import OrangeButton from './OrangeButton.vue';

export default {
  name: 'PINInput',
  props: {
    isHorizontal: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      roomId: ''
    }
  },
  components: {
    OrangeButton
  },
  methods: {
    async submitPIN() {
      const roomId = this.roomId;
      const url = getUrl(`room/${roomId}`);
      console.log(url);

      fetch(url)
        .then(response => {
          switch (response.status) {
            case 200:
              return response.json();
            default:
              this.$swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Room ID is not found!'
              });
          }
        })
        .then(data => {
          if (!data) return;
          const gameMode = data.type;
          this.$router.push(`${gameMode}/${roomId}`);
        })
        .catch(() => {
          this.$swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!'
          });
        });
    }
  }
}
</script>