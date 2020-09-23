<template>
  <v-app>
    <game-main-header />
    <v-main class="main main--game d-flex align-center justify-center">
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
import GameMainHeader from '~/components/game/GameMainHeader.vue';

export default {
  name: `gameWrapper`,
  components: {
    GameMainHeader,
  },
};
</script>

<style lang="scss" scoped>
.main {
  background-color: $app-brown;
}
</style>
