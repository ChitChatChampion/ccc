<template>
  <NumericInput
    name="number_of_prompts"
    ref="number_of_prompts"
    label="Number of Prompts"
    placeholder="10"
    :min="1"
    :max="20"/>
</template>

<script>
import NumericInput from './NumericInput.vue';

export default {
  name: 'CSCForm',
  components: { NumericInput },
  methods: {
    getValues() {
      return {
        number_of_prompts: this.$refs.number_of_prompts.value,
      }
    }
  }
}
</script>