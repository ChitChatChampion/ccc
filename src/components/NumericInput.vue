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
  <span v-if="value < min && !!minMsg" class="text-ns"><br/>{{ minMsg(min) }}</span>
  <span v-if="value > max && !!maxMsg" class="text-ns"><br/>{{ maxMsg(max) }}</span>
</template>

<script>
export default {
  name: 'TextInput',
  data() {
    return {
      value: 10
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
    },
    minMsg: {},
    maxMsg: {}
  }
}
</script>