<template>
  <TextInput
    name="purpose"
    ref="purpose"
    label="Purpose"
    placeholder="e.g. Freshman orientation, First date etc."/>
  <TextInput
    name="description"
    ref="description"
    label="Description"
    placeholder="e.g. University computing students from Singapore."/>
  <SelectInput
    name="relationship"
    ref="relationship"
    label="Relationship"
    placeholder="Choose the relationship"
    :options="[
      { label: 'Strangers', value: 'STRANGERS' },
      { label: 'Acquaintances', value: 'ACQUAINTANCES' },
      { label: 'Friends', value: 'FRIENDS' },
      { label: 'Close Friends', value: 'CLOSE FRIENDS' },
    ]"/>
</template>

<script>
import TextInput from './TextInput.vue';
import SelectInput from './SelectInput.vue';

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
    }
  }
}
</script>