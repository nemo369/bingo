<template>
  <div class="card pa-2 rounded">
    <header class="card__header d-flex justify-space-around align-center">
      <div class="user-avatar">N.F</div>
      <div class="card-number">N.45</div>
    </header>
    <div
      class="card-grid"
      :class="`shape-${card.card.row}x${card.card.column}`"
      :style="{
        gridTemplateColumns: `repeat(${card.card.row}, 1fr)`,
        gridTemplateRows: ` repeat(${card.card.column}, 1fr)`,
      }"
    >
      <div
        v-for="index in (card.card.row * card.card.column)"
        :key="index"
        class="pic rounded relative"
      >
        <v-badge :content="index" overlap color="green"></v-badge>
        <v-img
          v-if="card.pictures[index]"
          class="pic"
          :src="card.pictures[index].url"
        ></v-img>
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
import { getSvg } from '~/app/utils/svgs';

export default {
  name: 'Card',
  props: ['card'],
  data: () => ({
    noImg: getSvg('noImg'),
  }),
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
.v-badge {
  position: absolute;
  top: 4px;
  left: 6px;
  font-size: 10px;
}
</style>
