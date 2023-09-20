<template>
  <NumericInput
    name="number_of_questions"
    ref="number_of_questions"
    label="Number of Questions"
    placeholder="10"
    min="1"
    max="20"/>
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
    }
  }
}
</script>