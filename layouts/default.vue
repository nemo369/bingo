<template>
  <v-app>
    <AppHeader />
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script>
import AppHeader from '~/components/header/AppHeader.vue';
import AppFooter from '~/components/footer/AppFooter.vue';
export default {
  name: `default`,
  components: {
    AppFooter,
    AppHeader,
  },
  data() {
    return {};
  },
};
</script>
