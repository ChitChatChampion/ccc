<script setup>
import LandingHero from '../components/landingComponents/LandingHero.vue';
import LandingNavbar from "../components/landingComponents/LandingNavbar.vue";
import LandingFooter from "../components/landingComponents/LandingFooter.vue";
import LandingPricing from '../components/landingComponents/LandingPricing.vue';
import LandingContact from '../components/landingComponents/LandingContact.vue';
</script>

<template>
  <div class="bg-dt text-light">
  <LandingNavbar />
  <div class="flex flex-col font-sans">
    <LandingHero />
    <LandingPricing />
    <LandingContact />
  </div>
  <LandingFooter />
</div>
</template>
