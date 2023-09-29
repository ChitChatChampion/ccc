<!-- /csc/create -->

<template>
  <div class="fixed h-screen bg-gradient-to-b from-jr-light via-jr to-jr-dark w-full bg-jr -z-1"></div>
  <div class="min-h-screen">
    <div class="absolute w-full h-screen z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-2">
      <NavBar backLink="/csc" text="Conversation Starter Cards" ref="nav"/>
      <section id='browse-game-modes' class="md:px-10 px-2 py-10 rounded-t-3xl bg-lrt-background place-content-center mx-auto min-h-[84%] max-w-3xl">
        <h1 class="font-bold text-3xl text-jr mb-5">Create Game</h1>
        <span class="max-w-3xl mb-5">Based on how you answer these questions, we'll ask ChatGPT to craft an ice-breaker game for you! So feel free to be as detailed as possible!</span>

        <form class="bg-light shadow-md rounded-lg md:px-8 px-2 pt-6 pb-8 my-4">
          <ContextForm ref="context"/>
          <CSCForm ref="csc"/>
          <br/>
          <OrangeButton :onClick="generateQuestions" text="Generate Questions" class="mt-5"/>
        </form>
        
        <QuestionForm ref="questions"/>

        <OrangeButton v-if="hasGenerated" :onClick="createRoom" text="Create Room" class="mt-5"/>
      </section>
    </div>
  </div>

  <div class="background-circle-csc bg-jr-v-light"></div>
  <div class="background-diamond-csc bg-jr-v-light"></div>
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
      title: 'Conversation Starter Cards',
      description: gameModeDict.csc.description
    })
  },
  data() {
    return {
      hasGenerated: false
    }
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
    } else {
      this.populate({ url: getUrl('csc/context') });
    }
  },
  methods: {
    async populate({ url }) {
      this.$swal.fire({
        title: "Retrieving Data...",
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
          this.$refs.csc.setValues(data.cscContext);
          this.$refs.questions.setValues(data.questions);
          if (data.questions) {
            this.hasGenerated = true;
          }
          this.$swal.close();
        })
        .catch(err => {
          console.log(err);
          this.$swal.close();
        });
    },
    async generateQuestions() {
      let baseContext;
      let cscContext;
      try {
        baseContext = this.$refs.context.getValues();
        cscContext = this.$refs.csc.getValues();
      } catch (e) {
        return;
      }

      this.$swal.fire({
        title: "Generating Questions...",
        didOpen: () => {
          this.$swal.showLoading();
        }
      });
      const payload = { baseContext, cscContext };
      const url = getUrl('csc/questions/generate');
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
          this.$swal.close();
          this.$refs.questions.setValues(data.questions);
          this.hasGenerated = true;
        })
        .catch(err => {
          this.$swal.fire('Oops...', `Generate questions failed! ${err?.response?.data?.message ?? ""}`, 'error');
          // this.$refs.questions.setValues({ questions: [{ id: 12345, text: "Who are you" }, { id: 12345, text: "Who are you" }] })
        })
    },
    async createRoom() {
      if (!this.$refs.questions.validate()) {
        this.$swal.fire("Oops...", "Please make sure you don't leave any questions blank!", "error");
        return;
      }
      this.$swal.fire({
        title: "Creating Room...",
        didOpen: () => {
          this.$swal.showLoading();
        }
      });
      const url = getUrl('room/csc/create');
      const headers = getHeader();
      axios.post(url, {}, { headers })
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
          this.$swal.close();
          this.$router.push(`${data.id}`);
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
.background-circle-csc {
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

.background-diamond-csc {
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