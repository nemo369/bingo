<template>
  <div class="game-counter">
    <h3>{{ curentNum }}/{{ total }}</h3>
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

<style lang="scss" scoped></style>
