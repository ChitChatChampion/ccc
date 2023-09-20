<template>
  <label v-if="!!label" :for="name" class="block text-gray-700 text-sm font-bold mb-2"><br/>{{ label }}<br/></label>
  <input
    :name="name"
    type="number"
    v-model="value"
    class="shadow appearance-none border rounded-xl py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    :placeholder="placeholder"
    :min="min"
    :max="max"/>
</template>

<script>
export default {
  name: 'TextInput',
  data() {
    return {
      value: ''
    }
  },
  props: {
    placeholder: {
      type: String,
    },
    label: {
      type: String,
    },
    name: {
      type: String,
      required: true
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
    }
  }
}
</script>