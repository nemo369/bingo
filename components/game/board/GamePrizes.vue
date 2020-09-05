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
          <h2 v-if="condition" class="h2">
            {{ condition.title | startCase }}
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

<script lang="ts">
import { mapGetters } from 'vuex';
import { Game, Prize, Condition } from '~/app/types/game';

export default {
  name: 'GamePrizes',
  components: {},
  data() {
    return {
      intervalId: null as NodeJS.Timeout | null,
      currentPrize: null as Prize | null,
      currentIndex: 0,
      condition: null as Condition | null,
    };
  },
  computed: {
    ...mapGetters({
      game: 'game/getGame',
    }),
  },
  watch: {
    game(newCount: Game, oldValue) {
      if (newCount && !oldValue) {
        this.setGallery();
      }
    },
  },
  beforeDestroy() {
    clearInterval(this.intervalId!);
  },
  methods: {
    setGallery() {
      this.currentPrize = this.game.prizes[this.currentIndex];
      this.intervalId = setInterval(() => {
        if (this.currentIndex >= this.game.prizes.length - 1) {
          this.currentIndex = -1;
        }
        this.currentIndex++;
        this.currentPrize = this.game.prizes[this.currentIndex];
        this.condition = this.game.conditions.find(
          (condition: Condition) =>
            condition.id === this.currentPrize?.conditionId
        );
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
