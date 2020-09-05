<template>
  <div class="prizes game-prizes">
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
    game(newCount: Game) {
      if (newCount) {
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
  },
};
</script>

<style></style>
