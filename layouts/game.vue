<template>
  <v-app>
    <header class="d-flex game-header">
      <div class="mx-2 pt-2">
        <nuxt-link to="/">
          <span class="svg block">
            <logo />
          </span>
        </nuxt-link>
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

<script>
import { Ls, userLocalStorage } from '~/app/utils/localStorage';
import { LOGIN } from '~/store/mutations-types.ts';
import GameHeader from '~/components/header/GameHeader.vue';
import Logo from '~/components/app/Logo.vue';

export default {
  name: `default`,
  components: {
    GameHeader,
    Logo,
  },
  data() {
    return {
      drawer: false,
    };
  },
  mounted() {
    // client side only
    // const user = Ls.get(userLocalStorage);
    // if (user) {
    //   this.$store.commit(`user/${LOGIN.CHECK_IN}`, user);
    // }
  },
  methods: {
    toglleDrawer(bol) {
      this.drawer = bol;
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  background-color: $app-brown;
}
header {
  // background-color: rgba(0, 0, 0, 0.308);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9;
}
</style>
