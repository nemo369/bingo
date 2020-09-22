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
// import AppHeader from '~/components/header/AppHeader.vue';
// import AppFooter from '~/components/footer/AppFooter.vue';
// import { Ls, userLocalStorage } from '~/app/utils/localStorage';
// import { LOGIN } from '~/store/mutations-types.ts';
// export default {
//   name: `default`,
//   components: {
//     AppFooter,
//     AppHeader,
//   },
//   data() {
//     return {};
//   },
//   mounted() {
//     // client side only
//     this.logUserIn();
//     // console.log(this.$auth);
//   },
//   methods: {
//     logUserIn() {
//       if (process.browser) {
//         console.log(this.$auth.$state);
//         // const user = Ls.get(userLocalStorage);
//         // if (user) {
//         // this.$store.commit(`user/${LOGIN.CHECK_IN}`, user);
//         // }
//       }
//     },
//   },
// };
//
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
