<!-- /bb/create -->

<template>
  <div class="fixed h-screen bg-gradient-to-b from-ns-light via-ns to-ns-dark w-full bg-ns -z-1"></div>
  <div class="min-h-screen">
    <div class="absolute w-full h-screen z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-2">
      <NavBar backLink="/bb" text="Burning Bridges" ref="nav"/>
      <section id='browse-game-modes' class="md:px-10 px-5 py-10 rounded-t-3xl bg-lrt-background place-content-center mx-auto min-h-[84%] max-w-3xl">
        <h1 class="font-bold text-3xl text-ns mb-5">Create Game</h1>
        <span class="max-w-3xl mb-5">Based on how you answer these questions, we'll ask ChatGPT to craft an ice-breaker game for you! So feel free to be as detailed as possible!</span>

        <form class="bg-light shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 mt-5">
          <ContextForm ref="context"/>
          <BBForm ref="bb"/>
          <br/>
          <OrangeButton :onClick="generateQuestions" text="Generate Questions" class="mt-5"/>
        </form>
        
        <QuestionForm ref="questions"/>

        <OrangeButton :onClick="createRoom" text="Create Room" class="mt-5"/>
      </section>
    </div>
  </div>

  <div class="background-circle-bb bg-ns-v-light"></div>
  <div class="background-diamond-bb bg-ns-v-light"></div>
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
      title: 'Burning Bridges',
      description: gameModeDict.bb.description
    })
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
    } else {
      this.populate({ url: getUrl('bb/context') });
    }
  },
  methods: {
    async populate({ url }) {
      this.$swal.fire({
        title: "Retrieving data...",
        didOpen: () => {
          this.$swal.showLoading();
        }
      });
      const headers = getHeader();
      axios.get(url, { headers })
        .then(response => {
          switch (response.status) {
            case 200:
            case 201:
              return response.data;
            default:
              return;
          }
        })
        .then(data => {
          if (!data) return;
          this.$refs.context.setValues(data.baseContext);
          this.$refs.bb.setValues(data.bbContext);
          this.$refs.questions.setValues(data.questions);
          this.$swal.close();
        })
        .catch(err => {
          console.log(err);
          this.$swal.close();
        });
    },
    async generateQuestions() {
      this.$swal.fire({
        title: "Generating Questions...",
        didOpen: () => {
          this.$swal.showLoading();
        }
      });
      const payload = {
        baseContext: this.$refs.context.getValues(),
        bbContext: this.$refs.bb.getValues()
      };
      const url = getUrl('bb/questions/generate');
      const headers = getHeader();
      axios.post(url, payload, { headers })
        .then(response => {
          switch (response.status) {
            case 200:
            case 201:
              return response.data;
            default:
              throw new Error(response?.message ?? 'Bad method!');
          }
        })
        .then(data => {
          this.$refs.questions.setValues(data.questions);
          this.$swal.close();
        })
        .catch(err => {
          this.$swal.fire('Oops...', `Generate questions failed! ${err?.response?.data?.message ?? ""}`, 'error');
          // this.$refs.questions.setValues({ questions: [{ id: 12345, content: "Who are you" }, { id: 12345, content: "Who are you" }] })
        })
    },
    async createRoom() {
      this.$swal.fire({
        title: "Creating Room...",
        didOpen: () => {
          this.$swal.showLoading();
        }
      });
      const url = getUrl('room/bb/create');
      const headers = getHeader();
      axios.post(url, {}, { headers })
        .then(response => {
          switch (response.status) {
            case 200:
            case 201:
              return response.data;
            default:
              throw new Error('Bad method!');
          }
        })
        .then(data => {
          this.$router.push(`${data.id}`);
          this.$swal.close();
        })
        .catch(err => {
          this.$swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `Something went wrong when creating your room! ${err?.response?.data?.message ?? ""}`
          });
        });
    }
  }
}
</script>

<style scoped>
.background-circle-bb {
  position: absolute;
  top: 65%;
  left: 100%;
  transform: translate(-100%, -50%);
  width: 30vh;
  /* Adjust the size of the circle as needed */
  height: 60vh;
  /* The width and height should be equal for a circle */
  border-top-left-radius: 60vh;
  border-bottom-left-radius: 60vh;
  /* z-index: 0; */
  /* Place the circle behind other content */
  opacity: 20%;
}

.background-diamond-bb {
  position: absolute;
  top: 20%;
  left: 0%;
  transform: translate(-50%, -50%) rotate(45deg);
  width: 50vmax;
  /* Adjust the size of the circle as needed */
  height: 50vmax;
  /* The width and height should be equal for a circle */
  border-radius: 4rem;
  /* Creates a circle by setting border-radius to 50% */
  /* z-index: 0; */
  /* Place the circle behind other content */
  opacity: 20%;
}</style>