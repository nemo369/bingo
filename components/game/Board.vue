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
  grid-template-rows: repeat(9 1fr);
  grid-gap: 4px;
  padding: 6px 0 16px;
}
.game-main {
  background-color: $sec-color;
  grid-row: 1/3;
  grid-column: 1/8;
}
.game-matrix {
  background-color: $sec-color;

  grid-row: 3;
  grid-column: 1/8;
}
.game-prizes {
  background-color: $sec-color;
  grid-row: 1/4;
  grid-column: 8/10;
}
.game-counter {
  position: absolute;
  left: 74%;
  top: 58%;
}
</style>
