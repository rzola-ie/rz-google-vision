<template>
  <div class="w-full has-slider">
    <div class="slider" id="slider">
      <div
        class="w-full text-2xl slider-panel"
        v-for="(slide, index) in slides"
        :key="index"
      >
        <ark-slide :slideImage="slide.imgUrl">
          {{ slide.text }}
        </ark-slide>
      </div>
    </div>
    <div class="slider-pagination">
      <div class="active"></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
import * as Hammer from "hammerjs";
import ArkSlide from "./ArkSlide.vue";

export default {
  components: { ArkSlide },
  data() {
    return {
      slideCount: 6,
      activeSlide: 0,
      sliderManager: null,
      slides: [
        {
          text:
            "Do not eat or drink 30 mins before reading your blood pressure.",
          imgUrl: undefined,
        },
        {
          text:
            "Do not measure your blood pressure after exercising or bathing.",
          imgUrl: undefined,
        },
        {
          text: "Empty your bladder before your reading.",
          imgUrl: undefined,
        },
        {
          text:
            "Sit in a comfortable chair with your back supported for at least 5 mins before.",
          imgUrl: undefined,
        },
        {
          text: "Rest arm with cuff on a table at chest height",
          imgUrl: undefined,
        },
        {
          text:
            "Make sure blood pressure cuff is snug but not too tight against your bare skin, not over clothing",
          imgUrl: undefined,
        },
        {
          text: "Do not talk while blood pressure is measuring.",
          imgUrl: undefined,
        },
      ],
    };
  },
  mounted() {
    // 1. Basic object for our stuff
    window.slider = {};

    // 2. Settings
    slider.sliderPanelSelector = ".slider-panel";
    slider.sliderPaginationSelector = ".slider-pagination";
    slider.sensitivity = 25; // horizontal % needed to trigger swipe

    // 2. Placeholder to remember which slide we’re on
    slider.activeSlide = 0;

    // 3. Slide counter
    slider.slideCount = 6;

    // 4. Initialization + event listener
    slider.init = function (selector) {
      // 4a. Find the container
      slider.sliderEl = document.querySelector(selector);

      // 4b. Count stuff
      slider.slideCount = slider.sliderEl.querySelectorAll(
        slider.sliderPanelSelector
      ).length;

      // 4c. Populate pagination
      var n = 0;
      for (n; n < slider.slideCount; n++) {
        var activeStatus = n == slider.activeSlide ? ' class="is-active"' : "";
        slider.sliderEl.parentElement.querySelector(
          slider.sliderPaginationSelector
        ).innerHTML += "<div " + activeStatus + "></div>";
      }

      // 4d. Set up HammerJS
      var sliderManager = new Hammer.Manager(slider.sliderEl);
      sliderManager.add(new Hammer.Pan({ threshold: 0, pointers: 0 }));
      sliderManager.on("pan", function (e) {
        // 4e. Calculate pixel movements into 1:1 screen percents so gestures track with motion
        var percentage =
          ((100 / slider.slideCount) * e.deltaX) / window.innerWidth;

        // 4f. Multiply percent by # of slide we’re on
        var percentageCalculated =
          percentage - (100 / slider.slideCount) * slider.activeSlide;

        // 4g. Apply transformation
        slider.sliderEl.style.transform =
          "translateX( " + percentageCalculated + "% )";

        // 4h. Snap to slide when done
        if (e.isFinal) {
          if (e.velocityX > 1) {
            slider.goTo(slider.activeSlide - 1);
          } else if (e.velocityX < -1) {
            slider.goTo(slider.activeSlide + 1);
          } else {
            if (percentage <= -(slider.sensitivity / slider.slideCount))
              slider.goTo(slider.activeSlide + 1);
            else if (percentage >= slider.sensitivity / slider.slideCount)
              slider.goTo(slider.activeSlide - 1);
            else slider.goTo(slider.activeSlide);
          }
        }
      });
    };

    // 5. Update current slide
    slider.goTo = function (number) {
      // 5a. Stop it from doing weird things like moving to slides that don’t exist
      if (number < 0) slider.activeSlide = 0;
      else if (number > slider.slideCount - 1)
        slider.activeSlide = slider.slideCount - 1;
      else slider.activeSlide = number;

      // 5b. Apply transformation & smoothly animate via .is-animating CSS
      slider.sliderEl.classList.add("is-animating");
      var percentage = -(100 / slider.slideCount) * slider.activeSlide;
      slider.sliderEl.style.transform = "translateX( " + percentage + "% )";
      clearTimeout(slider.timer);
      slider.timer = setTimeout(function () {
        slider.sliderEl.classList.remove("is-animating");
      }, 400);

      // 5c. Update the counters
      var pagination = slider.sliderEl.parentElement.querySelectorAll(
        slider.sliderPaginationSelector + " > *"
      );
      var n = 0;
      for (n; n < pagination.length; n++) {
        var className = n == slider.activeSlide ? "is-active" : "";
        pagination[n].className = className;
      }
    };

    // Initialize
    slider.init("#slider");
  },
};
</script>

<style scoped>
:root {
  --slider-cards: 7;
}

.slider-pagination {
  bottom: 0;
  left: 0;
  pointer-events: none;
  position: absolute;
  text-align: center;
  width: 100%;
  z-index: 9999;
}
.slider-pagination div {
  border-radius: 50%;
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.75);
  display: inline-block;
  height: 6px;
  width: 6px;
  margin-left: 4px;
  margin-right: 4px;
  transition: background-color 250ms;
  z-index: 20;
}
.slider-pagination > .is-active {
  background-color: rgba(255, 255, 255, 0.75);
}

.slider {
  display: flex;
  padding-bottom: 1rem;
  width: calc(100% * 7);
}

.slider.is-animating {
  transition: transform 400ms cubic-bezier(0.5, 0, 0.5, 1);
}

.slider-panel {
  padding: 1rem;
  width: 100%;
}

.has-slider {
  position: relative;

  width: 100%;
}
</style>