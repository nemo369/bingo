<template>
  <div class="card pa-2 rounded">
    <header
      v-if="player"
      class="card__header d-flex justify-space-around align-center"
    >
      <div class="user-avatar">{{ player.nickname }}</div>
      <div class="card-number">N.{{ player.playerId }}</div>
    </header>
    <div
      class="card-grid"
      :class="`shape-${card.row}x${card.column}`"
      :style="{
        gridTemplateColumns: `repeat(${card.row}, 1fr)`,
        gridTemplateRows: ` repeat(${card.column}, 1fr)`,
      }"
    >
      <div
        v-for="index in card.row * card.column"
        :key="index"
        class="pic rounded relative"
      >
        <v-avatar overlap color="green" size="12">
          <span class="white--text">{{ index }}</span>
        </v-avatar>
        <cld-image
          v-if="card.pictures[index - 1]"
          :public-id="card.pictures[index - 1].public_id"
          width="200"
          crop="scale"
          fetch-format="auto"
          quality="auto"
          loading="lazy"
        />
        <div
          v-else
          class="svg block full d-flex align-center justify-center"
          v-html="noImg"
        ></div>
      </div>
    </div>
    <footer class="card__footer">
      <div class="logo">LOGO</div>
      <div class="game-pin">#547</div>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getSvg } from '~/app/utils/svgs';

export default {
  name: 'Card',
  // eslint-disable-next-line vue/require-prop-types
  props: ['card'],
  data: () => ({
    noImg: getSvg('noImg'),
  }),
  computed: {
    ...mapGetters({
      player: 'player/getPlayer',
    }),
  },
};
</script>

<style lang="scss" scoped>
.card {
  background-color: #d9dbda;
  &__header {
    height: 50px;
    border: 2px solid $black;
  }
}
.card-grid {
  display: grid;
  height: 250px;
}
.card-grid.shape-3x3 {
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
}
.pic {
  background: #c4c4c4;
  align-items: center;
  justify-content: center;
  border: 1px solid $black;
}
.v-avatar {
  position: absolute;
  top: 0px;
  left: 0px;
  * {
    font-size: 12px;
  }
}
</style>
