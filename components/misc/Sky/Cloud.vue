<template functional>
  <div
    :key="data.key"
    :style="data.style"
    :class="data.staticClass"
    v-bind="data.attrs"
    v-on="listeners"
  >
    <div class="cloud cloud-base" :style="{ width: props.width + 'px' }"></div>
    <div
      class="cloud cloud-back"
      :style="{ width: props.width * 0.85 + 'px' }"
    ></div>
    <div
      class="cloud cloud-mid"
      :style="{ width: props.width * 0.9 + 'px' }"
    ></div>
    <div
      class="cloud cloud-front"
      :style="{ width: props.width * 0.8 + 'px' }"
    ></div>
    <svg width="0" height="0">
      <!--Top Layer-->
      <filter id="filter-base">
        <feTurbulence
          type="fractalNoise"
          :baseFrequency="props.baseFrequency"
          :numOctaves="props.numOctaves"
          :seed="props.seed"
        />
        <feDisplacementMap in="SourceGraphic" :scale="props.scale" />
      </filter>
      <filter id="filter-back">
        <feTurbulence
          type="fractalNoise"
          :baseFrequency="props.baseFrequency"
          :numOctaves="props.numOctaves"
          :seed="props.seed"
        />
        <feDisplacementMap in="SourceGraphic" :scale="props.scale" />
      </filter>
      <filter id="filter-mid">
        <feTurbulence
          type="fractalNoise"
          :baseFrequency="props.baseFrequency"
          :numOctaves="props.numOctaves"
          :seed="props.seed"
        />
        <feDisplacementMap in="SourceGraphic" :scale="props.scale" />
      </filter>
      <filter id="filter-front">
        <feTurbulence
          type="fractalNoise"
          :baseFrequency="props.baseFrequency"
          :numOctaves="props.numOctaves"
          :seed="props.seed"
        />
        <feDisplacementMap in="SourceGraphic" :scale="scale" />
      </filter>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'Cloud',
  props: {
    blur: {
      type: Number,
      default: 58,
      validate(val) {
        return val >= 0 && val <= 100
      },
    },
    spread: {
      type: Number,
      default: 28,
      validate(val) {
        return val >= 0 && val <= 50
      },
    },
    baseFrequency: {
      type: Number,
      default: 0.011,
      validate(val) {
        return val >= 0.001 && val <= 0.1
      },
    },
    numOctaves: {
      type: Number,
      default: 9,
      validate(val) {
        return val >= 0 && val <= 10
      },
    },
    scale: {
      type: Number,
      default: 150,
      validate(val) {
        return val >= 0 && val <= 500
      },
    },
    seed: {
      type: Number,
      default: 9,
      validate(val) {
        return val >= 0 && val <= 1000
      },
    },
    width: {
      type: Number,
      default: 600,
    },
    height: {
      type: Number,
      default: 100,
    },
  },
}
</script>

<style scoped>
.cloud {
  height: 100px;
  border-radius: 50%;
  position: absolute;
}

.cloud-base {
  height: 100px;
  filter: url(#filter-base);
  box-shadow: 200px 170px 19px 40px rgba(255, 255, 255, 0.9);
}
.cloud-back {
  height: 30px;
  filter: url(#filter-back);
  box-shadow: 200px 200px 10px 40px rgba(215, 215, 215, 0.3);
}

.cloud-mid {
  top: -10px;
  height: 35px;
  filter: url(#filter-mid);
  box-shadow: 210px 250px 28px 30px rgba(66, 105, 146, 0.2);
}

.cloud-front {
  top: -30px;
  height: 40px;
  left: -20px;
  filter: url(#filter-front);
  box-shadow: 210px 272px 30px 0px rgba(0, 0, 0, 0.4);
}
</style>
