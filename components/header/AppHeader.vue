<template>
  <v-app-bar app clipped-right class="header">
    <nuxt-link to="/" class="d-flex align-center">
      <span class="svg block" v-html="logo" />
    </nuxt-link>
    <v-app-bar-nav-icon class="d-flex d-sm-none" @click="toglleIsDrawer()" />
    <v-spacer />
    <main-menu class="row-1-1 d-none d-sm-flex" />
    <lang-menu />

    <!-- <AppHeaderUser /> -->

    <v-menu bottom right />
    <!-- <Toastr /> -->
  </v-app-bar>
</template>

<script lang="ts">
import MainMenu from './MainMenu.vue';
import LangMenu from './LangMenu.vue';
import { getSvg } from '~/app/utils/svgs';
export default {
  name: 'AppHeader',
  components: {
    MainMenu,
    LangMenu,
  },
  data: () => ({
    isDrawer: false,
    logo: getSvg('logo'),
  }),
};
</script>
