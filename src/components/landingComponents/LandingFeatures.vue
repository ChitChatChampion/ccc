<template>
    <section>
        <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6" id="features">
            <div class="mx-auto max-w-screen-md text-center mb-8 lg:mb-12 mt-14">
                <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Features</h2>
                <p class="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">Here at ChitChatChampion we focus on
                    building solutions that unlock long-lasting memories and meaningful first-impressions.</p>
            </div>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 mb-16 gap-20 max-w-screen-xl mx-auto">
            <div class="mx-auto text-center">
                <div>
                    <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                        Conversation Starter Cards
                    </h2>
                    <p class="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
                        Making conversations fun and memorable
                    </p>
                    <img :src="cscsample" class="mx-auto" alt="Conversation Starter Cards" />
                </div>
            </div>
            <div class="mx-auto text-center">
                <div>
                    <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                        Burning Bridges
                    </h2>
                    <p class="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
                        Here at ChitChatChampion we focus on building solutions that unlock long-lasting memories and meaningful first-impressions.
                    </p>
                    
                    <img :src="cscsample" class="mx-auto" alt="Conversation Starter Cards" />
                </div>
            </div>
            <div class="mx-auto text-center">
                <div>
                    <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                        Human Bingo
                    </h2>
                    <p class="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
                        Here at ChitChatChampion we focus on building solutions that unlock long-lasting memories and meaningful first-impressions.
                    </p>
                    
                    <img :src="cscsample" class="mx-auto" alt="Conversation Starter Cards" />
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import cscsample from "../../../public/cscsample.png"
</script>