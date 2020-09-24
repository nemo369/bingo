<template>
  <section
    class="landing-page d-flex justify-space-between mx-auto col-1-1 flex-wrap"
  >
    <nuxt-link :to="localePath('/album')" class="card">
      <h2 class="tac">1</h2>
      <v-card elevtion="3" class="d-flex flex-column pa-4 mt-2">
        <div class="lp-img mx-auto mt-16 mb-6">
          <v-img
            class="mx-auto"
            :src="getImgUrl(`layer 41`)"
            width="200"
          ></v-img>
        </div>
        <h3 class="mb-6">Choose and create Your own bingo album for free!</h3>
      </v-card>
    </nuxt-link>
    <div class="card">
      <h2 class="tac">2</h2>
      <v-card elevtion="3" class="d-flex flex-column card pa-4 mt-2">
        <div class="lp-img mx-auto mt-16 mb-6">
          <v-img
            class="mx-auto"
            :src="getImgUrl(`layer 3_58`)"
            width="200"
          ></v-img>
        </div>
        <h3 class="mb-6">Invite Friends to play with you</h3>
      </v-card>
    </div>
    <div class="card">
      <h2 class="tac">3</h2>
      <v-card elevtion="3" class="d-flex flex-column card pa-4 mt-2">
        <div class="lp-img mx-auto mt-16 mb-6">
          <v-img
            class="mx-auto"
            :src="getImgUrl(`layer 43`)"
            width="200"
          ></v-img>
        </div>
        <h3 class="mb-6">Play for real prizes and winnings</h3>
      </v-card>
    </div>
    <div class="card">
      <h2 class="tac">4</h2>
      <v-card elevtion="3" class="d-flex flex-column card pa-4 mt-2">
        <div class="lp-img mx-auto mt-16 mb-6">
          <v-img
            class="mx-auto"
            :src="getImgUrl(`layer 42`)"
            width="200"
          ></v-img>
        </div>
        <h3 class="mb-6">It's Bingo time</h3>
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
  methods: {
    getImgUrl(file) {
      return require(`~/assets/pngs/${file}.png`);
    },
  },
};
</script>

<style lang="scss" scoped>
.landing-page {
  max-width: 1280px;
}
h2 {
  color: $op-color;
  transition: all 0.3s;
}
.lp-img {
  height: 75px;
  overflow: hidden;
}
.card {
  flex: 1 0 250px;
  // height: 290px;
  overflow: hidden;
  margin: 0 2px;
  &:hover {
    * {
      color: $prim-color;
    }
  }
  h3 {
    height: 75px;
  }
}
</style>
