<template>
  <aside v-if="pictures" class="game-matrix ovh relative">
    <ul class="grid">
      <masonry :selector="selector" :options="options" :data="pictures">
        <template slot-scope="data">
          <li class="grid-item" :class="`${!data.index ? 'grid-sizer' : ''}`">
            <img :src="data.current.url" class="full" />

            <!-- Current item: {{ data.current }} -->
          </li>
        </template>
      </masonry>
    </ul>

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
  data() {
    return {
      selector: '.grid',
      options: {
        columnWidth: 200,
        gutter: 5,
        percentPosition: true,
        itemSelector: '.grid-item',
        fitWidth: true,
        stagger: 300,
        transitionDuration: '1.8s',
        // ,        originLeft: false
        // ,        originTop: false
      },
    };
  },
  computed: {
    ...mapGetters({
      pictures: 'game/getBallsPicked',
    }),
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.next-btn {
  position: absolute;
  right: 5px;
  bottom: 5px;
}
.grid {
  height: 100%;
}
.grid-sizer,
.grid-item {
  width: 20%;
}
/* 2 columns wide */
.grid-item--width2 {
  width: 40%;
}
</style>
