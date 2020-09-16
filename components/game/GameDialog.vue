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
        Number of tickets handled{{ game.numOfPlayers }}
      </v-card-title>
      <div class="d-flex justify-space-around">
        <div class="half px-6">
          <h4>requsted:</h4>
          <v-divider class="mb-2"></v-divider>
          <div v-for="player in players" :key="player">
            <div class="d-flex align-center justify-space-between">
              <span class="mb-6">@{{ player }}</span>
              <v-btn
                :loading="isLoading"
                color="primary"
                fab
                x-small
                @click="approve(player)"
              >
                <v-icon>mdi-check</v-icon>
              </v-btn>
            </div>
          </div>
        </div>
        <div class="half px-6">
          <h4>approved</h4>
          <v-divider class="mb-2"></v-divider>
          <span v-for="(player, i) in players" :key="player" class="mb-6">
            <span v-if="i" class="mr-3">,</span>
            <span>@{{ player }}</span>
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
      if (!this.game.response || this.game.response === 'Game is ready') {
        return true;
      }
      return false;
    },
  },
  watch: {
    socketMsgs() {
      this.players = [...this.players, 'new'];
    },
  },
  methods: {
    approve(player) {
      console.log(player);
    },
    gameRequest() {
      this.isLoading = true;
      gameService
        .gameRequest(this.game.pin)
        .then((response) => {
          this.isLoading = false;
          this.needAprrove = true;
          this.gameData = response;
        })
        .catch((err) => {
          this.isLoading = false;
          console.log(err);
        });
    },
    confirmGame() {
      this.isLoading = true;
      gameService
        .gameConfirm(this.game.pin)
        .then((response) => {
          this.isLoading = false;
          this.needAprrove = true;
          this.gameData = response;
          this.$store.dispatch('game/update', response);
        })
        .catch((err) => {
          this.isLoading = false;
          console.log(err);
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
