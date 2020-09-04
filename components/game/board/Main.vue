<template>
  <main class="game-main">
    <h3>Cureent img</h3>
    <div v-if="ball">
      {{ ball }}
    </div>
  </main>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';

export default {
  name: 'GameMain',
  props: {
    picture: { type: Object, default: null },
  },
  computed: {
    ...mapGetters({
      ball: 'game/getDrawnBall',
    }),
  },
};
</script>

<style lang="scss" scoped></style>
