<!-- /bingo/create -->

<template>
  <div class="fixed h-screen bg-gradient-to-b from-ne-light via-ne to-ne-dark w-full bg-ne -z-1"></div>
  <div class="min-h-screen">
    <div class="absolute w-full h-screen z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-2">
      <NavBar backLink="/bingo" text="Social Bingo" ref="nav"/>
      <section id='browse-game-modes' class="md:px-10 px-5 py-10 rounded-t-3xl bg-lrt-background place-content-center mx-auto min-h-[84%] max-w-3xl">
        <h1 class="font-bold text-3xl text-ne mb-5">Create Game</h1>
        <span class="max-w-3xl">Craft your custom Social Bingo board right here! Before gathering input from your participants, begin by selecting the type of information you'd like to gather from them. Whether it's hobbies, interests, favorite movies, or even political ideologies, we'll collect your players' responses and curate an engaging Bingo board tailored to your preferences!</span>
        <BingoForm ref="fields"/>

        <OrangeButton :onClick="createRoom" text="Create Room" class="mt-5"/>
      </section>
    </div>
  </div>

  <div class="background-circle-bingo bg-ne-v-light"></div>
  <div class="background-diamond-bingo bg-ne-v-light"></div>
</template>

<script>
import { useMeta } from 'vue-meta';
import axios from 'axios';
import NavBar from '@/components/NavBar.vue';
import { gameModeDict } from '../gameModes';
import { getHeader, getUrl } from '@/services';
import BingoForm from '@/components/bingo/BingoForm.vue';
import OrangeButton from '@/components/buttons/OrangeButton.vue';
import loginToGoogle from '@/components/loginToGoogle';

export default {
  name: 'BingoCreate',
  setup() {
    useMeta({
      title: 'Social Bingo',
      description: gameModeDict.bingo.description
    })
  },
  components: { NavBar, BingoForm, OrangeButton },
  created() {
    if (localStorage.getItem('expiry') < Date.now()) {
      this.$router.push('/bingo');
      this.$swal.fire({
        icon: 'warning',
        title: 'Please log in to Google to create a game!',
        showCancelButton: true,
        confirmButtonText: 'Log In'
      }).then(result => {
        if (result.isDismissed) {
          return;
        }
        loginToGoogle({ redirect: '/bingo/create', router: this.$router });
      });
    } else {
      this.populate({ url: getUrl('bingo/context') });
    }
  },
  methods: {
    populate({ url }) {
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
          this.$swal.close();
          this.$refs.fields.setValues(data.fields);
        })
        .catch(err => {
          console.log(err);
          this.$swal.close();
        });
    },
    async createRoom() {
      if (!this.$refs.fields.validate()) {
        this.$swal.fire("Oops...", "Please make sure you don't leave any fields blank!", "error");
        return;
      }
      this.$swal.fire({
        title: "Creating Room...",
        didOpen: () => {
          this.$swal.showLoading();
        }
      });
      const url = getUrl('room/bingo/create');
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
          this.$swal.close();
          this.$router.push(`${data.id}`);
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

<style scoped>
.background-circle-bingo {
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

.background-diamond-bingo {
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
