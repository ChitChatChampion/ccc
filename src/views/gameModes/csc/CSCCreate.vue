<!-- /csc/create -->

<template>
  <div class="h-screen bg-jr">
    <NavBar backLink="/csc" text="Conversation Starter Cards" ref="nav"/>
    <section id='browse-game-modes' class="px-10 py-10 rounded-t-3xl bg-lrt-background h-5/6">
      <h1 class="font-bold text-3xl text-jr pb-10">Create Game</h1>
      {{ createInstructions }}
      <ContextForm ref="context"/>
      <CSCForm ref="csc"/>
      <br/>
      <OrangeButton :onClick="generateQuestions" text="Generate Questions"/>
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
import OrangeButton from '@/components/OrangeButton.vue';

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
  mounted() {
    this.populateContext({ url: getUrl('/base-context/read'), ref: this.$refs.context });
    this.populateContext({ url: getUrl('/csc-context/read'), ref: this.$refs.csc });
  },
  components: { NavBar, ContextForm, CSCForm, OrangeButton },
  methods: {
    populateContext({ url, ref }) {
      const header = getHeader();
      axios.post(url, {}, { header })
        .then(response => {
          switch (response.status) {
            case 200:
              return response.json();
            default:
              return;
          }
        })
        .then(data => {
          if (!data) return;
          ref.setValues(data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    async generateQuestions() {
      const payload = {
        baseContext: this.$refs.context.getValues(),
        cscContext: this.$refs.csc.getValues()
      };
      const url = getUrl('questions/generate');
      const header = getHeader();
      axios.post(url, payload, { header })
        .then(response => {
          console.log(response)
        })
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
