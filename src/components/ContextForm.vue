<template>
  <TextInput
    name="purpose"
    ref="purpose"
    label="What's the purpose of the ice-breaker?"
    placeholder="e.g. Freshman orientation, First date etc."
    :min=3
    :max=200
  />
    
  <TextInput
    name="description"
    ref="description"
    label="Briefly describe the group of participants."
    placeholder="e.g. University computing students from Singapore."
    :min=3
    :max=200
  />
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
      { label: 'Family', value: 'FAMILY' }
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
      const purpose = this.$refs.purpose.value;
      const description = this.$refs.description.value;
      const relationship = this.$refs.relationship.value;

      if (!purpose || !description || !relationship) {
        this.$swal.fire("Oops...", "You left a field blank!", "error");
        throw new Error("A field was left blank")
      }

      return { purpose, description, relationship };
    },
    setValues({ purpose, description, relationship }) {
      this.$refs.purpose.value = purpose;
      this.$refs.description.value = description;
      this.$refs.relationship.value = relationship;
    },
  }
}
</script>
