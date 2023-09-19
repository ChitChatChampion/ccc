<template>
  <FormKit type="group" name="cscContext">
    <FormKit
      type="number"
      name="number_of_rounds"
      label="Number of Rounds"
      value="10"
      validation="between:1,20"
      validation-visibility="live"
    />
  </FormKit>
</template>