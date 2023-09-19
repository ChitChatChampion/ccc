<template>
  <br/>
  <label v-if="!!label" :for="name" class="font-bold text-lg">{{ label }}</label>
  <br/>
  <select
    v-model="value"
    class="p-2 rounded-xl border-lrt border-2">
    <option disabled selected>{{ placeholder }}</option>
    <option v-for="option in options" :value="option.value" :key="option.value">{{ option.label }}</option>
  </select>
</template>

<script>
export default {
  name: 'SelectInput',
  data() {
    return {
      value: ''
    }
  },
  props: {
    name: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      required: true
    },
    options: {
      required: true
    },
    label: {
      type: String
    }
  }
}
</script>