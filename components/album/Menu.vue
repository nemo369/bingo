<template>
  <v-tabs v-model="currentRoute">
    <a
      v-for="route in routes"
      :key="route.link"
      class="li"
      @click="reDirect(route)"
    >
      <v-tab ripple class="row-1-1">
        {{ $t(route.text) }}
      </v-tab>
    </a>
  </v-tabs>
</template>

<script>
import { newAlbum } from '~/store/album';
export default {
  name: 'AlbumMenu',
  computed: {
    routes() {
      const routes = this.$router.options.routes.find(
        (route) => route.path === '/album'
      );
      if (!routes || !routes.children) {
        return [];
      }
      return routes.children
        .filter((route) => !!route.path)
        .map((route) => ({
          ...route,
          text: this.$t(route.path),
        }));
    },
    currentRoute: {
      get() {
        const routes = this.$router.options.routes.find(
          (route) => route.path === '/album'
        );
        const index = routes.children
          .filter((route) => !!route.path)
          .findIndex(
            (route) => `/album/${route.path}` === this.$nuxt.$route.path
          );
        return index;
      },
      set: () => {},
    },
  },
  methods: {
    isActive(href) {
      const currentRoute = this.$nuxt.$route.path;
      return currentRoute.includes(href);
    },
    reDirect(menu) {
      if (menu.path === 'create_a_bingo') {
        console.log(menu.path);
        this.$store.dispatch('album/setAlbum', newAlbum());
      }
      this.$router.push(this.localePath({ name: `album-${menu.path}` }));
    },
  },
};
</script>

<style></style>
