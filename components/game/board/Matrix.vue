<template>
  <aside v-if="pictures" class="game-matrix ovh relative">
    <div class="full">
      <transition-group
        name="flip-list"
        tag="ul"
        class="full px-2 py-0 d-grid grid"
      >
        <li
          v-for="(pic, index) in [...pictures].slice(0, 7)"
          :key="pic.ballNumber"
          class="grid-item relative pa-2"
          :class="`grid-item--${index + 1}`"
        >
          <v-badge
            color="green"
            :content="pic.ballNumber"
            overlap
            left
            top
            class=""
          >
            <img :src="pic.url" class="" />
          </v-badge>
        </li>
      </transition-group>
    </div>

    <v-btn color="primary" class="next-btn" @click="nextBall">{{
      $t('Next Picture')
    }}</v-btn>
  </aside>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'GameMatrix',
  data() {
    return {
      selector: '.grid',
      items: ['a', 'b', 'c'],
      options: {
        itemSelector: '.grid-item',
        columnWidth: 180,
        percentPosition: false,
        fitWidth: true,
        transitionDuration: '1.8s',
        stagger: 30,
      },
    };
  },
  computed: {
    ...mapGetters({
      pictures: 'game/getBallsPicked',
    }),
  },
  watch: {
    pictures() {
      // msnry.layout();
      this.items.unshift('aaa');
    },
  },
  mounted() {},

  methods: {
    nextBall() {
      this.$store.dispatch('game/setPicNum', { women: 2, ppl: 2 });
      setTimeout(() => {
        this.$store.dispatch('game/setPicNum', { women: 1, ppl: 1 });
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
