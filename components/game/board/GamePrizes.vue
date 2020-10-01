<template>
  <div class="prizes game-prizes d-flex flex-column">
    <div v-if="currentPrize && currentPrize.picture" class="prize">
      <transition name="fade">
        <div>
          <v-img
            :src="currentPrize.picture.url"
            class="row-1-1"
            aspect-ratio="1"
            max-height="220px"
          ></v-img>
          <h2 class="h2 tac text--white">
            {{ currentPrize.name | startCase }}
          </h2>
        </div>
      </transition>
    </div>
    <v-btn
      class="mt-auto mx-auto mb-1 whtie--text"
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
      this.currentPrize = this.prizes[this.currentIndex];
      this.intervalId = setInterval(() => {
        if (this.currentIndex >= this.prizes.length - 1) {
          this.currentIndex = -1;
        }
        this.currentIndex++;
        this.currentPrize = this.prizes[this.currentIndex];
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
