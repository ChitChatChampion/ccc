<template>
    <div class="bg-dt min-h-screen text-center flex flex-col justify-between py-20">
        <div class="mt-40 flex flex-col gap-10">
            <h1 class="font-bold font-sans text-3xl text-light">ChitChatChampion</h1>
            <PINInput />
        </div>
        <!-- TODO: Change this to router link / <a> tags later -->
        <p class="text-light font-medium font-sans">
            <b>Login</b> or <b>Sign Up</b> to Create Game
        </p>
    </div>
</template>
  
<script>
// import GameModePreview from '@/components/GameModePreview';
import { gameModeList } from './gameModes/gameModes';
import PINInput from '@/components/PINInput.vue';

export default {
    name: 'LandingGuestView',
    data() {
        return {
            gameModes: gameModeList
        }
    },
    components: {
        // GameModePreview,
        PINInput
    }
}
</script>