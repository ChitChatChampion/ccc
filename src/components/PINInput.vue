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
export default {
  name: 'PINInput',
}
</script>

<script setup>
import { callGet } from '@/services';

const submitPIN = async fields => {
  const roomId = fields.roomId;
  const url = `/csc/${roomId}`;
  const response = callGet(url, {});
  console.log(response);
}
</script>