<template>
  <div class="relative backgorund">
    <img
      src="~/assets/pngs/background.png"
      class="full absolute board__bg-img"
      loading="eager"
    />
    <div>
      <img
        v-for="index in 4"
        :key="index"
        :src="getImgUrl(`ppl_0${index}`)"
        :class="`full absolute currentPpl ${index === num.ppl ? 'active' : ''}`"
        :style="index === num.ppl ? 'opacity:1' : 'opacity:0'"
        loading="eager"
      />
    </div>
    <div>
      <img
        v-for="index in 4"
        :key="index"
        :src="getImgUrl(`women_0${index}`)"
        :class="`full absolute women ${index === num.women ? 'active' : ''}`"
        :style="index === num.women ? 'opacity:1' : 'opacity:0'"
        loading="eager"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      num: 'game/getPicNum',
    }),
  },
  methods: {
    getImgUrl(file) {
      return require(`~/assets/pngs/${file}.png`);
    },
  },
};
</script>

<style lang="scss" scoped>
img {
  max-width: unset;
}
</style>
