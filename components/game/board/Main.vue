<template>
  <main ref="infoBox" class="game-main ovh">
    <transition
      name="slide-fade"
      mode="out-in"
      @after-enter="className = 'active'"
      @after-leave="className = ''"
    >
      <div
        v-if="ball"
        :key="ball.asset_id"
        class="pa-4 relative effect"
        :class="className"
      >
        <div
          class="badge absolute py-1 px-2 tac d-flex flex-column align-center rounded"
          :class="className"
        >
          <span class="effect__info"></span>
          {{ ball.title }} title
          <span v-if="ball.ballNumber" class="effect__location"
            >#{{ ball.ballNumber | onlyDigs }}</span
          >
        </div>
        <cld-image
          :public-id="ball.public_id"
          :height="height"
          crop="scale"
          fetch-format="auto"
          quality="auto"
          loading="lazy"
          class="d-flex justify-center"
        />
      </div>
    </transition>
  </main>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'GameMain',
  props: {
    picture: { type: Object, default: null },
  },
  data() {
    return {
      height: 200,
      className: null,
    };
  },
  computed: {
    ...mapGetters({
      ball: 'game/getDrawnBall',
    }),
  },
  mounted() {
    this.height = this.$refs.infoBox.clientHeight - 20;
  },
};
</script>

<style lang="scss" scoped>
.game-main {
  height: 100%;
}
.badge {
  top: 4px;
  left: 4px;
  background-color: $prim-color;
  color: $white;
  font-size: 18px;
  transition: all 1s ease;
  transition-delay: 0.2s;
  transform: translate(-200%, 30%);
}
.slide-fade-enter-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter
/* .slide-fade-leave-active for <2.1.8 */ {
  transform: translate(-75%, -35%) skewY(5deg) scale(0.3);
  border-radius: 50%;
  overflow: hidden;
  max-width: 50%;
  max-height: 50%;
}
.badge.active {
  transform: translate(0);
}
.effect {
  border-radius: 50%;
  overflow: hidden;
  max-width: 30%;
  max-height: 30%;
  transition: all 0.5s;
}
.effect.active {
  border-radius: 50%;
  max-width: 100%;
  max-height: 100%;
}
</style>
