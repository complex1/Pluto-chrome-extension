<template>
  <div class="flip-clock">
    
    <div class="flip-card">
      <div class="flip-clock-label">
      {{ label }}
    </div>
      <div
        class="flip-card-font-top"
        :style="{
          transform: `rotateX(${rotate.top}deg)`,
        }"
      >
        {{ count.topFont }}
      </div>
      <div
        class="flip-card-font-bottom"
        :style="{
          transform: `rotateX(${rotate.bottom}deg)`,
        }"
      >
        {{ count.bottomFont }}
      </div>
      <div class="flip-card-back-top">
        {{ count.topBack }}
      </div>
      <div class="flip-card-back-bottom">
        {{ count.bottomBack }}
      </div>
      <div class="flip-line"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FlipClock",
  props: {
    value: {
      type: Number,
      default: 0,
    },
    nextValue: {
      type: Number,
      default: 0,
    },
    width: {
      type: Number,
      default: 0,
    },
    label: {
      type: String,
      default: "",
    }
  },
  data() {
    return {
      count: {
        topFont: 0,
        bottomFont: 0,
        topBack: 0,
        bottomBack: 0,
      },
      rotate: {
        top: 0,
        bottom: 0,
      },
      counter: 0,
    };
  },
  computed: {
    widthPx() {
      return `${this.width}px`;
    },
    fontSize() {
      return `${this.width * 0.75}px`;
    },
    labelFont() {
      return `${Math.max(this.width * 0.08, 16)}px`;
    },
  },
  methods: {
    move() {
      this.counter += 5;
      if (this.counter <= 90) {
        this.rotate.top = this.counter;
      }

      if (this.counter === 90) {
        this.count.topFont = this.nextValue;
        this.count.bottomFont = this.nextValue;
        this.rotate.top = 0;
        this.count.bottomBack = this.value;
        this.rotate.bottom = -90;
      }

      if (this.counter > 90 && this.counter <= 180) {
        this.rotate.bottom = this.counter - 180
      }

      if (this.counter === 180) {
        this.rotate.top = 0
        this.rotate.bottom = 0
      }
      if (this.counter < 180) {
        requestAnimationFrame(this.move);
      }
    },
    setValues() {
      this.count.topFont = this.value;
      this.count.bottomFont = this.value;
      this.count.topBack = this.nextValue;
      this.count.bottomBack = this.value;
      this.counter = 0;
      requestAnimationFrame(this.move);
    },
    updateCounter() {
      this.setValues();
    },
  },
  watch: {
    value() {
      this.updateCounter();
    },
  },
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
.flip-clock {
  display: flex;
  justify-content: center;
  align-items: center;
  width: v-bind(widthPx);
    height: v-bind(widthPx);

  .flip-card {
    width: v-bind(widthPx);
    height: v-bind(widthPx);
    perspective: 1000000px;
    position: relative;

     .flip-clock-label {
      position: absolute;
      top: 5%;
      left: 5%;
      z-index: 4;
      font-size: v-bind(labelFont);
      font-weight: 400;
      color: #fff;
      text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  }

    .flip-card-font-top,
    .flip-card-font-bottom {
      filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.5));
    }

    .flip-card-font-top,
    .flip-card-font-bottom,
    .flip-card-back-top,
    .flip-card-back-bottom {
      width: v-bind(widthPx);
      height: v-bind(widthPx);
      font-size: v-bind(fontSize);
      font-weight: 700;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 2;
      position: absolute;
      backface-visibility: hidden;
      background-color: var(--bg-color);
      border-radius: 8px;
      // allow 3d transform
      transform-style: preserve-3d;
      box-shadow: inset 3px 1px 17px #191919e0;
    }

    .flip-card-font-top {
      clip-path: polygon(0 0, 100% 0, 100% 50%, 0 50%);
      transform-origin: center;
    }

    .flip-card-font-bottom {
      clip-path: polygon(0 50%, 100% 50%, 100% 100%, 0 100%);
      transform-origin: center;
    }

    .flip-card-back-top,
    .flip-card-back-bottom {
      z-index: 1;
    }

    .flip-card-back-top {
      clip-path: polygon(0 0, 100% 0, 100% 50%, 0 50%);
    }

    .flip-card-back-bottom {
      clip-path: polygon(0 50%, 100% 50%, 100% 100%, 0 100%);
    }
  }

  .flip-line {
    width: 100%;
    height: 2px;
    background-color: var(--bg-color);
    position: absolute;
    top: 50%;
    z-index: 3;
  }
}
</style>
