<template>
  <div class="game-counter relative">
    <h3 class="h3-circle">
      <span class="mr-3 ovh num-container" :class="{ isAnimation }">
        <span class="num">{{ num }} </span>
        <span class="prevNum">{{ prevNum }} </span>
      </span>
      <span class="span-b">/</span>
      <span class="ml-4 mt-1">{{ total }}</span>
    </h3>
  </div>
</template>

<script lang="ts">
export default {
  name: 'GameCounter',
  props: {
    curentNum: { type: Number, default: () => 0 },
    total: { type: Number, default: () => 0 },
  },
  data() {
    return {
      num: 0,
      prevNum: 0,
      isAnimation: false,
    };
  },
  watch: {
    curentNum(newVal: number, oldVal: number) {
      if (!oldVal) {
        this.num = newVal;
        return;
      }
      this.setCount(newVal, oldVal);
    },
  },
  methods: {
    setCount(newVal: number, oldVal: number) {
      this.num = oldVal;
      this.prevNum = newVal;
      this.isAnimation = true;
      setTimeout(() => {
        this.num = newVal;
        this.prevNum = oldVal;
        this.isAnimation = false;
      }, 1010);
    },
  },
};
</script>

<style lang="scss" scoped>
.h3-circle {
  width: 65px;
  background-color: $sec-color;

  height: 65px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  box-shadow: 3px 3px 7px 0 rgba(0, 0, 0, 0.15),
    -3px -3px 7px 0 rgba(148, 148, 148, 0.5);
}
.span-b {
  top: 34%;
  left: 50%;
  position: absolute;
}
.num-container {
  display: flex;
  flex-direction: column;
  height: 16px;
}
.isAnimation {
  .num,
  .prevNum {
    transition: all 1s ease-out;
  }
  .num {
    transform: translateY(-100%);
  }
  .prevNum {
    transform: translateY(-100%);
  }
}
</style>
