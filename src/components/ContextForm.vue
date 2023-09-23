<template>
  <TextInput
    name="purpose"
    ref="purpose"
    label="What's the purpose of the ice-breaker?"
    placeholder="e.g. Freshman orientation, First date etc."/>
  <TextInput
    name="description"
    ref="description"
    label="Briefly describe the group of participants."
    placeholder="e.g. University computing students from Singapore."/>
  <SelectInput
    name="relationship"
    ref="relationship"
    label="How are the participants related?"
    placeholder="Choose the relationship"
    :options="[
      { label: 'Strangers', value: 'STRANGERS' },
      { label: 'Acquaintances', value: 'ACQUAINTANCES' },
      { label: 'Friends', value: 'FRIENDS' },
      { label: 'Close Friends', value: 'CLOSE FRIENDS' },
    ]"/>
</template>

<script>
import TextInput from './inputs/TextInput.vue';
import SelectInput from '@/components/inputs/SelectInput.vue';

export default {
  name: 'ContextForm',
  components: { TextInput, SelectInput },
  methods: {
    getValues() {
      return {
        purpose: this.$refs.purpose.value,
        description: this.$refs.description.value,
        relationship: this.$refs.relationship.value
      }
    },
    setValues({ purpose, description, relationship }) {
      this.$refs.purpose.value = purpose;
      this.$refs.description.value = description;
      this.$refs.relationship.value = relationship;
    }
  }
}
</script>
