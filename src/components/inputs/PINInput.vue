<template>
  <form class="rounded-3xl gap-5 z-10 grid mx-auto" :class="{ 'bg-light': withBackground, 'p-5': withBackground }">
    <TextInput name="roomId" ref="roomId" placeholder="Game ID" :isCenter="true" :isBig="true" :max="10"/>
    <OrangeButton :onClick="submitPIN" text="Join Game"/>
  </form>
</template>

<script>
import { getUrl } from '@/services';
import OrangeButton from '@/components/buttons/OrangeButton.vue';
import TextInput from '@/components/inputs/TextInput.vue';

export default {
  name: '/inputs/PINInput',
  props: {
    withBackground: {
      type: Boolean,
      default: true
    },
    limitWidth: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      roomId: ''
    }
  },
  components: {
    OrangeButton,
    TextInput
},
  methods: {
    async submitPIN() {
      const roomId = this.$refs.roomId.value;
      const url = getUrl(`room/${roomId}`);
      console.log(url);

      fetch(url)
        .then(response => {
          switch (response.status) {
            case 200:
            case 201:
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
          const gameMode = data.game_type;
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