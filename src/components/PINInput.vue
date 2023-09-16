<template>
  <FormKit type="form" @submit="submitPIN">
    <FormKit
      type="text"
      name="roomId"
      label="Room ID"
    />
  </FormKit>
</template>

<script>
import router from '@/router';
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
          router.push(`${gameMode}/${roomId}`);
        });
    }
  }
}
</script>