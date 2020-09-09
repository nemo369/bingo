<template>
  <v-app-bar app clipped-right class="header">
    <nuxt-link to="/" class="d-block pa-4 align-center">
      <span class="svg block">
        <logo />
      </span>
    </nuxt-link>
    <v-spacer />
    <main-menu class="row-1-1 d-none d-sm-flex" />
    <user-profile />
    <v-app-bar-nav-icon
      class="d-flex d-sm-none ml-auto"
      @click="toglleIsDrawer(!isDrawer)"
    />

    <app-side-bar :drawer="isDrawer" />
    <!-- <AppHeaderUser /> -->

    <v-menu bottom right />
    <!-- <Toastr /> -->
  </v-app-bar>
</template>

<script>
import MainMenu from './MainMenu.vue';
import UserProfile from './UserProfile.vue';
import { getSvg } from '~/app/utils/svgs';
import Logo from '~/components/app/Logo.vue';
import AppSideBar from '~/components/header/AppSideBar.vue';
export default {
  name: 'AppHeader',
  components: {
    MainMenu,
    UserProfile,
    AppSideBar,
    Logo,
  },
  data() {
    return {
      isDrawer: false,
      logo: getSvg('logo'),
    };
  },
  methods: {
    toglleIsDrawer(bol) {
      this.isDrawer = bol;
    },
  },
};
</script>

<style lang="scss" scoped></style>
