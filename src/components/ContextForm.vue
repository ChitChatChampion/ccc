<template>
  <FormKit type="group" name="baseContext">
    <FormKit
      type="text"
      name="purpose"
      label="Purpose"
      help="e.g. Freshman orientation, First date etc."
      placeholder="Purpose of ice-breaker"
    />
    <FormKit
      type="text"
      name="description"
      label="Description"
      help="e.g. University computing students from Singapore."
      placeholder="Purpose of ice-breaker"
    />
    <FormKit
      type="select"
      name="familiarity"
      label="Familiarity"
      help="How familiar are the participants with each other?"
      placeholder="Select Familiarity"
      :options="['Strangers', 'Acquaintances', 'Friends', 'Close Friends']"
    />
  </FormKit>
</template>