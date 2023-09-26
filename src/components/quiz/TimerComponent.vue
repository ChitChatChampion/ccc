<template>
  <div class="timer">
    Seconds Left: {{ time.s }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: { h: 0, m: 0, s: 20 },
      seconds: 20,
      timer: 0,
    };
  },
  methods: {
    secondsToTime(secs) {
      const hours = Math.floor(secs / (60 * 60));
      const divisor_for_minutes = secs % (60 * 60);
      const minutes = Math.floor(divisor_for_minutes / 60);
      const divisor_for_seconds = divisor_for_minutes % 60;
      const seconds = Math.ceil(divisor_for_seconds);

      return {
        h: hours,
        m: minutes,
        s: seconds,
      };
    },
    startTimer() {
      if (this.timer === 0) {
        this.timer = setInterval(this.countDown, 1000);
      }
    },
    countDown() {
      const seconds = this.seconds - 1;
      this.time = this.secondsToTime(seconds);
      this.seconds = seconds;

      if (seconds === 0) {
        clearInterval(this.timer);
      }
    },
  },
  mounted() {
    const timeLeftVar = this.secondsToTime(this.seconds);
    this.time = timeLeftVar;
    this.startTimer();
  },
};
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
