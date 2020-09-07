<template>
  <v-app-bar app clipped-right class="header">
    <nuxt-link to="/" class="d-block pa-4 align-center">
      <span class="svg block">
        <logo />
      </span>
    </nuxt-link>
    <v-app-bar-nav-icon class="d-flex d-sm-none" @click="toglleIsDrawer()" />
    <v-spacer />
    <main-menu class="row-1-1 d-none d-sm-flex" />
    <lang-menu />
    <user-profile />

    <!-- <AppHeaderUser /> -->

    <v-menu bottom right />
    <!-- <Toastr /> -->
  </v-app-bar>
</template>

<script lang="ts">
import MainMenu from './MainMenu.vue';
import LangMenu from './LangMenu.vue';
import UserProfile from './UserProfile.vue';
import { getSvg } from '~/app/utils/svgs';
import Logo from '~/components/app/Logo.vue';
export default {
  name: 'AppHeader',
  components: {
    MainMenu,
    LangMenu,
    UserProfile,
    Logo,
  },
  data: () => ({
    isDrawer: false,
    logo: getSvg('logo'),
  }),
};
</script>
