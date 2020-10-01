<template>
  <aside v-if="pictures" class="game-matrix ovh relative">
    <div class="full">
      <transition-group
        name="flip-list"
        tag="ul"
        class="full px-2 py-0 d-grid grid"
      >
        <li
          v-for="(pic, index) in lastPics"
          :key="pic.asset_id"
          class="grid-item relative pa-2"
          :class="`grid-item--${index + 1}`"
        >
          <v-badge
            color="green"
            :content="pic.ballNumber | onlyDigs"
            overlap
            left
            top
            class=""
          >
            <cld-image
              :public-id="pic.public_id"
              width="100"
              crop="fill"
              fetch-format="auto"
              quality="auto"
              loading="lazy"
            />
          </v-badge>
        </li>
      </transition-group>
    </div>

    <v-btn
      color="primary"
      class="next-btn"
      :disabled="disabled"
      :loading="loading"
      @click="nextBall"
      >{{ $t('Next Picture') }}</v-btn
    >
  </aside>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'GameMatrix',
  data() {
    return {
      selector: '.grid',
      lastPics: [],
      loading: false,
      disabled: false,
    };
  },
  computed: {
    ...mapGetters({
      pictures: 'game/getBallsPicked',
      ball: 'game/getDrawnBall',
      isDrawing: 'game/getIsDrawing',
    }),
  },
  watch: {
    pictures() {
      this.lastPics = this.pictures
        .filter((pic) => pic.asset_id !== this.ball.asset_id)
        .slice(0, 7);
    },
    isDrawing() {
      this.disabled = this.isDrawing;
    },
  },
  mounted() {},

  methods: {
    nextBall() {
      this.loading = true;
      this.disabled = true;
      this.$store.dispatch('game/setPicNum', { women: 2, ppl: 2 });
      setTimeout(() => {
        this.$store.dispatch('game/setPicNum', { women: 1, ppl: 1 });
        this.loading = false;
      }, 3000);
      this.$store.dispatch('game/drawBall');
    },
  },
};
</script>

<style lang="scss" scoped>
.next-btn {
  position: absolute;
  right: 5px;
  bottom: 5px;
}
.grid {
  grid-template-columns: repeat(9, 1fr);
  grid-template-rows: repeat(9, 1fr);
  height: 100%;
}
.flip-list-move {
  transition: transform 1s;
}
.grid-item--1 {
  grid-row: span 3;
  grid-column: span 3;
}
.grid-item--2,
.grid-item--3 {
  grid-row: span 2;
  grid-column: span 2;
}
</style>
