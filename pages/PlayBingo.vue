<template>
  <section class="play relative">
    <v-alert v-if="err" type="error">
      {{ err }}
    </v-alert>
    <v-btn text class="text--secondary" @click="shout"
      ><h2>SHOUT FOR BINGO</h2></v-btn
    >
    <loader v-if="isLoading" :is-loading="isLoading" />

    <v-card class="wrapper mb-2">
      <v-tabs v-model="tab">
        <v-tab v-for="(card, i) in cards" :key="i">
          {{ card.board_id }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item v-for="(card, i) in cards" :key="i">
          <v-card flat>
            <card ::card="card" />
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>

    <colors />
    <game-status />
  </section>
</template>

<script>
/* eslint-disable camelcase */

import { mapGetters } from 'vuex';
import Card from '~/components/app/Card.vue';
import Colors from '~/components/player/Colors.vue';
import GameStatus from '~/components/player/GameStatus.vue';
import Loader from '~/components/app/Loader.vue';
export default {
  name: 'PlayBingo',
  components: {
    Card,
    Colors,
    Loader,
    GameStatus,
  },
  data() {
    return {
      gameSocket: null,
      pin: this.$route.query.pin,
      err: '',
      isLoading: true,
      tab: 1,
    };
  },
  computed: {
    ...mapGetters({
      cards: 'player/getCards',
      socketMsgs: 'socket/getMsgs',
      socketErr: 'socket/getErr',
      connection: 'socket/getConnection',
      player: 'player/getPlayer',
    }),
  },
  watch: {
    socketMsgs() {},
  },
  mounted() {
    if (!this.pin && !this.connection) {
      this.$router.push(this.localePath('/'));
    }
    if (this.pin && !this.connection) {
      const data = {
        message_type: 'add.player',
        firstMsg: 'User joined Game',
        game_id: this.pin,
        data: {
          game_id: this.pin,
          // nickname: this.nickname,
        },
      };
      this.wsInit(data);
    }

    if (this.connection) {
      this.isLoading = false;
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
    wsInit(data) {
      this.$store.dispatch('socket/initSocket', data);
    },
    shout() {
      if (this.connection) {
        this.$store.dispatch('socket/sendMsg', {
          message_type: 'add.bingoCall',
          data: { player: this.player },
        });
      }
    },
  },

  head() {
    return {
      title: 'Play bingo',
    };
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  min-height: 50vh;
}
</style>
