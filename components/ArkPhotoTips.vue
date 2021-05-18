<template>
  <ark-slide-up-page :isVisible="isVisible" class="z-50 p-4" id="photo-tips">
    <div class="flex justify-end w-full mb-4" style="color: #95a2b8">
      <button @click="$emit('dismiss-photo-tips')" class="text-xs font-bold">
        DISMISS
      </button>
    </div>
    <div class="flex flex-col w-full h-full p-4">
      <h1 class="mb-4 font-serif text-xl text-center">
        Tips for taking or uploading a photo from your device:
      </h1>
      <div id="tips" class="relative flex w-full h-full">
        <div id="tip-1" :class="`tip ${focusedTip === 0 ? 'focused' : ''}`">
          <img class="mx-auto mb-4 h-1/2" src="/photos.png" alt="" />

          <div class="flex-1 p-6 text-center">
            Photograph medication with text clearly displayed.
          </div>
        </div>
        <div id="tip-2" :class="`tip ${focusedTip === 1 ? 'focused' : ''}`">
          do a thing
        </div>
        <div id="tip-3" :class="`tip ${focusedTip === 2 ? 'focused' : ''}`">
          do another thing
        </div>
      </div>

      <div class="flex px-6">
        <button class="px-2 py-1 font-bold" @click="prevTip">PREV</button>
        <div class="flex items-center justify-center flex-1 px-10">
          <div :class="`tip-dot ${focusedTip === 0 ? 'focused' : ''}`"></div>
          <div :class="`tip-dot ${focusedTip === 1 ? 'focused' : ''}`"></div>
          <div :class="`tip-dot ${focusedTip === 2 ? 'focused' : ''}`"></div>
        </div>
        <button class="px-2 py-1 font-bold" @click="nextTip">NEXT</button>
      </div>
    </div>
  </ark-slide-up-page>
</template>

<script>
export default {
  props: ["isVisible"],
  data() {
    return {
      focusedTip: 0,
    };
  },
  methods: {
    nextTip() {
      this.focusedTip++;
      this.focusedTip = this.focusedTip % 3;
    },
    prevTip() {
      this.focusedTip = this.focusedTip === 0 ? 2 : this.focusedTip - 1;
    },
    resetFocusPosition() {
      this.focusedTip = 0;
    },
  },
};
</script>