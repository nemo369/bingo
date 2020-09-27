<template>
  <div class="board-wrapper relative">
    <game-dialog />
    <section class="board relative" :class="{ blur: isBlur }">
      <board />
      <panel />
      <backgorund />
      <v-card v-if="error" elevation="6" class="error-msg py-6">
        <form @submit.prevent="fetchGame">
          <h2>{{ error }}</h2>
          <v-text-field
            v-model="pin"
            type="text"
            class="half mx-auto my-3"
            maxlength="5"
          />
          <v-btn rounded color="primary" type="submit">Let's Play</v-btn>
        </form>
      </v-card>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Backgorund from '~/components/game/Backgorund.vue';
import Board from '~/components/game/Board.vue';
import Panel from '~/components/game/Panel.vue';
import GameDialog from '~/components/game/GameDialog.vue';
export default {
  name: 'Bingo',
  layout() {
    return 'game';
  },
  components: {
    Board,
    Panel,
    Backgorund,
    GameDialog,
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
      album: 'album/getAlbum',
      socketMsgs: 'socket/getMsgs',
      socketErr: 'socket/getErr',
    }),
    isBlur() {
      if (!this.game) {
        return false;
      }
      if (this.game) {
        return !this.game.started;
      }
      return false;
    },
  },
  mounted() {
    if (!this.game) {
      this.pin
        ? this.fetchGame()
        : (this.error = 'Please Enter a Valid Game Pin');
    }

    if (this.game) {
      this.$store.dispatch('album/setAlbum', this.game.album);
      setTimeout(() => {
        this.updatePics(1);
      }, 8000);
      if (this.pin) {
        this.wsInit();
      }
    }
  },
  beforeRouteLeave(to, _, next) {
    if (to.name?.includes('bingo')) {
      const answer = window.confirm('Are you sure you want to Exit game??');
      if (answer) {
        next();
      }
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
          this.wsInit();
          // this.$store.dispatch('game/resetGame');
          setTimeout(() => {
            this.updatePics(1);
          }, 3000);
        })
        .catch(() => (this.error = 'Please Enter a Valid Game Pin'));
    },
    wsInit() {
      const data = {
        game_id: this.pin,
        firstMsg: 'WS Game Is On',
      };
      this.$store.dispatch('socket/initSocket', data);
    },
    updatePics(num) {
      this.$store.dispatch('game/setPicNum', { women: num, ppl: num });
    },
  },

  head() {
    return {
      title: 'Host Bingo Game',
    };
  },
};
</script>

<style lang="scss" scoped>
.board {
  display: grid;
  grid-template-columns: repeat(24, 1fr);
  grid-template-rows: repeat(24, 1fr);
  transition: filter 0.3s;
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
  z-index: 3;
}
.panel {
  grid-row: 2/10;
  grid-column: 2/6;
  z-index: 3;
}
.error-msg {
  z-index: 4;
  background-color: $white;

  h2 {
    color: $black;
  }
  grid-row: 4/10;
  grid-column: 3/24;
  z-index: 3;
  text-align: center;
  border-radius: 10px;
}

.board.blur {
  filter: blur(5px);
}
</style>
