<template>
  <main class="game-main">
    <h3>Cureent img</h3>
  </main>
</template>

<script lang="ts">
export default {
  name: 'GameMain',
  props: {
    picture: { type: Object, default: null },
  },
};
</script>

<style lang="scss" scoped></style>
