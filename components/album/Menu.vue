<template>
  <v-tabs v-model="currentRoute">
    <v-tab v-for="route in routes" :key="route.link" ripple>
      <nuxt-link :to="localePath(`/album/${route.path}`)" class="li">
        {{ $t(route.text) }}
      </nuxt-link>
    </v-tab>
  </v-tabs>
</template>

<script lang="ts">
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
          text: route.path,
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
    isActive(href: string): boolean {
      const currentRoute: string = this.$nuxt.$route.path;
      return currentRoute.includes(href);
    },
  },
};
</script>

<style></style>
