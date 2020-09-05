<template>
  <div v-if="game" class="screen full relative">
    <img
      :src="getImgUrl(`screen-border`)"
      loading="eager"
      class="game-border"
    />

    <game-main />
    <game-matrix />
    <game-prizes />
    <game-counter :curent-num="0" :total="game.album.pictures.length" />
  </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';
import GameMain from './board/Main.vue';
import GameMatrix from './board/Matrix.vue';
import GameCounter from './board/Counter.vue';
import GamePrizes from './board/GamePrizes.vue';
export default {
  components: {
    GameMatrix,
    GameCounter,
    GameMain,
    GamePrizes,
  },
  computed: {
    ...mapGetters({
      game: 'game/getGame',
    }),
  },
  methods: {
    getImgUrl(file: string) {
      return require(`~/assets/pngs/${file}.png`);
    },
  },
};
</script>

<style lang="scss" scoped>
.screen {
  background-color: $white;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-template-rows: repeat(9, 1fr);
  grid-gap: 4px;
  padding: 6px 0 16px;
  z-index: 3;
}
.game-main {
  background-color: $sec-color;
  grid-row: 1/7;
  grid-column: 1/8;
  z-index: 3;
}
.game-matrix {
  background-color: $sec-color;
  z-index: 3;
  grid-row: 7/10;
  grid-column: 1/8;
}
.game-prizes {
  background-color: $sec-color;
  grid-row: 1/10;
  grid-column: 8/10;
  z-index: 3;
}
.game-counter {
  position: absolute;
  left: 74%;
  z-index: 4;
  top: 58%;
}
</style>
