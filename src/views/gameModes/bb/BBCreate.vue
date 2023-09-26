<!-- /bb/create -->

<template>
  <div class="h-screen bg-ns">
    <NavBar backLink="/bb" text="Burning Bridges" ref="nav"/>
    <section id='browse-game-modes' class="px-10 py-10 rounded-t-3xl bg-lrt-background grid gap-5 place-content-center min-h-[84%]">
      <h1 class="font-bold text-3xl text-ns">Create Game</h1>
      <span class="max-w-3xl">{{ createInstructions }}</span>

      <form class="bg-light shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
        <ContextForm ref="context"/>
        <BBForm ref="bb"/>
        <br/>
        <OrangeButton :onClick="generateQuestions" text="Generate Prompts" class="mt-5"/>
      </form>
      
      <QuestionForm ref="questions"/>

      <OrangeButton :onClick="createRoom" text="Create Room"/>
    </section>
  </div>
</template>

<script>
import { useMeta } from 'vue-meta';
import axios from 'axios';
import NavBar from '@/components/NavBar.vue';
import { gameModeDict } from '../gameModes';
import { getHeader, getUrl } from '@/services';
import ContextForm from '@/components/ContextForm.vue';
import BBForm from '@/components/bb/BBForm.vue';
import OrangeButton from '@/components/buttons/OrangeButton.vue';
import loginToGoogle from '@/components/loginToGoogle';
import QuestionForm from '@/components/bb/QuestionForm.vue';

export default {
  name: 'BBCreate',
  setup() {
    useMeta({
      title: 'Burning Bridges'
    })
  },
  data() {
    return {
      createInstructions: gameModeDict.bb.createInstructions,
    };
  },
  components: { NavBar, ContextForm, BBForm, OrangeButton, QuestionForm },
  created() {
    if (localStorage.getItem('expiry') < Date.now()) {
      this.$router.push('/bb');
      this.$swal.fire({
        icon: 'warning',
        title: 'Please log in to Google to create a game!',
        showCancelButton: true,
        confirmButtonText: 'Log In'
      }).then(result => {
        if (result.isDismissed) {
          return;
        }
        loginToGoogle({ redirect: '/bb/create', router: this.$router });
      });
    }
  },
  mounted() {
    this.populate({ url: getUrl('bb/context') });
  },
  methods: {
    async populate({ url }) {
      const headers = getHeader();
      axios.get(url, { headers })
        .then(response => {
          switch (response.status) {
            case 200:
              return response.data;
            default:
              return;
          }
        })
        .then(data => {
          if (!data) return;
          this.$refs.context.setValues(data.baseContext);
          this.$refs.csc.setValues(data.bbContext);
          this.$refs.questions.setValues(data.questions);
        })
        .catch(err => {
          console.log(err);
        });
    },
    async generateQuestions() {
      const payload = {
        baseContext: this.$refs.context.getValues(),
        bbContext: this.$refs.bb.getValues()
      };
      const url = getUrl('bb/questions/generate');
      const headers = getHeader();
      axios.post(url, payload, { headers })
        .then(response => {
          switch (response.status) {
            case 201:
              return response.data;
            default:
              throw new Error('Bad method!');
          }
        })
        .then(data => {
          this.$refs.questions.setValues(data.questions);
        })
        .catch(err => {
          console.log(err);
          this.$swal.fire('Oops...', 'Generate questions failed!', 'error');
          // this.$refs.questions.setValues({ questions: [{ id: 12345, content: "Who are you" }, { id: 12345, content: "Who are you" }] })
        })
    },
    async createRoom() {
      const url = getUrl('bb/create');
      const headers = getHeader();
      axios.post(url, {}, { headers })
        .then(response => {
          switch (response.status) {
            case 201:
              return response.data;
            default:
              throw new Error('Bad method!');
          }
        })
        .then(data => {
          this.$router.push(`bb/${data.id}`);
        })
        .catch(err => {
          console.log(err);
          this.$swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong when creating your room!'
          });
        });
    }
  }
}
</script>
