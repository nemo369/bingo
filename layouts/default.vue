<template>
  <v-app>
    <AppHeader />
    <v-main class="main">
      <v-container class="container">
        <nuxt />
      </v-container>
    </v-main>
    <AppFooter />
  </v-app>
</template>

//
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
  created() {
    // client side only
    if (process.browser) {
      this.logUserIn();
    }
  },
  methods: {
    logUserIn() {
      console.log(this.$auth.user);
      // this.$axios.defaults.headers.common.Authorization = `Token ${user.token}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  background-color: #ffffff;
  padding: 15px 10px;
  max-width: 1320px;
  height: 100%;
  margin: 4px auto;
}
.main {
  background-color: #e5e5e5;
}
</style>
