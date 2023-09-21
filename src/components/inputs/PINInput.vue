<template>
  <form class="rounded-3xl gap-5 z-10 grid" :class="{ 'bg-light': withBackground, 'p-5': withBackground, 'max-w-sm': limitWidth }">
    <TextInput name="roomId" ref="roomId" placeholder="Game ID"/>
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