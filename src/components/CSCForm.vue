<template>
  <NumericInput
    name="number_of_questions"
    ref="number_of_questions"
    label="How many questions do you want to create?"
    placeholder="10"
    :min="1"
    :max="20"
    :minMsg="val => `Haiya must have at least ${val} question${val > 1 ? 's' : ''}.`"
    :maxMsg="val => `Haiya maximum ${val} question${val > 1 ? 's' : ''}.`"
    />
</template>

<script>
import NumericInput from './NumericInput.vue';

export default {
  name: 'CSCForm',
  components: { NumericInput },
  methods: {
    getValues() {
      return {
        number_of_questions: this.$refs.number_of_questions.value,
      }
    },
    setValues({ number_of_questions }) {
      this.$refs.number_of_questions.value = number_of_questions;
    }
  }
}
</script>