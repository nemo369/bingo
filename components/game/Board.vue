<template>
  <div v-if="game && album" class="screen full relative">
    <img
      :src="getImgUrl(`screen-border`)"
      loading="eager"
      class="game-border"
    />

    <game-main />
    <game-matrix />
    <game-prizes @check-bingo="toglleCheckBingo" />
    <game-counter
      :curent-num="album.pictures.length - ballsInMachine.length"
      :total="album.pictures.length"
    />
    <v-dialog v-model="checkBingoDiglaog" persistent width="450px">
      <check-card @check-bingo="toglleCheckBingo" />
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import GameMain from './board/Main.vue';
import GameMatrix from './board/Matrix.vue';
import GameCounter from './board/Counter.vue';
import GamePrizes from './board/GamePrizes.vue';
import CheckCard from './board/CheckCard.vue';
export default {
  components: {
    GameMatrix,
    GameCounter,
    GameMain,
    GamePrizes,
    CheckCard,
  },
  data() {
    return { checkBingoDiglaog: false };
  },
  computed: {
    ...mapGetters({
      game: 'game/getGame',
      album: 'album/getAlbum',
      ballsInMachine: 'game/getBallsInMachine',
    }),
  },
  methods: {
    getImgUrl(file) {
      return require(`~/assets/pngs/${file}.png`);
    },
    toglleCheckBingo({ num, bol }) {
      // if (this.ballsInMachine.length < 3) {
      //   return;
      // }
      this.checkBingoDiglaog = bol;
      this.$store.dispatch('game/setPicNum', { women: num, ppl: num });
    },
  },
};
</script>

<style lang="scss" scoped>
$bg: rgb(31, 31, 31);
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
  background-color: $bg;
  grid-row: 1/7;
  grid-column: 1/8;
  z-index: 3;
}
.game-matrix {
  background-color: $bg;
  z-index: 3;
  grid-row: 7/10;
  grid-column: 1/8;
}
.game-prizes {
  background-color: $bg;
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
