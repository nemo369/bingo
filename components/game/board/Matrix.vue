<template>
  <aside v-if="pictures" class="game-matrix d-grid ovh relative">
    <div v-for="picture in pictures" :key="picture.asset_id">
      <v-img :src="picture.url" aspect-ratio="1" max-width="150"></v-img>
    </div>
    <v-btn
      color="primary"
      class="next-btn"
      @click="$store.dispatch('game/drawBall')"
      >{{ $t('Next Picture') }}</v-btn
    >
  </aside>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';

export default {
  name: 'GameMatrix',
  computed: {
    ...mapGetters({
      pictures: 'game/getBallsPicked',
    }),
  },
};
</script>

<style lang="scss" scoped>
.next-btn {
  position: absolute;
  right: 5px;
  bottom: 5px;
}
</style>
