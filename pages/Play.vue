<template>
  <section class="play relative">
    <v-alert v-if="err" type="error">
      {{ err }}
    </v-alert>
    <v-btn text class="text--secondery" @click="shout"
      ><h2>SHOUT FOR BINGO</h2></v-btn
    >
    <loader v-if="isLoading" :is-loading="isLoading" />

    <card v-if="card" :card="card" />
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
  name: 'Play',

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
      card: null,
      err: '',
      isLoading: true,
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
    socketMsgs(msgs) {
      if (msgs[msgs.length - 1]?.data?.player_id) {
        this.$store.dispatch('player/setPlayer', msgs[msgs.length - 1].data);
        if (msgs[msgs.length - 1]?.data?.board) {
          this.$store.dispatch('player/setPlayer', msgs[msgs.length - 1].data);
        }
      }
    },
  },
  mounted() {
    if (!this.pin || !this.getConnection) {
      this.$router.push(this.localePath('/'));
    }
    // if (!this.getConnection) {
    //   this.wsInit({ nickname: 'unknown', game_id: this.pin });
    // }
    this.isLoading = false;
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
      this.$store.dispatch('socket/initPlayerSocket', data);
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
};
</script>

<style lang="scss" scoped></style>
