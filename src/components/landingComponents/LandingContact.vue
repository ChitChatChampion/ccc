<template>
    <section id="contact">
        <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md mt-16">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Contact Us
            </h2>
            <p class="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
                Questions or feedback? Contact us today. We're here to help and listen!
            </p>
            <form action="#" class="space-y-8 text-center">
                <div class="text-left">
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your
                        email</label>
                    <input type="email" id="email"
                        class="shadow-sm bg-dt-dark bg-opacity-0 placeholder-light placeholder-opacity-50 border border-light text-md rounded-lg focus:ring-cc focus:border-cc block w-full py-2.5 px-4 dark:bg-gray-700"
                        placeholder="example@xyz.com" required>
                </div>
                <div class="sm:col-span-2 text-left">
                    <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your
                        message</label>
                    <textarea id="message" rows="6"
                        class="block px-4 py-2.5 w-full text-md bg-opacity-0 bg-dt placeholder-light placeholder-opacity-50 rounded-lg border border-light focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Leave a comment..."></textarea>
                </div>
                <button type="submit"
                    class="py-3 px-5 text-md font-semibold text-center text-white rounded-lg bg-cc sm:w-fit hover:bg-cc-light mx-auto">Send
                    message</button>
            </form>
        </div>
    </section>
</template>