<template>
  <div>
    <span class="my-2 pa-2 d-block"
      >{{ addText }}&nbsp;<b>{{ condition.title }}</b></span
    >
    <div
      class="board d-grid board-animation"
      :class="
        condition.title && condition.title.toLowerCase
          ? condition.title.toLowerCase().split(' ').join('-')
          : ''
      "
      :style="{
        gridTemplateColumns: `repeat(${condition.row}, 1fr)`,
        gridTemplateRows: ` repeat(${condition.column}, 1fr)`,
      }"
    >
      <div
        v-for="index in condition.row * condition.column"
        :key="index"
        class="full d-flex align-center justify-center board__cell ovh"
        :class="`row-${condition.row} cell-${index + 1}`"
      >
        <cld-image
          v-if="album.pictures[index]"
          :public-id="album.pictures[index].public_id"
          width="100"
          height="100"
          crop="fit"
          fetch-format="auto"
          quality="auto"
          loading="lazy"
          class="full"
        />
        <span v-else class="svg block" v-html="noImg"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getSvg } from '~/app/utils/svgs';

export default {
  name: 'DumiBoard',
  props: ['condition', 'addText'],
  data: () => ({
    noImg: getSvg('noImg'),
  }),
  computed: {
    ...mapGetters({
      album: 'album/getAlbum',
    }),
  },
};
</script>

<style lang="scss" scoped>
$l-bg-color: #e0e6e9;
$l-primary-color: #a7a7a7;
$l-primary-color-dk: #a3a0ab;
$l-secondary-color: #b73239;
.board {
  background-color: $l-bg-color;
  border-radius: 10px;
  box-shadow: 8px 8px 16px 0 rgba(0, 0, 0, 0.15),
    -8px -8px 12px 0 rgba(255, 255, 255, 0.5);
  border: 3px solid $white;
  width: 200px;
  grid-gap: 1px;
  height: 200px;
  &__cell {
    background-color: $prim-color;
    border-radius: 10px;
    img {
      max-width: unset;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }
}
</style>
