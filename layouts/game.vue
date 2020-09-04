<template>
  <v-app>
    <header class="d-flex">
      <div class="mx-16 pt-2">
        <nuxt-link to="/"> logo </nuxt-link>
      </div>
      <v-btn
        dark
        large
        absolute
        center
        right
        fab
        @click="toglleDrawer(!drawer)"
      >
        <v-icon>mdi-cog</v-icon>
      </v-btn>
      <game-header :drawer="drawer" />
    </header>
    <v-main class="main main--game d-flex align-center justify-center">
      <nuxt />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Ls, userLocalStorage } from '~/app/utils/localStorage';
import { LOGIN } from '~/store/mutations-types.ts';
import GameHeader from '~/components/header/GameHeader.vue';
export default {
  name: `default`,
  components: {
    GameHeader,
  },
  data() {
    return {
      drawer: false,
    };
  },
  mounted() {
    // client side only
    const user = Ls.get(userLocalStorage);
    if (user) {
      this.$store.commit(`user/${LOGIN.CHECK_IN}`, user);
    }
  },
  methods: {
    toglleDrawer(bol: boolean) {
      this.drawer = bol;
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  background-color: $brown;
}
header {
  background-color: $brown;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 9;
}
</style>
