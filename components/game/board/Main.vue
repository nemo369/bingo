<template>
  <main class="game-main ovh">
    <div v-if="ball" class="pa-4">
      <v-badge color="green" class="full" ball-ball-number- overlap left top>
        <v-img :src="ball.url" :cover="true" max-height="385"> </v-img>
      </v-badge>
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
