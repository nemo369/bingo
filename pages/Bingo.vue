<template>
  <section class="board relative">
    <board />
    <panel />
    <backgorund />
    <form v-if="error" class="error-msg" @submit.prevent="fetchGame">
      <h2>{{ error }}</h2>
      <v-text-field
        v-model="pin"
        type="text"
        class="half mx-auto my-3"
        maxlength="5"
      />
      <v-btn color="primary" type="submit">Let's Play</v-btn>
    </form>
  </section>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';
import Backgorund from '~/components/game/Backgorund.vue';
import Board from '~/components/game/Board.vue';
import Panel from '~/components/game/Panel.vue';

export default {
  name: 'Bingo',
  layout() {
    return 'game';
  },
  components: {
    Board,
    Panel,
    Backgorund,
  },
  data() {
    return {
      pin: this.$route.query.pin,
      error: '',
    };
  },
  computed: {
    ...mapGetters({
      game: 'game/getGame',
    }),
  },
  mounted() {
    if (!this.game) {
      if (this.pin) {
        this.fetchGame();
      } else {
        this.error = 'Please Enter a Valid Game Pin';
      }
    } else {
      this.$store.dispatch('game/resetGame');
    }
  },
  beforeRouteLeave(to, _, next) {
    if (to.name?.includes('bingo')) {
      prompt('Are you sure you want to Exit game?');
    } else {
      next();
    }
  },
  methods: {
    fetchGame() {
      this.$router.push({ path: this.$route.path, query: { pin: this.pin } });
      this.$store
        .dispatch('game/fetchGame', this.pin)
        .then(() => {
          this.error = '';
          this.$store.dispatch('game/resetGame');
          console.log(this.game);
        })
        .catch(() => (this.error = 'Please Enter a Valid Game Pin'));
    },
  },
};
</script>

<style lang="scss" scoped>
.board {
  display: grid;
  grid-template-columns: repeat(24, 1fr);
  grid-template-rows: repeat(24, 1fr);
}
.backgorund {
  grid-row: 1/25;
  grid-column: 1/25;
  z-index: 0;
  img {
    max-width: unset;
  }
}
.screen {
  grid-row: 2/18;
  grid-column: 7/23;
}
.panel {
  grid-row: 2/10;
  grid-column: 2/6;
}
.error-msg {
  z-index: 3;
  background-color: $brown;

  h2 {
    color: $black;
  }
  grid-row: 4/10;
  grid-column: 3/24;
  z-index: 3;
  text-align: center;
  border-radius: 10px;
}
</style>
