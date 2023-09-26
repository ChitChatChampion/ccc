<!-- /quiz/:id, not owner -->

<template>
  <TextInput
    placeholder=""
    ref="name"
    label="What's your name?"
    name="name"/>
  <TextInput
    placeholder=""
    ref="information"
    label="Tell us about yourself! The more you tell, the better the generated questions will be!"
    name="information"/>
</template>

<script>
import OrangeButton from "@/components/buttons/OrangeButton";
import TextInput from "@/components/inputs/TextInput";

export default {
  name: 'ParticipantForm',
  components: { TextInput, OrangeButton },
  methods: {
    getValues() {
      return {
        name: this.$refs.name.value,
        information: this.$refs.information.value
      }
    }
  }
}
</script>