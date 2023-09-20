<template>
  <label v-if="!!label" :for="name" class="block text-gray-700 text-sm font-bold mb-2"><br/>{{ label }}<br/></label>
  <select
    v-model="value"
    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
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