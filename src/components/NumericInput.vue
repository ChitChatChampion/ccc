<template>
  <label v-if="!!label" :for="name" class="font-bold text-lg"><br/>{{ label }}<br/></label>
  <input
    :name="name"
    type="number"
    v-model="value"
    class="font-sans rounded-xl border-lrt border-2 p-2"
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