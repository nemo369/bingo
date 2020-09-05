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
  props: {
    currentPpl: {
      type: Number,
      required: true,
    },
    women: {
      type: Number,
      required: true,
    },
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
