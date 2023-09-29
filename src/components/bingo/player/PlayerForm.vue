<template>
  <h1 class="text-3xl text-light max-w-3xl mx-auto font-bold">Player Form</h1>
  <p class="max-w-3xl mx-auto text-light mt-4">The game hasn't started yet! In the meantime, fill up this form and tell us about yourself. Feel free to be as funny and descriptive as you'd like, as we can get ChatGPT to create an awesome game!</p>
  <div class="bg-ne-dark bg-opacity-50 rounded-lg md:px-4 px-2 py-4 max-w-3xl mx-auto mt-4">
    <TextInput
      name="name"
      label="Name"
      :isLight="true"
      :max="50"
      ref="name"/>
    <TextInput
      v-for="field in fields"
      :name="field"
      :label="field"
      :key="field"
      :isLight="true"
      :max="300"
      :ref="field"/>
    <TextInput
      name="other_information"
      label="Other Information"
      :isLight="true"
      :max="300"
      ref="other_information"/>
    <OrangeButton :onClick="submitForm" text="Submit Form" class="mt-5"/>
  </div>
</template>

<script>
import TextInput from "@/components/inputs/TextInput.vue";
import OrangeButton from "@/components/buttons/OrangeButton.vue";
import { getUrl } from "@/services";
import axios from "axios";
import { useGameStateStore } from '../../../store'; // Import the store

export default {
  name: "PlayerForm",
  components: { TextInput, OrangeButton },
  mounted() {
    this.$swal.fire({
      title: "Retrieving Data...",
      didOpen: () => {
        this.$swal.showLoading();
      }
    });
    const roomId = this.$route.params.id;
    const url = getUrl(`bingo/${roomId}/fields`);
    fetch(url)
      .then(response => {
        switch (response.status) {
          case 200:
          case 201:
            return response.json();
          default:
            throw new Error("Bad method!");
        }
      })
      .then(data => {
        this.$swal.close();
        this.fields = data.fields.map(field => field.content);
      })
      .catch(err => {
        this.$swal.fire('Oops...', 'Get Form Failed!', 'error');
        console.log(err);
      })
  },
  data() {
    return {
      fields: []
    }
  },
  methods: {
    submitForm() {
      this.$swal.fire({
        title: "Are you done filling up the form?",
        text: "You won't be able to edit the form again.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#009645',
        cancelButtonColor: '#D42E12',
        confirmButtonText: "Yes, I'm sure!"
      }).then(result => {
        if (result.isConfirmed) {
          this.sendPayload();
        }
      });
    },
    sendPayload() {
      this.$swal.fire({
        title: "Submitting Form...",
        didOpen: () => {
          this.$swal.showLoading();
        }
      });
      const payload = {};
      for (let field of this.fields) {
        payload[field] = this.$refs[field][0].value;
      }
      payload.name = this.$refs.name.value;
      payload.other_information = this.$refs.other_information.value;

      const roomId = this.$route.params.id;
      const url = getUrl(`bingo/${roomId}/join`);
      axios.post(url, payload, {})
        .then(response => {
          switch (response.status) {
            case 200:
            case 201:
              return response.data;
            case 409:
              this.$swal.fire("Oops...", "Someone with that name has already joined! Please use a different name!", "error")
              throw new Error("Bad method!");
            default:
              throw new Error("Bad method!");
          }
        })
        .then(() => {
          localStorage.setItem("player_name", this.$refs.name.value);
          this.$swal.close();
          const gameStateStore = useGameStateStore();
          gameStateStore.setGameState("SUBMITTED");
        })
        .catch(err => {
          console.log(err);
          this.$swal.fire("Oops...", "The form could not be submitted for whatever reason!", "error");
        })
    }
  }
}
</script>