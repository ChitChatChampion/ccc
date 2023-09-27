<template>
  <article class="w-full bg-light rounded-md drop-shadow-xl h-full">
    <h1 :class="bgColor" class="font-bold text-lg w-full text-light text-center p-2 rounded-t-md">{{ name }}</h1>
    <img :src="imgPath" class="object-cover w-full h-40"/>
    <div class="p-4 w-full">
      <h2 class="font-bold text-xl text-black py-2">{{ shortDescription }}</h2>
      <p class="text-lrt py-2">{{ description }}</p>
      <menu class="flex gap-2">
        <router-link :to="abbr">
          <button
            :class="bgColor"
            class="btn my-2 py-2 px-4 rounded-md text-light hover:underline"
          >
            Play Now
          </button>
        </router-link>
        <router-link :to="`${abbr}/create`">
          <button
            :class="bgColor"
            class="btn my-2 py-2 px-4 rounded-md text-light hover:underline"
          >
            Create Game
          </button>
        </router-link>
      </menu>
    </div>
  </article>
</template>

<script>
export default {
  name: 'GameModePreview',
  props: {
    name: {
      type: String,
      required: true,
    },
    abbr: {
      type: String,
      required: true,
      validator: val => val.length <= 3
    },
    shortDescription: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    imgPath: {
      type: String,
    },
    bgColor: {
      type: String
    }
  },
  data() {
    return {
      bgBtn: '',
    }
  },
}
</script>