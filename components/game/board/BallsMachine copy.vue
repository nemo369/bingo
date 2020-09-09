<template>
  <aside class="game-balls-machine relative row-1-1" :class="{ full: !spin }">
    <div class="machine">
      <div class="spin" :class="{ animation: spin }">
        <div
          v-for="(ball, i) in balls"
          :key="i"
          class="ball"
          :class="{ animation: spin }"
          :style="{
            left: `${getRandNum(-70, 70)}%`,
            bottom: `${getRandNum(0, 45)}%`,
            animationDuration: `1.${getRandNum(0, 50)}s`,
          }"
        >
          <img :src="ball.url" />
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'GameBallsMachine',
  props: {
    balls: { type: Array, default: () => [] },
    spin: { type: Boolean, default: () => false },
  },
  data() {
    return {};
  },
  methods: {
    getRandNum(min = 0, max = 100) {
      return Math.round(Math.random() * (max - min) + min);
    },
  },
};
</script>

<style lang="scss" scoped>
.game-balls-machine.full {
  width: 260px;
  height: 260px;
  margin-top: 25px;
}
.game-balls-machine {
  border-radius: 50%;
  border-radius: 50%;
  height: 180px;
  /* overflow: hidden; */
  width: 180px;
  margin: 70px auto 0;
}

.spin {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  transition: top 1s linear;
}
.spin.animation {
  animation: spin 3s linear infinite;
}
@keyframes spin {
  100% {
    transform: rotate(1turn);
  }
}

.ball.animation {
  animation: ball 0.4s linear infinite;
  transform: rotate(var(--rot));
}
@keyframes ball {
  50% {
    transform: rotate(var(--rot)) translateY(100%);
  }
}
.ball {
  --rot: 0deg;
  position: absolute;
  width: 45px;
  height: 45px;
  background: rgb(0, 255, 21);
  border-radius: 50%;
  left: 0;
  right: 0;
  margin: auto;
  bottom: 0;
  img {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }
}
@for $i from 1 to 100 {
  .ball:nth-of-type(#{$i}) {
    --rot: #{$i * 10}deg;
    // animation-delay: -#{$i}s;
  }
}
</style>
