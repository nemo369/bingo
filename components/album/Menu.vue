<template>
  <v-tabs v-model="currentRoute">
    <nuxt-link
      v-for="route in routes"
      :key="route.link"
      :to="localePath(`/album/${route.path}`)"
      class="li"
    >
      <v-tab ripple class="row-1-1">
        {{ $t(route.text) }}
      </v-tab>
    </nuxt-link>
  </v-tabs>
</template>

<script>
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
  },
};
</script>

<style></style>
