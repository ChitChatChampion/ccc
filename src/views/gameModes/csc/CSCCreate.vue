<!-- /csc/create -->

<template>
  <div class="h-screen bg-jr">
    <NavBar backLink="/browse" text="Conversation Starter Cards" ref="nav"/>
    <section id='browse-game-modes' class="px-10 py-10 rounded-t-3xl bg-lrt-background h-5/6">
      <h1 class="font-bold text-3xl text-jr pb-10">Create Game</h1>
      {{ createInstructions }}
      <ContextForm ref="context"/>
      <CSCForm ref="csc"/>
      <br/>
      <button @click="generateQuestions">Generate Questions</button>
    </section>
  </div>
</template>

<script>
import axios from 'axios';
import NavBar from '@/components/NavBar.vue';
import { gameModeDict } from '../gameModes';
import { getHeader, getUrl } from '@/services';
import ContextForm from '@/components/ContextForm.vue';
import CSCForm from '@/components/CSCForm.vue';

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
    const element = this.$refs;
    console.log(element);
  },
  components: { NavBar, ContextForm, CSCForm },
  methods: {
    generateQuestions() {
      const payload = {
        baseContext: this.$refs.context.getValues(),
        cscContext: this.$refs.csc.getValues()
      };
      console.log(payload);
    },
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
