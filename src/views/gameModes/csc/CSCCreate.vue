<!-- /csc/create -->

<template>
  <div class="h-screen bg-jr">
    <NavBar backLink="/browse" text="Conversation Starter Cards"/>
    <section id='browse-game-modes' class="px-10 py-10 rounded-t-3xl bg-lrt-background h-5/6">
      <h1 class="font-bold text-3xl text-jr pb-10">Create Game</h1>
      {{ createInstructions }}
      <FormKit
        type="form"
        id="form"
        @submit="createRoom"
        :actions="false"
      >
        <ContextForm/>
        <CSCForm/>
        <FormKit
          type="submit"
          label="Generate Questions"
          outer-class="p-2 bg-cc rounded-xl font-sans font-bold text-light max-w-xs"
        />
      </FormKit>
    </section>
  </div>
</template>

<script>
import axios from 'axios';
import ContextForm from '@/components/ContextForm.vue';
import CSCForm from '@/components/CSCForm.vue';
import NavBar from '@/components/NavBar.vue';
import { gameModeDict } from '../gameModes';
import { getHeader, getUrl } from '@/services';

export default {
  name: 'CSCCreate',
  data() {
    return {
      name: gameModeDict.csc.name,
      createInstructions: gameModeDict.csc.createInstructions,
      imgPath: gameModeDict.csc.imgPath
    };
  },
  created() {
    if (localStorage.getItem('expiry') < Date.now()) {
      this.$router.push('/csc')
    }
  },
  components: { ContextForm, CSCForm, NavBar },
  methods: {
    async createRoom(fields) {
      const url = getUrl('csc');
      const header = getHeader();
      axios.post(url, fields, { header })
        .then(response => {
          switch (response.status) {
            case 201:
              return response.data;
            default:
              this.isInvalid = true;
              this.$swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Something went wrong when creating your room!'
              });
          }
        })
        .then(data => {
          if (!data) return;
          this.$router.push(`csc/${data.id}`);
        })
    }
  }
}
</script>
