<template>
    <ProgressBar :value="percentage" :pt="{
        root: {
            class: [`overflow-hidden w-full relative rounded-full h-[15px] my-auto', 'border-0 h-6 bg-${background}`]
        },
        value: ({ props }) => ({
            class: [
                `border-0 m-0 bg-${foreground}`,
                {
                    'transition-width duration-1000 ease-in-out absolute items-center border-0 flex h-full justify-center overflow-hidden w-0': props.mode !== 'indeterminate',
                    'progressbar-value-animate before:absolute before:top-0 before:left-0 before:bottom-0 before:bg-inherit after:absolute after:top-0 after:left-0 after:bottom-0 after:bg-inherit after:delay-1000': props.mode == 'indeterminate'
                }
            ]
        }),
        label: {
            class: ['inline-flex', 'text-black leading-6 hidden']
        }
    }" />
</template>

<script>
import ProgressBar from 'primevue/progressbar';
export default {
    props: {
        percentage: Number,
        background: String,
        foreground: String
    },
    components: {
        ProgressBar
    }
}
</script>