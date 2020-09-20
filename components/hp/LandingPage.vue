<template>
  <section class="d-flex justify-space-between mx-auto col-1-1 flex-wrap">
    <nuxt-link :to="localePath('/album')" class="card">
      <h2 class="tac">1</h2>
      <v-card elevtion="3" class="d-flex flex-column pa-4 mt-2">
        <div class="svg block mx-auto mt-16 mb-6" v-html="noImg"></div>
        <h3 class="mb-6">ChooseYour bingo album</h3>
      </v-card>
    </nuxt-link>
    <div class="card">
      <h2 class="tac">2</h2>
      <v-card elevtion="3" class="d-flex flex-column card pa-4 mt-2">
        <div class="svg block mx-auto mt-16 mb-6" v-html="noImg"></div>
        <h3 class="mb-6">ChooseYour bingo album</h3>
      </v-card>
    </div>
    <div class="card">
      <h2 class="tac">3</h2>
      <v-card elevtion="3" class="d-flex flex-column card pa-4 mt-2">
        <div class="svg block mx-auto mt-16 mb-6" v-html="noImg"></div>
        <h3 class="mb-6">ChooseYour bingo album</h3>
      </v-card>
    </div>
    <div class="card">
      <h2 class="tac">4</h2>
      <v-card elevtion="3" class="d-flex flex-column card pa-4 mt-2">
        <div class="svg block mx-auto mt-16 mb-6" v-html="noImg"></div>
        <h3 class="mb-6">ChooseYour bingo album</h3>
      </v-card>
    </div>
  </section>
</template>

<script>
import { getSvg } from '~/app/utils/svgs';

export default {
  name: 'LandingPage',
  data: () => ({
    loading: false,
    noImg: getSvg('noImg'),
  }),
  methods: {},
};
</script>

<style lang="scss" scoped>
h2 {
  color: $op-color;
  transition: all 0.3s;
}

.card {
  flex: 1 0 auto;
  margin: 0 2px;
  &:hover {
    * {
      color: $prim-color;
    }
  }
}
</style>
