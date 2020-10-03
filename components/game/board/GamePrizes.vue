<template>
  <div class="prizes game-prizes d-flex flex-column">
    <div v-if="currentPrize && currentPrize.picture" class="prize">
      <transition name="fade">
        <div :key="currentPrize.picture.public_id">
          <cld-image :public-id="currentPrize.picture.public_id" width="350" />
          <h3 class="h2 tac white--text">
            {{ currentPrize.name | startCase }}
          </h3>
          <div class="tac white--text mt-1">{{ currentPrize.conditon }}</div>
        </div>
      </transition>
    </div>
    <v-btn
      class="mt-auto mx-auto mb-1 white--text"
      color="red"
      @click="checkCard"
      >BINGO/LINE</v-btn
    >
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'GamePrizes',
  components: {},
  data() {
    return {
      intervalId: null,
      currentPrize: null,
      currentIndex: 0,
    };
  },
  computed: {
    ...mapGetters({
      prizes: 'game/getGamePrizes',
      game: 'game/getGame',
    }),
  },
  watch: {
    prizes() {
      if (this.prizes.length) {
        this.setGallery();
      }
    },
  },
  mounted() {
    if (this.prizes.length) {
      this.setGallery();
    }
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
  },
  methods: {
    setGallery() {
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }

      this.intervalId = setInterval(() => {
        if (this.currentIndex >= this.prizes.length - 1) {
          this.currentIndex = -1;
        }
        this.currentIndex++;
        const { conditions } = this.game;
        const conditionId = +this.prizes[
          this.currentIndex
        ]?.conditionId.replace(/[^0-9]/g, '');
        const conditon = conditions[conditionId];
        this.currentPrize = { ...this.prizes[this.currentIndex], conditon };
        // this.currentPrize = this.prizes[this.currentIndex];
      }, 7000);
    },
    checkCard() {
      this.$emit('check-bingo', { num: 2, bol: true });
    },
  },
};
</script>

<style>
.fade-move {
  transition: transform 1s;
}
</style>
