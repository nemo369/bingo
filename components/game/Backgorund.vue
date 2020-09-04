<template>
  <div class="full relative backgorund">
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
        :class="`full absolute currentPpl ${
          index === currentPpl ? 'active' : ''
        }`"
        :style="index === currentPpl ? 'opacity:1' : 'opacity:0'"
        loading="eager"
      />
    </div>
    <div>
      <img
        v-for="index in 4"
        :key="index"
        :src="getImgUrl(`women_0${index}`)"
        :class="`full absolute women ${index === women ? 'active' : ''}`"
        :style="index === women ? 'opacity:1' : 'opacity:0'"
        loading="eager"
      />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data: () => ({
    currentPpl: 1,
    women: 1,
  }),
  mounted() {
    // setInterval(() => {
    //   this.currentPpl = this.currentPpl < 4 ? this.currentPpl + 1 : 1;
    //   this.women = this.women < 4 ? this.women + 1 : 1;
    // }, 1000);
  },
  methods: {
    getImgUrl(file: string) {
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
