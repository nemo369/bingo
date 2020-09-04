<template>
  <aside class="game-matrix">
    <h3>matrix</h3>
  </aside>
</template>

<script lang="ts">
export default {
  name: 'GameMatrix',
  props: {
    pictures: { type: Array, default: () => [] },
  },
};
</script>

<style lang="scss" scoped></style>
