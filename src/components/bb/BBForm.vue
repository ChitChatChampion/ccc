<template>
  <NumericInput
    name="number_of_prompts"
    ref="number_of_prompts"
    label="How many prompts do you want to create?"
    placeholder="10"
    :min="1"
    :max="20"
    :minMsg="val => `Haiya must have at least ${val} prompt${val > 1 ? 's' : ''}.`"
    :maxMsg="val => `Haiya maximum ${val} prompt${val > 1 ? 's' : ''}.`"
    />
</template>

<script>
import NumericInput from '@/components/inputs/NumericInput.vue';

export default {
  name: 'BBForm',
  components: { NumericInput },
  methods: {
    getValues() {
      return {
        number_of_prompts: this.$refs.number_of_prompts.value,
      }
    },
    setValues({ number_of_prompts }) {
      this.$refs.number_of_prompts.value = number_of_prompts;
    }
  }
}
</script>