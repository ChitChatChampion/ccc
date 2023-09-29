<template>
    <section class="relative">
        <div class="py-8 px-10 mx-auto max-w-screen-xl lg:py-16 lg:px-6 " id="features">
            <div class="mx-auto max-w-screen-md text-center mb-8 lg:mb-12 mt-14">
                <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Features</h2>
                <p class="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">Utilising state-of-the-art Generative
                    AI Technology, ChitChatChampion allows you to create the following game modes with zero hassle.</p>
            </div>
        </div>
        <div class="grid grid-cols-1 lg:hidden mb-16 gap-20 max-w-screen-xl mx-auto px-10">
            <div class="mx-auto text-center">
                <div>
                    <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                        Conversation Starter Cards
                    </h2>
                    <p class="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
                        Conversation Starter Cards is the ultimate icebreaker game that'll turn any gathering into a
                        laughter-filled adventure. Customise the cards based on what you need, and bring the life of the
                        party
                        with exciting prompts that ignite conversations!
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
                        The fiery card party game where you'll laugh, point, and watch friendships smolder
                        as you reveal who in the group truly fits the scandalous prompts.
                        Sparks will fly as you discover how well you really know your friends!
                    </p>

                    <img :src="cscsample" class="mx-auto" alt="Conversation Starter Cards" />
                </div>
            </div>
            <div class="mx-auto text-center">
                <div>
                    <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                        Social Bingo
                    </h2>
                    <p class="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
                        Social Bingo" turns every social gathering into a hilarious competition.
                        Race to complete your bingo card by entering details of the person that matches the
                        description. The twist? There is only one unique answer!
                    </p>

                    <img :src="cscsample" class="mx-auto" alt="Conversation Starter Cards" />
                </div>
            </div>
        </div>

        <div class="hidden lg:flex flex-col mb-16 gap-20 max-w-screen-lg mx-auto px-10">
            <div class="grid grid-cols-2 mx-auto text-center">
                <div class="col-span-1 text-left flex flex-col justify-center gap-10">
                    <div class="flex flex-col gap-4">
                        <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                            Conversation Starter Cards
                        </h2>
                        <p class="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
                            Conversation Starter Cards is the ultimate icebreaker game that'll turn any gathering into a
                            laughter-filled adventure. Customise the cards based on what you need, and bring the life of the
                            party
                            with exciting prompts that ignite conversations!
                        </p>
                    </div>
                    <div class="flex">
                        <router-link to="/csc/create">
                            <OrangeButton text="Create This Game" class="px-10" />
                        </router-link>
                    </div>
                </div>
                <img :src="cscsample" class="mx-auto" alt="Conversation Starter Cards" />
            </div>

            <div class="grid grid-cols-2 mx-auto text-center">
                <div class="col-span-1 text-left flex flex-col justify-center gap-10">
                    <div class="flex flex-col gap-4">
                        <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                            Burning Bridges
                        </h2>
                        <p class="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
                            Burning bridges is the fiery card party game where you'll laugh, point, and watch friendships
                            smolder as you reveal who in the group truly fits the scandalous prompts.
                            Sparks will fly as you discover how well you really know your friends!
                        </p>
                    </div>
                    <div class="flex">
                        <router-link to="/bb/create">
                            <OrangeButton text="Create This Game" class="px-10" />
                        </router-link>
                    </div>
                </div>
                <img :src="cscsample" class="mx-auto" alt="Conversation Starter Cards" />
            </div>

            <div class="grid grid-cols-2 mx-auto text-center">
                <div class="col-span-1 text-left flex flex-col justify-center gap-10">
                    <div class="flex flex-col gap-4">
                        <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                            Social Bingo
                        </h2>
                        <p class="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
                            Social Bingo turns every social gathering into a hilarious competition.
                            Race to complete your bingo card by entering details of the person that matches the
                            description. The twist? There is only one unique answer!
                        </p>
                    </div>
                    <div class="flex">
                        <router-link to="/bingo/create">
                            <OrangeButton text="Create This Game" class="px-10" />
                        </router-link>
                    </div>
                </div>
                <img :src="cscsample" class="mx-auto" alt="Conversation Starter Cards" />
            </div>
        </div>
    </section>
</template>

<script setup>
import cscsample from "../../../public/cscsample.png"
import OrangeButton from "../buttons/OrangeButton.vue";
</script>
