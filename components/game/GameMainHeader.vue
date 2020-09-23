<template>
  <header class="d-flex game-header">
    <div class="mx-2 pt-2">
      <nuxt-link to="/">
        <span class="svg block">
          <logo />
        </span>
      </nuxt-link>
    </div>
    <v-btn dark large absolute center right fab @click="toglleDrawer(!drawer)">
      <v-icon>mdi-cog</v-icon>
    </v-btn>
    <game-header :drawer="drawer" />
  </header>
</template>

<script>
import GameHeader from '~/components/header/GameHeader.vue';
import Logo from '~/components/app/Logo.vue';

export default {
  name: `GameMainHeader`,
  components: {
    GameHeader,
    Logo,
  },
  data() {
    return {
      drawer: false,
    };
  },

  methods: {
    toglleDrawer(bol) {
      this.drawer = bol;
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  // background-color: rgba(0, 0, 0, 0.308);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9;
}
</style>
