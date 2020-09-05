<template>
  <section class="panel full relative py-1">
    <img :src="getImgUrl(`panel-border`)" loading="eager" class="game-border" />
    <game-balls-machine :balls="ballsInMachine" :spin="false" />
  </section>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';
import GameBallsMachine from './board/BallsMachine.vue';

export default {
  name: 'Panel',
  components: {
    GameBallsMachine,
  },
  data(): {} {
    return {};
  },
  computed: {
    ...mapGetters({
      game: 'game/getGame',
      ballsInMachine: 'game/getBallsInMachine',
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
.panel {
  background-color: $white;
}
.fade-enter-active {
  transition: opacity 3s ease-in-out;
}

.fade-enter-to {
  opacity: 1;
}

.fade-enter {
  opacity: 0;
}
.h2 {
  font-size: rem(18);
  text-align: center;
}
</style>
