<!-- /bingo/create -->

<template>
  <div class="h-screen bg-ne">
    <NavBar backLink="/bingo" text="Social Bingo" ref="nav"/>
    <section id='browse-game-modes' class="px-10 py-10 rounded-t-3xl bg-lrt-background grid gap-5 place-content-center mx-auto min-h-[84%]">
      <h1 class="font-bold text-3xl text-ne">Create Game</h1>
      <span class="max-w-3xl">Craft your custom Social Bingo board right here! Before gathering input from your participants, begin by selecting the type of information you'd like to gather from them. Whether it's hobbies, interests, favorite movies, or even political ideologies, we'll collect your players' responses and curate an engaging Bingo board tailored to your preferences!</span>
      
      <BingoForm ref="fields"/>

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
    }
  },
  mounted() {
    this.populate({ url: getUrl('bingo/context') });
  },
  methods: {
    async populate({ url }) {
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
          this.$refs.fields.setValues(data.fields);
        })
        .catch(err => {
          console.log(err);
        });
    },
    async createRoom() {
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
