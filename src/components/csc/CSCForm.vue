<template>
  <NumericInput
    name="number_of_questions"
    ref="number_of_questions"
    label="How many questions do you want to create?"
    :min="1"
    :max="20"
    :minMsg="val => `You must have at least ${val} question${val > 1 ? 's' : ''}.`"
    :maxMsg="val => `You are only allowed to generate a maximum of ${val} question${val > 1 ? 's' : ''} at a time.`"
    />
</template>

<script>
import NumericInput from '@/components/inputs/NumericInput.vue';

export default {
  name: 'CSCForm',
  components: { NumericInput },
  methods: {
    getValues() {
      const number_of_questions = this.$refs.number_of_questions.value;
      if (number_of_questions >= 1 && number_of_questions <= 20) {
        return {
          number_of_questions: this.$refs.number_of_questions.value,
        }
      }

      if (number_of_questions <= 0) {
        this.$swal.fire("Oops...", "You must have at least 1 question!", "error");
      } else if (number_of_questions > 20) {
        this.$swal.fire("Oops...", "You can only generate 20 questions at a time!", "error");
      } else {
        this.$swal.fire("Oops...", "This input cannot be read!", "error");
      }

      throw new Error("Invalid number of questions!");
    },
    setValues({ numberOfQuestions }) {
      this.$refs.number_of_questions.value = numberOfQuestions;
    }
  }
}
</script>