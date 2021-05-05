<template>
  <div
    id="home"
    class="relative flex flex-col items-center flex-1 w-full max-w-2xl mx-auto overflow-hidden text-gray-600 bg-white rounded-t-lg shadow-lg"
  >
    <div
      class="flex flex-col items-center justify-center h-full px-6 py-4 md:py-6 md:px-12"
    >
      <h1 class="mb-2 font-serif text-3xl font-bold text-center text-blue-900">
        Hi
      </h1>
      <h2 class="mb-4 font-semibold tracking-wider text-center text-blue-900">
        Health!
      </h2>
      <div class="flex-1 pt-12 md:pt-24">
        <p class="mb-6 md:mb-12">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo quaerat
          voluptas fuga non nostrum quam, dolore quisquam mollitia porro?
          Consectetur dignissimos modi ut excepturi ducimus earum nesciunt
          dolorem assumenda. Atque. Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Accusantium adipisci ad, repellendus, dignissimos
          corrupti unde nisi debitis corporis nam sed nesciunt consectetur
          voluptate voluptatibus quis eligendi, sunt ipsum perspiciatis
          recusandae.
        </p>

        <nuxt-link
          to="/number"
          class="block w-full h-16 mx-auto text-center md:w-2/3 btn btn-main btn-gray"
        >
          Begin Assessment
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import ArkMoreInfoContent from "../components/ArkMoreInfoContent.vue";
export default {
  components: { ArkMoreInfoContent },
  layout: "welcome",
};
</script>