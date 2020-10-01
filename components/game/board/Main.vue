<template>
  <main ref="infoBox" class="game-main ovh">
    <div v-if="ball" class="pa-4 relative">
      <div v-if="ball.title" class="badge absolute pa-1" :content="ball.title">
        {{ ball.title }}
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
}
</style>
