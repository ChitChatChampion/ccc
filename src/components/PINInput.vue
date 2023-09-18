<template>
  <div class="flex mx-auto">
    <FormKit type="form" submit-label="Join Game" @submit="submitPIN"
      form-class="flex flex-col gap-3 text-center bg-light p-4 rounded-2xl mx-auto" :actions="false">
      <FormKit type="text" name="roomId" placeholder="Game ID"
        input-class="border-[#A7A7A7] border-2 p-3 font-sans font-bold rounded-xl" />
      <FormKit type="submit" label="Join Game" outer-class="p-2 bg-cc rounded-xl font-sans font-bold text-light" />
    </FormKit>
  </div>
</template>

<script>
import { getUrl } from '@/services';

export default {
  name: 'PINInput',
  data() {
    return {
      isInvalid: false
    };
  },
  methods: {
    async submitPIN(fields) {
      const roomId = fields.roomId;
      const url = getUrl(`room/${roomId}`);
      console.log(url);

      fetch(url)
        .then(response => {
          switch (response.status) {
            case 200:
              return response.json();
            default:
              this.isInvalid = true;
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
        });
    }
  }
}
</script>