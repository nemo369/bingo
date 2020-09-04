<template>
  <div class="game-counter relative">
    <h3 class="h3-circle">
      <span class="mr-3">{{ curentNum }} </span>
      <span class="span-b">/</span>
      <span class="ml-3">{{ total }}</span>
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
</style>
