<script setup>
import LandingHero from '../components/landingComponents/LandingHero.vue';
import LandingNavbar from "../components/landingComponents/LandingNavbar.vue";
import LandingFooter from "../components/landingComponents/LandingFooter.vue";
import LandingPricing from '../components/landingComponents/LandingPricing.vue';
import LandingContact from '../components/landingComponents/LandingContact.vue';
import LandingFeatures from '@/components/landingComponents/LandingFeatures.vue';
</script>

<template>
  <div class="bg-gradient-to-b from-dt-light via-dt to-dt-dark text-light">
  <LandingNavbar />
  <div class="flex flex-col font-sans">
    <LandingHero />
    <LandingFeatures />
    <LandingPricing />
    <LandingContact />
  </div>
  <LandingFooter />
</div>
</template>
