<template>
  <main class="game-main ovh">
    <div v-if="ball">
      <v-img :src="ball.url" :cover="true"> </v-img>
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

<style lang="scss" scoped>
.game-main {
  height: 100%;
}
</style>
