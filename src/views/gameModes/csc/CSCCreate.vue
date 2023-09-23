<!-- /csc/create -->

<template>
  <div class="h-screen bg-jr">
    <NavBar backLink="/csc" text="Conversation Starter Cards" ref="nav"/>
    <section id='browse-game-modes' class="px-10 py-10 rounded-t-3xl bg-lrt-background grid gap-5 place-content-center min-h-[84%]">
      <h1 class="font-bold text-3xl text-jr">Create Game</h1>
      <span class="max-w-3xl">{{ createInstructions }}</span>

      <form class="bg-light shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
        <ContextForm ref="context"/>
        <CSCForm ref="csc"/>
        <br/>
        <OrangeButton :onClick="generateQuestions" text="Generate Questions" class="mt-5"/>
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
import CSCForm from '@/components/csc/CSCForm.vue';
import OrangeButton from '@/components/buttons/OrangeButton.vue';
import loginToGoogle from '@/components/loginToGoogle';
import QuestionForm from '@/components/csc/QuestionForm.vue';

export default {
  name: 'CSCCreate',
  setup() {
    useMeta({
      title: 'Conversation Starter Cards'
    })
  },
  data() {
    return {
      createInstructions: gameModeDict.csc.createInstructions,
    };
  },
  components: { NavBar, ContextForm, CSCForm, OrangeButton, QuestionForm },
  created() {
    if (localStorage.getItem('expiry') < Date.now()) {
      this.$router.push('/csc');
      this.$swal.fire({
        icon: 'warning',
        title: 'Please log in to Google to create a game!',
        showCancelButton: true,
        confirmButtonText: 'Log In'
      }).then(result => {
        if (result.isDismissed) {
          return;
        }
        loginToGoogle({ redirect: '/csc/create', router: this.$router });
      });
    }
  },
  mounted() {
    this.populate({ url: getUrl('base-context/read'), ref: this.$refs.context });
    this.populate({ url: getUrl('csc-context/read'), ref: this.$refs.csc });
    this.populate({ url: getUrl('csc/questions/read'), ref: this.$refs.questions });
  },
  methods: {
    async populate({ url, ref }) {
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
      const url = getUrl('csc/questions/generate');
      const header = getHeader();
      axios.post(url, payload, { header })
        .then(response => {
          switch (response.status) {
            case 201:
              return response.json();
            default:
              throw new Error('Bad method!');
          }
        })
        .then(data => {
          this.questions = data.questions;
        })
        .catch(err => {
          console.log(err);
          this.$swal.fire('Oops...', 'Generate questions failed!', 'error');
          // this.$refs.questions.setValues({ questions: [{ id: 12345, text: "Who are you" }, { id: 12345, text: "Who are you" }] })
        })
    },
    async createRoom() {
      const url = getUrl('csc/create');
      const header = getHeader();
      axios.post(url, {}, { header })
        .then(response => {
          switch (response.status) {
            case 201:
              return response.json();
            default:
              throw new Error('Bad method!');
          }
        })
        .then(data => {
          this.$router.push(`csc/${data.id}`);
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
