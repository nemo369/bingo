<template>
  <section v-if="isDialog" class="game-dialog pa-3 ovh">
    <v-card color="#2bc600" class="mb-6">
      <v-card-title class="headline text-h1"
        >Game Pin: {{ game.pin }}</v-card-title
      >
      <v-card-subtitle class="text-h4"
        >To Join Enter Game Pin In
        <span class="text-decoration-underline text-h4">{{
          url
        }}</span></v-card-subtitle
      >
      <v-card-actions v-if="!needAprrove" class="d-flex justify-end">
        <v-btn color="secondary" @click="gameRequest">Request Game</v-btn>
      </v-card-actions>
    </v-card>

    <v-card v-if="!needAprrove" class="deta">
      <v-card-title class="headline">
        Number of tickets handled:&nbsp;<b>{{ players.length }}</b>
      </v-card-title>
      <div class="d-flex justify-space-around pb-4">
        <div v-if="!game.is_public" class="half px-6">
          <h4>requsted:</h4>
          <v-divider class="mb-2"></v-divider>
          <div v-for="player in playersAskToJoin" :key="player.player_id">
            <div class="d-flex align-center justify-space-between">
              <span
                >@{{
                  player.nickname ? player.nickname : 'Approved User'
                }}</span
              >
              <v-btn
                :loading="isLoading"
                fab
                x-small
                color="secondary"
                class="ml-auto"
                @click="approve(player)"
              >
                <v-icon>mdi-check</v-icon>
              </v-btn>
            </div>
          </div>
        </div>
        <div class="px-6 half ml-auto">
          <h4 v-if="!game.is_public">approved</h4>
          <v-divider class="mb-2"></v-divider>
          <span
            v-for="(player, i) in players"
            :key="player.player_id"
            class="mb-6"
          >
            <span v-if="i" class="mr-3">,</span>
            <span
              >@{{ player.nickname ? player.nickname : 'Approved User' }}</span
            >
          </span>
        </div>
      </div>
    </v-card>

    <v-card v-if="needAprrove" class="deta">
      <v-card-subtitle class="text-h4">
        Total of {{ gameData.numOfPlayers }} cost ${{
          gameData.gameCost
        }}</v-card-subtitle
      >
      <v-card-actions class="d-flex">
        <v-btn :loading="isLoading" @click="confirmGame">Confirm</v-btn>
      </v-card-actions>
      <v-alert v-if="err" dense outlined type="error" class="error">
        {{ err }}
      </v-alert>
      <v-alert v-if="game.is_ended" dense outlined type="error" class="error">
        This Game Is Over - please create a new one
      </v-alert>
    </v-card>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import { gameService } from '~/services/game.service';

export default {
  name: 'GameDialog',
  data() {
    return {
      isLoading: false,
      gameData: {},
      needAprrove: false,
      url: process.client ? window.location.origin : '',
      players: [],
      playersAskToJoin: [],
      err: '',
    };
  },
  computed: {
    ...mapGetters({
      game: 'game/getGame',
      socketMsgs: 'socket/getMsgs',
    }),
    isDialog() {
      if (!this.game) {
        return false;
      }
      if (this.game) {
        return !this.game.started;
      }

      return false;
    },
  },
  watch: {
    socketMsgs() {
      const newPlayer = this.socketMsgs[this.socketMsgs.length - 1];
      if (newPlayer && newPlayer.data && newPlayer.data.player_id) {
        this.playersAskToJoin = [...this.playersAskToJoin, newPlayer.data];
        if (this.game.is_public) {
          this.players = [...this.players, newPlayer.data];
        }
      }
    },
    game() {
      if (this.game && this.game.players_list) {
        this.players = [...this.game.players_list];
      }
      if (this.game.game_requested) {
        this.needAprrove = true;
        this.gameData = {
          gameCost: this.game.game_cost,
          numOfPlayers: this.game.players_list.length,
        };
      }
    },
  },
  methods: {
    approve(player) {
      console.log(player);
      this.playersAskToJoin = this.playersAskToJoin.filter(
        (p) => p.id !== player.id
      );
      this.players.unshift(player);
    },
    gameRequest() {
      this.err = '';
      this.isLoading = true;
      gameService
        .gameRequest(this.game.pin, this.players)
        .then((response) => {
          this.isLoading = false;
          this.needAprrove = true;
          this.gameData = response;
        })
        .catch(() => {
          this.isLoading = false;
          this.err = 'Hmm...Our server having some issue';
        });
    },
    confirmGame() {
      this.isLoading = true;
      this.err = '';
      gameService
        .gameConfirm(this.game.pin)
        .then((response) => {
          this.isLoading = false;
          this.needAprrove = true;
          // this.gameData = response;
          // this.$store.dispatch('game/updateGame', response);
          if (response && response.toLowerCase() === 'not enough balance') {
            this.err = `${response} -  Please add more funds in the opened tab and then press confirm again. Don't close this window`;
            Object.assign(document.createElement('a'), {
              target: '_blank',
              href: `${process.env.baseUrl}/payments/deposits?amount=${this.gameData.gameCost}`,
            }).click();
          }
          if (
            response === 'Game Started' ||
            response.response === 'Game Started'
          ) {
            this.$store.dispatch('game/updateGame', { started: true });
            this.$store.dispatch('game/fetchGame', this.pin);
          }
        })
        .catch(() => {
          this.isLoading = false;
          this.err = 'Hmm...Our server having some issue';
        });
    },
  },
};
</script>

<style lang="scss">
.game-dialog {
  position: fixed;
  width: 85vw;
  height: 70vh;
  left: 0;
  right: 0;
  margin: auto;
  bottom: 0;
  top: 0;
  z-index: 8;
  background-color: $white;
  border-radius: 10px;
  overflow: auto;
}
.headline {
  font-size: 60px;
}
.deta {
  max-height: 65%;
  overflow: auto;
}
</style>
